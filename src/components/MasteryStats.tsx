import React from 'react';
import { SkillTree, ProgressionExercise, PBRecord, WorkoutLogEntry, SkillCategory } from '../types';
import {
  Award,
  Flame,
  CheckCircle2,
  TrendingUp,
  Target,
  Zap,
  Shield,
  Activity,
  Layers,
  ChevronRight
} from 'lucide-react';

interface MasteryStatsProps {
  trees: SkillTree[];
  exercises: Record<string, ProgressionExercise>;
  pbRecords: Record<string, PBRecord>;
  logs: WorkoutLogEntry[];
  onSelectTree: (treeId: string) => void;
}

export const MasteryStats: React.FC<MasteryStatsProps> = ({
  trees,
  exercises,
  pbRecords,
  logs,
  onSelectTree
}) => {
  const allExerciseList: ProgressionExercise[] = Object.values(exercises);
  const totalExercises = allExerciseList.length;

  let totalPassed = 0;
  let inProgressCount = 0;

  allExerciseList.forEach((ex: ProgressionExercise) => {
    const pb = pbRecords[ex.id];
    const target = ex.metricType === 'seconds'
      ? ex.passCriteria.targetHoldSeconds || 0
      : ex.passCriteria.targetReps || 0;
    
    const isPass = pb?.isPassed || (pb && pb.bestValue >= target && target > 0);
    if (isPass) {
      totalPassed++;
    } else if (pb && pb.bestValue > 0) {
      inProgressCount++;
    }
  });

  const overallMasteryRate = Math.round((totalPassed / totalExercises) * 100);

  return (
    <div className="space-y-5">
      {/* Top Hero Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Overall Mastery */}
        <div className="bg-[#20232a] border border-[#D1FF00]/40 rounded-2xl p-4 sm:p-5 shadow-md relative overflow-hidden transition-all duration-200">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#D1FF00]">
              TOTAL MASTERY
            </span>
            <Award className="w-4 h-4 text-[#D1FF00]" />
          </div>
          <div className="mt-2.5 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black font-mono text-white">
              {overallMasteryRate}%
            </span>
            <span className="text-[11px] text-zinc-400 font-mono">
              ({totalPassed}/{totalExercises})
            </span>
          </div>
          <div className="w-full bg-[#14161b] border border-[#2b2f38] h-1.5 rounded-full mt-2.5 overflow-hidden">
            <div
              className="h-full bg-[#D1FF00] rounded-full"
              style={{ width: `${overallMasteryRate}%` }}
            />
          </div>
        </div>

        {/* Mastered Skills */}
        <div className="bg-[#20232a] border border-[#333742] hover:border-[#4b5263] rounded-2xl p-4 sm:p-5 shadow-md transition-all duration-200">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400">
              PASSED STANDARDS
            </span>
            <CheckCircle2 className="w-4 h-4 text-[#D1FF00]" />
          </div>
          <div className="mt-2.5 flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-black font-mono text-[#D1FF00]">
              {totalPassed}
            </span>
            <span className="text-[11px] font-mono text-zinc-400">skills cleared</span>
          </div>
          <p className="text-[11px] font-mono text-zinc-400 mt-1.5">
            Form benchmarks met
          </p>
        </div>

        {/* In Progress */}
        <div className="bg-[#20232a] border border-[#333742] hover:border-[#4b5263] rounded-2xl p-4 sm:p-5 shadow-md transition-all duration-200">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400">
              ACTIVE TRAINING
            </span>
            <Flame className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2.5 flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-black font-mono text-white">
              {inProgressCount}
            </span>
            <span className="text-[11px] font-mono text-zinc-400">in progression</span>
          </div>
          <p className="text-[11px] font-mono text-zinc-400 mt-1.5">
            Building hold/rep volume
          </p>
        </div>

        {/* Total Sessions Logged */}
        <div className="bg-[#20232a] border border-[#333742] hover:border-[#4b5263] rounded-2xl p-4 sm:p-5 shadow-md transition-all duration-200">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400">
              LOGGED SETS
            </span>
            <TrendingUp className="w-4 h-4 text-zinc-300" />
          </div>
          <div className="mt-2.5 flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-black font-mono text-white">
              {logs.length}
            </span>
            <span className="text-[11px] font-mono text-zinc-400">records</span>
          </div>
          <p className="text-[11px] font-mono text-zinc-400 mt-1.5">
            Historical PB curves
          </p>
        </div>
      </div>

      {/* Skill Tree Pathway Hub Grid */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#D1FF00]" />
            Skill Tree Pathways
          </h3>
          <span className="text-xs font-mono text-zinc-400 hidden sm:inline">
            Select a pathway to inspect detailed progression milestones
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trees.map(tree => {
            const treeExs = tree.exercises
              .map(id => exercises[id])
              .filter((ex): ex is ProgressionExercise => Boolean(ex));
            const passed = treeExs.filter(ex => {
              const pb = pbRecords[ex.id];
              const target = ex.metricType === 'seconds'
                ? ex.passCriteria.targetHoldSeconds || 0
                : ex.passCriteria.targetReps || 0;
              return pb?.isPassed || (pb && pb.bestValue >= target && target > 0);
            }).length;

            const pct = Math.round((passed / treeExs.length) * 100);

            return (
              <div
                key={tree.id}
                onClick={() => onSelectTree(tree.id)}
                className="group bg-[#20232a] hover:bg-[#262a33] border border-[#333742] hover:border-[#D1FF00]/70 rounded-2xl p-5 transition-all duration-200 cursor-pointer shadow-md flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider bg-[#14161b] border border-[#2b2f38] text-zinc-200">
                      {tree.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#D1FF00]">
                      {passed}/{treeExs.length} Done
                    </span>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-white group-hover:text-[#D1FF00] font-display transition tracking-tight">
                      {tree.name}
                    </h4>
                    <p className="text-xs text-zinc-300 line-clamp-2 mt-1 leading-relaxed font-sans">
                      {tree.description}
                    </p>
                  </div>
                </div>

                {/* Progress bar and arrow */}
                <div className="space-y-2 pt-2 border-t border-[#333742]">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400 text-[11px]">Mastery</span>
                    <span className="font-bold text-zinc-200">{pct}%</span>
                  </div>
                  <div className="w-full bg-[#14161b] border border-[#2b2f38] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#D1FF00] rounded-full transition-all duration-300"
                      style={{ width: `${pct}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pt-1 group-hover:text-[#D1FF00] transition">
                    <span className="text-[11px]">Open Pathway</span>
                    <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
