import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ProgressionExercise, WorkoutLogEntry, PBRecord } from '../types';
import { soundFX } from '../utils/sound';
import { evaluateWorkoutEntry } from '../utils/storage';
import { X, Award, CheckCircle2, Dumbbell, Sparkles, Flame, Calendar, Clock } from 'lucide-react';

interface LogWorkoutModalProps {
  exercise: ProgressionExercise;
  existingPB?: PBRecord;
  onSaveLog: (entry: Omit<WorkoutLogEntry, 'id' | 'timestamp'>) => void;
  onClose: () => void;
}

export const LogWorkoutModal: React.FC<LogWorkoutModalProps> = ({
  exercise,
  existingPB,
  onSaveLog,
  onClose
}) => {
  const isSeconds = exercise.metricType === 'seconds';
  const targetThreshold = isSeconds
    ? exercise.passCriteria.targetHoldSeconds || 10
    : exercise.passCriteria.targetReps || 10;

  const currentBest = existingPB ? existingPB.bestValue : 0;

  const [metricValue, setMetricValue] = useState<number>(
    currentBest > 0 ? currentBest : Math.max(1, Math.round(targetThreshold * 0.7))
  );
  const [sets, setSets] = useState<number>(exercise.passCriteria.targetSets || 3);
  const [weightAddedKg, setWeightAddedKg] = useState<number>(0);
  const [rpe, setRpe] = useState<number>(8);
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [notes, setNotes] = useState<string>('');

  const evaluation = evaluateWorkoutEntry(
    exercise,
    metricValue,
    sets,
    weightAddedKg,
    existingPB
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (metricValue <= 0) return;

    if (evaluation.isPB || evaluation.isPass) {
      soundFX.playCelebrationFanfare();
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.error('Confetti error', err);
      }
    }

    onSaveLog({
      exerciseId: exercise.id,
      date,
      metricValue,
      sets,
      weightAddedKg: weightAddedKg > 0 ? weightAddedKg : undefined,
      rpe,
      notes: notes.trim() || undefined,
      isPB: evaluation.isPB,
      passedCriteria: evaluation.isPass
    });

    onClose();
  };

  const getRpeLabel = (val: number) => {
    if (val <= 6) return 'Light / Warm-up effort';
    if (val === 7) return 'Moderate (3 reps in reserve)';
    if (val === 8) return 'Hard (2 reps in reserve)';
    if (val === 9) return 'Very Hard (1 rep in reserve)';
    return 'Maximal Effort / All-out failure (RPE 10)';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm overflow-y-auto">
      <div
        id="log-workout-modal-container"
        className="relative w-full max-w-lg bg-[#141414] border border-[#222222] rounded-xl shadow-2xl overflow-hidden my-6"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#222222] bg-[#0A0A0A]">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-[#141414] border border-[#222222] text-[#D1FF00]">
              <Dumbbell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">Log Workout &amp; PB</h3>
              <p className="text-xs text-zinc-400 font-sans truncate max-w-xs">{exercise.title}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-[#222222] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Evaluation Banner */}
        <div className="px-5 pt-4 pb-1">
          {evaluation.isPass ? (
            <div className="p-3 rounded-lg bg-[#D1FF00]/15 border border-[#D1FF00]/40 text-[#D1FF00] text-xs font-mono flex items-center gap-2.5 shadow-sm">
              <Sparkles className="w-4 h-4 text-[#D1FF00] shrink-0" />
              <div>
                <span className="font-bold uppercase tracking-wider">Pass Standard Met!</span> You hit {metricValue} {isSeconds ? 's' : 'reps'} (Target: {targetThreshold} {isSeconds ? 's' : 'reps'}).
              </div>
            </div>
          ) : evaluation.isPB ? (
            <div className="p-3 rounded-lg bg-[#D1FF00]/10 border border-[#D1FF00]/30 text-zinc-100 text-xs font-mono flex items-center gap-2.5 shadow-sm">
              <Flame className="w-4 h-4 text-[#D1FF00] shrink-0" />
              <div>
                <span className="font-bold text-[#D1FF00] uppercase tracking-wider">New Personal Best!</span> Beating prior best of {currentBest} {isSeconds ? 's' : 'reps'}.
              </div>
            </div>
          ) : (
            <div className="p-2.5 rounded-lg bg-[#0A0A0A] border border-[#222222] text-zinc-400 text-xs font-mono flex items-center justify-between">
              <span>Current PB: <strong className="text-zinc-200">{currentBest} {isSeconds ? 's' : 'reps'}</strong></span>
              <span>Pass Target: <strong className="text-[#D1FF00]">{targetThreshold} {isSeconds ? 's' : 'reps'}</strong></span>
            </div>
          )}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Primary Metric: Reps or Seconds */}
          <div className="space-y-2">
            <div className="flex items-center justify-between font-mono">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                {isSeconds ? <Clock className="w-3.5 h-3.5 text-[#D1FF00]" /> : <Award className="w-3.5 h-3.5 text-[#D1FF00]" />}
                {isSeconds ? 'Static Hold Duration' : 'Repetitions (Best Set)'}
              </label>
              <span className="text-xl font-black text-[#D1FF00]">
                {metricValue} {isSeconds ? 'sec' : 'reps'}
              </span>
            </div>

            {/* Stepper + Slider */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setMetricValue(v => Math.max(1, v - 1))}
                className="w-10 h-10 rounded-lg bg-[#0A0A0A] hover:bg-[#1a1a1a] active:scale-95 text-lg font-mono font-bold text-white transition flex items-center justify-center cursor-pointer border border-[#222222]"
              >
                -
              </button>
              <input
                type="range"
                min="1"
                max={isSeconds ? 120 : 50}
                value={metricValue}
                onChange={e => setMetricValue(Number(e.target.value))}
                className="flex-1 accent-[#D1FF00] cursor-pointer h-2 bg-[#0A0A0A] border border-[#222222] rounded-lg"
              />
              <button
                type="button"
                onClick={() => setMetricValue(v => v + 1)}
                className="w-10 h-10 rounded-lg bg-[#0A0A0A] hover:bg-[#1a1a1a] active:scale-95 text-lg font-mono font-bold text-white transition flex items-center justify-center cursor-pointer border border-[#222222]"
              >
                +
              </button>
            </div>
          </div>

          {/* Sets & Added Weight */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400">Sets Performed</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  max="15"
                  value={sets}
                  onChange={e => setSets(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-[#0A0A0A] border border-[#222222] rounded-lg px-3 py-2 text-sm text-white font-mono focus:border-[#D1FF00] outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400">Added Weight (kg)</label>
              <input
                type="number"
                min="0"
                step="0.5"
                max="100"
                value={weightAddedKg}
                onChange={e => setWeightAddedKg(Math.max(0, Number(e.target.value)))}
                placeholder="+0 kg (BW)"
                className="w-full bg-[#0A0A0A] border border-[#222222] rounded-lg px-3 py-2 text-sm text-white font-mono focus:border-[#D1FF00] outline-none"
              />
            </div>
          </div>

          {/* RPE Selector */}
          <div className="space-y-1.5 font-mono">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Exertion (RPE)</span>
              <span className="font-bold text-[#D1FF00]">{rpe}/10</span>
            </div>
            <input
              type="range"
              min="5"
              max="10"
              step="0.5"
              value={rpe}
              onChange={e => setRpe(Number(e.target.value))}
              className="w-full accent-[#D1FF00] cursor-pointer h-2 bg-[#0A0A0A] border border-[#222222] rounded-lg"
            />
            <p className="text-[10px] text-zinc-500 italic text-right font-sans">{getRpeLabel(rpe)}</p>
          </div>

          {/* Date & Notes */}
          <div className="space-y-2.5">
            <div className="space-y-1">
              <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-zinc-500" />
                Workout Date
              </label>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-[#222222] rounded-lg px-3 py-2 text-sm text-white font-mono focus:border-[#D1FF00] outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400">Form Notes / Details</label>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="e.g. Locked elbows strictly, 2s pause at top, felt clean..."
                rows={2}
                className="w-full bg-[#0A0A0A] border border-[#222222] rounded-lg px-3 py-2 text-xs text-zinc-200 placeholder:text-zinc-600 focus:border-[#D1FF00] outline-none resize-none font-sans"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 rounded-lg border border-[#222222] bg-[#0A0A0A] hover:bg-[#1a1a1a] text-zinc-400 font-mono font-bold text-xs uppercase tracking-wider transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              id="confirm-save-log-btn"
              className="flex-1 py-2 rounded-lg bg-[#D1FF00] hover:bg-[#b8e600] text-black font-mono font-extrabold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-sm active:scale-95 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              Save Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
