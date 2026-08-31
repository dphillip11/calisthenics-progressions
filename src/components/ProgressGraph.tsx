import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine
} from 'recharts';
import { ProgressionExercise, WorkoutLogEntry, PBRecord } from '../types';
import { TrendingUp, Calendar, Activity } from 'lucide-react';

interface ProgressGraphProps {
  exercise: ProgressionExercise;
  logs: WorkoutLogEntry[];
  pbRecord?: PBRecord;
}

export const ProgressGraph: React.FC<ProgressGraphProps> = ({
  exercise,
  logs,
  pbRecord
}) => {
  const [graphMode, setGraphMode] = useState<'curve' | 'sessions' | 'volume'>('curve');

  // Filter and sort logs for this specific exercise
  const exerciseLogs = [...logs]
    .filter(l => l.exerciseId === exercise.id)
    .sort((a, b) => a.timestamp - b.timestamp);

  const metricLabel = exercise.metricType === 'seconds' ? 'Seconds (s)' : 'Reps';
  const targetThreshold = exercise.metricType === 'seconds'
    ? exercise.passCriteria.targetHoldSeconds || 0
    : exercise.passCriteria.targetReps || 0;

  // Process data for charts
  let runningPB = 0;
  const chartData = exerciseLogs.map((log, index) => {
    if (log.metricValue > runningPB) {
      runningPB = log.metricValue;
    }

    const formattedDate = new Date(log.timestamp).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric'
    });

    const totalVolume = log.metricValue * (log.sets || 1);

    return {
      id: log.id,
      index: index + 1,
      date: formattedDate,
      fullDate: log.date,
      value: log.metricValue,
      runningPB: runningPB,
      sets: log.sets || 3,
      rpe: log.rpe || 8,
      weightAdded: log.weightAddedKg || 0,
      totalVolume: totalVolume,
      notes: log.notes || '',
      isPB: log.isPB,
      passedCriteria: log.passedCriteria
    };
  });

  const currentPB = pbRecord ? pbRecord.bestValue : (runningPB || 0);
  const firstValue = chartData.length > 0 ? chartData[0].value : (currentPB || 0);
  const growthPercent = firstValue > 0 && currentPB > firstValue
    ? Math.round(((currentPB - firstValue) / firstValue) * 100)
    : 0;

  const totalSetsLogged = exerciseLogs.length;
  const totalVolumeSum = exerciseLogs.reduce((acc, l) => acc + (l.metricValue || 0), 0);

  const yMax = Math.max(
    targetThreshold * 1.25,
    ...chartData.map(d => d.value),
    10
  );

  return (
    <div className="bg-[#20232a] border border-[#333742] hover:border-[#4b5263] rounded-2xl p-5 sm:p-6 shadow-md flex flex-col gap-5 transition-all duration-200">
      {/* Top Stat Summary Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#333742]">
        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-widest font-semibold text-zinc-400">
            PROGRESSION TIMELINE &amp; ANALYTICS
          </span>
          <h3 className="text-lg sm:text-xl font-black text-white font-display tracking-tight">
            {exercise.title}
          </h3>
        </div>
      </div>

      {/* Metrics Mini-Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {/* Total Sessions / Sets */}
        <div className="bg-[#14161b] border border-[#2b2f38] rounded-xl p-3.5 shadow-xs">
          <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 mb-1">
            <Calendar className="w-3 h-3 text-zinc-400" />
            <span>Logs</span>
          </div>
          <div className="text-base font-extrabold text-zinc-100 font-mono">
            {chartData.length} <span className="text-xs text-zinc-400 font-normal">sessions</span>
          </div>
          <div className="text-[10px] font-mono text-zinc-400 mt-0.5">
            {totalSetsLogged} total sets recorded
          </div>
        </div>

        {/* Growth Rate */}
        <div className="bg-[#14161b] border border-[#2b2f38] rounded-xl p-3.5 shadow-xs">
          <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 mb-1">
            <TrendingUp className="w-3 h-3 text-[#D1FF00]" />
            <span>Growth</span>
          </div>
          <div className="text-base font-extrabold text-[#D1FF00] font-mono">
            +{growthPercent}%
          </div>
          <div className="text-[10px] font-mono text-zinc-400 mt-0.5">
            {firstValue} → {currentPB} ({exercise.metricType === 'seconds' ? 's' : 'r'})
          </div>
        </div>

        {/* Total Volume */}
        <div className="bg-[#14161b] border border-[#2b2f38] rounded-xl p-3.5 shadow-xs">
          <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 mb-1">
            <Activity className="w-3 h-3 text-zinc-400" />
            <span>Total Volume</span>
          </div>
          <div className="text-base font-extrabold text-zinc-100 font-mono">
            {totalVolumeSum} <span className="text-xs text-zinc-400 font-normal">{exercise.metricType === 'seconds' ? 'sec' : 'reps'}</span>
          </div>
          <div className="text-[10px] font-mono text-zinc-400 mt-0.5">
            Across all recorded sets
          </div>
        </div>
      </div>

      {/* Graph Mode Switcher */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <div className="text-xs font-mono font-semibold text-zinc-400 flex items-center gap-1.5 uppercase tracking-wider">
          <TrendingUp className="w-3.5 h-3.5 text-[#D1FF00]" />
          <span>Progress Timeline</span>
        </div>

        <div className="flex items-center bg-[#14161b] p-1 rounded-xl border border-[#2b2f38] text-xs font-mono">
          <button
            id="view-pb-curve-tab"
            onClick={() => setGraphMode('curve')}
            className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer ${
              graphMode === 'curve'
                ? 'bg-[#D1FF00] text-black font-bold shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            PB Curve
          </button>
          <button
            id="view-all-sessions-tab"
            onClick={() => setGraphMode('sessions')}
            className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer ${
              graphMode === 'sessions'
                ? 'bg-[#D1FF00] text-black font-bold shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            All Logs
          </button>
          <button
            id="view-volume-tab"
            onClick={() => setGraphMode('volume')}
            className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer ${
              graphMode === 'volume'
                ? 'bg-[#D1FF00] text-black font-bold shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Volume
          </button>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="w-full h-72 sm:h-80 bg-[#14161b] border border-[#2b2f38] rounded-xl p-3 sm:p-4 shadow-inner">
        {chartData.length === 0 ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 text-zinc-500 font-mono text-xs">
            <Activity className="w-10 h-10 mb-2 stroke-1 text-zinc-700" />
            <p className="font-bold text-zinc-300">No workout records logged yet</p>
            <p className="text-[11px] text-zinc-500 max-w-xs mt-1">
              Log your first set to plot your progression against the pass criteria.
            </p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            {graphMode === 'curve' ? (
              <AreaChart data={chartData} margin={{ top: 15, right: 20, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPB" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D1FF00" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#D1FF00" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="2 2" stroke="#222222" vertical={false} />
                <XAxis dataKey="date" stroke="#71717a" fontSize={10} font-family="monospace" tickLine={false} />
                <YAxis
                  stroke="#71717a"
                  fontSize={10}
                  font-family="monospace"
                  domain={[0, Math.ceil(yMax)]}
                  tickLine={false}
                  tickFormatter={v => `${v}`}
                />
                <Tooltip content={<CustomTooltip metricType={exercise.metricType} target={targetThreshold} />} />
                
                {/* Target Pass Criteria Milestone Line */}
                {targetThreshold > 0 && (
                  <ReferenceLine
                    y={targetThreshold}
                    stroke="#FFFFFF"
                    strokeDasharray="3 3"
                    strokeWidth={1.5}
                    label={{
                      value: `Pass Standard (${targetThreshold})`,
                      fill: '#D1FF00',
                      fontSize: 10,
                      position: 'top'
                    }}
                  />
                )}

                <Area
                  type="monotone"
                  dataKey="runningPB"
                  name="Personal Best"
                  stroke="#D1FF00"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorPB)"
                  dot={{ r: 3.5, fill: '#D1FF00', stroke: '#0A0A0A', strokeWidth: 2 }}
                  activeDot={{ r: 6, fill: '#FFFFFF', stroke: '#D1FF00', strokeWidth: 2 }}
                />
              </AreaChart>
            ) : graphMode === 'sessions' ? (
              <LineChart data={chartData} margin={{ top: 15, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="2 2" stroke="#222222" vertical={false} />
                <XAxis dataKey="date" stroke="#71717a" fontSize={10} font-family="monospace" tickLine={false} />
                <YAxis
                  stroke="#71717a"
                  fontSize={10}
                  font-family="monospace"
                  domain={[0, Math.ceil(yMax)]}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip metricType={exercise.metricType} target={targetThreshold} />} />
                
                {targetThreshold > 0 && (
                  <ReferenceLine
                    y={targetThreshold}
                    stroke="#FFFFFF"
                    strokeDasharray="3 3"
                    strokeWidth={1.5}
                    label={{
                      value: `Pass: ${targetThreshold}`,
                      fill: '#D1FF00',
                      fontSize: 10,
                      position: 'insideTopRight'
                    }}
                  />
                )}

                <Line
                  type="monotone"
                  dataKey="value"
                  name="Session Reps/Sec"
                  stroke="#E4E4E7"
                  strokeWidth={2}
                  dot={{ r: 3.5, fill: '#FFFFFF', stroke: '#0A0A0A', strokeWidth: 1.5 }}
                  activeDot={{ r: 5, fill: '#D1FF00', stroke: '#FFFFFF', strokeWidth: 2 }}
                />
                <Line
                  type="stepAfter"
                  dataKey="runningPB"
                  name="PB Trajectory"
                  stroke="#D1FF00"
                  strokeWidth={1.5}
                  strokeDasharray="3 3"
                  dot={false}
                />
              </LineChart>
            ) : (
              <AreaChart data={chartData} margin={{ top: 15, right: 20, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D1FF00" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#D1FF00" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="2 2" stroke="#222222" vertical={false} />
                <XAxis dataKey="date" stroke="#71717a" fontSize={10} font-family="monospace" tickLine={false} />
                <YAxis stroke="#71717a" fontSize={10} font-family="monospace" tickLine={false} />
                <Tooltip content={<CustomTooltip metricType={exercise.metricType} target={targetThreshold} showVolume />} />
                <Area
                  type="monotone"
                  dataKey="totalVolume"
                  name="Total Volume"
                  stroke="#D1FF00"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorVolume)"
                  dot={{ r: 3.5, fill: '#D1FF00', stroke: '#0A0A0A', strokeWidth: 1.5 }}
                />
              </AreaChart>
            )}
          </ResponsiveContainer>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-400 pt-1 font-mono">
        <div className="flex flex-wrap items-center gap-4 text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#D1FF00] inline-block" />
            <span>Personal Best (PB)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-white inline-block border-t border-dashed border-zinc-200" />
            <span>Pass Threshold</span>
          </div>
          {graphMode === 'sessions' && (
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-zinc-300 inline-block" />
              <span>Session Log</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Custom Chart Tooltip
interface TooltipPayload {
  payload?: {
    date: string;
    fullDate: string;
    value: number;
    runningPB: number;
    sets: number;
    rpe: number;
    weightAdded: number;
    totalVolume: number;
    notes: string;
    isPB?: boolean;
    passedCriteria?: boolean;
  };
}

const CustomTooltip = ({
  active,
  payload,
  metricType,
  target,
  showVolume = false
}: {
  active?: boolean;
  payload?: TooltipPayload[];
  metricType: string;
  target: number;
  showVolume?: boolean;
}) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    if (!data) return null;

    const unit = metricType === 'seconds' ? 's' : ' reps';

    return (
      <div className="bg-[#16181d] border border-[#333742] p-3 rounded-xl shadow-xl text-xs space-y-1.5 max-w-xs z-50 font-mono">
        <div className="flex items-center justify-between gap-3 border-b border-[#2d313b] pb-1.5">
          <span className="font-semibold text-zinc-200">{data.fullDate || data.date}</span>
          {data.isPB && (
            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#D1FF00]/15 text-[#D1FF00] border border-[#D1FF00]/40">
              ★ NEW PB
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2 text-zinc-300 text-[11px]">
          <div>
            <span className="text-zinc-500">Best:</span>{' '}
            <span className="font-bold text-[#D1FF00]">
              {data.value}
              {unit}
            </span>
          </div>
          <div>
            <span className="text-zinc-500">Sets:</span>{' '}
            <span className="font-semibold text-zinc-200">{data.sets}</span>
          </div>
          {data.weightAdded > 0 && (
            <div>
              <span className="text-zinc-500">Added:</span>{' '}
              <span className="font-semibold text-zinc-200">+{data.weightAdded}kg</span>
            </div>
          )}
          {data.rpe > 0 && (
            <div>
              <span className="text-zinc-500">RPE:</span>{' '}
              <span className="font-semibold text-zinc-200">{data.rpe}/10</span>
            </div>
          )}
          {showVolume && (
            <div className="col-span-2">
              <span className="text-zinc-500">Volume:</span>{' '}
              <span className="font-bold text-[#D1FF00]">{data.totalVolume}</span>
            </div>
          )}
        </div>

        {target > 0 && (
          <div className="text-[10px] pt-1 border-t border-[#222222]">
            {data.value >= target ? (
              <span className="text-[#D1FF00] font-medium">✓ Pass Standard Met ({target}{unit})</span>
            ) : (
              <span className="text-zinc-400">
                {target - data.value}
                {unit} needed to pass ({target}{unit})
              </span>
            )}
          </div>
        )}

        {data.notes && (
          <p className="text-[10px] text-zinc-500 italic pt-1 border-t border-[#222222] line-clamp-2 font-sans">
            "{data.notes}"
          </p>
        )}
      </div>
    );
  }
  return null;
};
