import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ProgressionExercise, WorkoutLogEntry, PBRecord } from '../types';
import { soundFX } from '../utils/sound';
import { calculateDayCompletion } from '../utils/storage';
import {
  X,
  Award,
  Dumbbell,
  Clock,
  Plus,
  Minus,
  Check,
  Timer,
  CheckCircle2
} from 'lucide-react';

interface LogWorkoutModalProps {
  exercise: ProgressionExercise;
  existingPB?: PBRecord;
  logs?: WorkoutLogEntry[];
  onSaveLog: (entry: Omit<WorkoutLogEntry, 'id' | 'timestamp'>) => void;
  onClose: () => void;
}

export const LogWorkoutModal: React.FC<LogWorkoutModalProps> = ({
  exercise,
  existingPB,
  logs = [],
  onSaveLog,
  onClose
}) => {
  const isSeconds = exercise.metricType === 'seconds';
  const targetThreshold = isSeconds
    ? exercise.passCriteria.targetHoldSeconds || 10
    : exercise.passCriteria.targetReps || 10;
  const targetSets = exercise.passCriteria.targetSets || 3;

  const currentBest = existingPB ? existingPB.bestValue : 0;

  const todayStr = new Date().toISOString().slice(0, 10);
  // logs is stored newest-first in state ([newest, ..., oldest])
  // We sort todaysSets chronologically so Set #1 is on the left and the most recent set is furthest right
  const todaysSets = logs
    .filter(l => l.exerciseId === exercise.id && l.date === todayStr)
    .sort((a, b) => {
      const timeA = a.timestamp || 0;
      const timeB = b.timestamp || 0;
      if (timeA !== timeB && timeA > 0 && timeB > 0) {
        return timeA - timeB; // ascending: oldest -> newest
      }
      // If timestamps are identical or missing, use array position (higher index in `logs` = older)
      return logs.indexOf(b) - logs.indexOf(a);
    });

  const setsScrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll horizontally to the right so the most recent set is visible
  useEffect(() => {
    if (setsScrollRef.current) {
      setsScrollRef.current.scrollLeft = setsScrollRef.current.scrollWidth;
      const timeoutId = setTimeout(() => {
        if (setsScrollRef.current) {
          setsScrollRef.current.scrollLeft = setsScrollRef.current.scrollWidth;
        }
      }, 50);
      return () => clearTimeout(timeoutId);
    }
  }, [todaysSets.length]);

  // Strictly a Single Set Prompt
  const [metricValue, setMetricValue] = useState<number>(
    currentBest > 0 ? currentBest : Math.max(1, Math.round(targetThreshold * 0.8))
  );
  const [weightAddedKg, setWeightAddedKg] = useState<number>(0);
  const [rpe, setRpe] = useState<number>(8);
  const [notes, setNotes] = useState<string>('');

  // Collect all sets already completed today
  const completedTodaySetValues: number[] = [];
  todaysSets.forEach(s => {
    const n = Math.max(1, s.sets || 1);
    for (let i = 0; i < n; i++) {
      completedTodaySetValues.push(s.metricValue);
    }
  });
  const completedTodayEvaluation = calculateDayCompletion(exercise, completedTodaySetValues);
  const isAlreadyPassed = existingPB?.isPassed || completedTodayEvaluation.isPass;

  const isPB = metricValue > currentBest;

  const getRpeBorderColor = (rpeVal?: number): string => {
    if (rpeVal === undefined || rpeVal === null) return 'rgba(0, 0, 0, 0)';
    const clamped = Math.max(0, Math.min(10, rpeVal));
    if (clamped <= 5) {
      // 0 is green, 5 is clear / transparent
      const alpha = (5 - clamped) / 5;
      return `rgba(34, 197, 94, ${alpha.toFixed(2)})`;
    } else {
      // 5 is clear / transparent, 10 is red
      const alpha = (clamped - 5) / 5;
      return `rgba(239, 68, 68, ${alpha.toFixed(2)})`;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (metricValue <= 0) return;

    // Evaluate day completion including the set now being submitted
    const candidateTodaySetValues = [...completedTodaySetValues, metricValue];
    const submitDayEvaluation = calculateDayCompletion(exercise, candidateTodaySetValues);
    const isDayPass = submitDayEvaluation.isPass;

    if (isPB || isDayPass) {
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
    } else {
      soundFX.playCountdownBeep(true);
    }

    const todayDate = new Date().toISOString().slice(0, 10);

    onSaveLog({
      exerciseId: exercise.id,
      date: todayDate,
      metricValue,
      sets: 1,
      weightAddedKg: weightAddedKg > 0 ? weightAddedKg : undefined,
      rpe,
      notes: notes.trim() || undefined,
      isPB,
      passedCriteria: isDayPass
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
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 bg-black/90 backdrop-blur-sm">
      <div className="min-h-full flex items-start justify-center pt-6 sm:pt-10 pb-12">
        <div
          id="log-workout-modal-container"
          className="relative w-full max-w-md bg-[#141414] border border-[#222222] rounded-2xl shadow-2xl overflow-hidden font-mono"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#222222] bg-[#0A0A0A]">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-[#141414] border border-[#222222] text-[#D1FF00]">
                <Dumbbell className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Log Single Set
                </h3>
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

          {/* Status Banner */}
          <div className="px-5 pt-4 pb-1">
            {isAlreadyPassed ? (
              <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs font-mono flex items-center gap-2.5 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="font-bold uppercase tracking-wider">Pass Standard Completed</span>
                  <span className="block text-[11px] text-zinc-300 font-sans mt-0.5">
                    Mastery verified based on completed sets ({targetSets} &times; {targetThreshold} {isSeconds ? 's' : 'reps'}).
                  </span>
                </div>
              </div>
            ) : (
              <div className="p-2.5 rounded-xl bg-[#0A0A0A] border border-[#222222] text-zinc-400 text-xs font-mono flex items-center justify-between">
                <span>Current PB: <strong className="text-zinc-200">{currentBest} {isSeconds ? 's' : 'reps'}</strong></span>
                <span>Pass Target: <strong className="text-[#D1FF00]">{targetSets} &times; {targetThreshold} {isSeconds ? 's' : 'reps'}</strong></span>
              </div>
            )}
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            {/* Today's Sets Pills */}
            <div className="space-y-2 font-mono">
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-[#D1FF00]" />
                  Today's Sets ({todaysSets.length})
                </span>
                <span className="text-zinc-300">
                  Pass Progress: <strong className="text-[#D1FF00] font-mono">{completedTodayEvaluation.completionPercent}%</strong> ({completedTodayEvaluation.qualifyingSetsCount}/{completedTodayEvaluation.requiredSets} sets)
                </span>
              </div>

              {todaysSets.length > 0 ? (
                <div
                  ref={setsScrollRef}
                  className="flex items-center gap-2 overflow-x-auto py-1 px-0.5 no-scrollbar scroll-smooth whitespace-nowrap"
                >
                  {todaysSets.map((s, idx) => {
                    const borderColor = getRpeBorderColor(s.rpe);
                    return (
                      <span
                        key={s.id}
                        style={{ borderColor }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-200 text-zinc-950 border-2 shadow-sm text-xs font-mono font-bold shrink-0 transition-colors"
                      >
                        <span className="text-[10px] text-zinc-500 font-extrabold uppercase">
                          #{idx + 1}
                        </span>
                        <span className="text-sm font-black text-black">
                          {s.metricValue}{isSeconds ? 's' : 'r'}
                        </span>
                        {s.weightAddedKg ? (
                          <span className="text-[10px] bg-zinc-300 text-zinc-800 px-1.5 py-0.5 rounded font-bold">
                            +{s.weightAddedKg}kg
                          </span>
                        ) : null}
                        {s.rpe ? (
                          <span className="text-[10px] text-zinc-600 font-semibold">
                            @{s.rpe}
                          </span>
                        ) : null}
                        {s.isPB && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-black text-[#D1FF00] font-black border border-black uppercase tracking-wider">
                            PB
                          </span>
                        )}
                      </span>
                    );
                  })}
                </div>
              ) : (
                <div className="p-2.5 rounded-xl bg-[#0A0A0A] border border-[#222222] text-[11px] text-zinc-500 font-mono text-center">
                  No sets recorded yet today
                </div>
              )}
            </div>

            {/* Primary Metric: Reps or Seconds for this set */}
            <div className="space-y-2">
              <div className="flex items-center justify-between font-mono">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                  {isSeconds ? <Clock className="w-3.5 h-3.5 text-[#D1FF00]" /> : <Award className="w-3.5 h-3.5 text-[#D1FF00]" />}
                  {isSeconds ? `Hold Duration (Set #${todaysSets.length + 1})` : `Reps (Set #${todaysSets.length + 1})`}
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
                  className="w-10 h-10 rounded-xl bg-[#0A0A0A] hover:bg-[#1a1a1a] active:scale-95 text-lg font-mono font-bold text-white transition flex items-center justify-center cursor-pointer border border-[#222222]"
                >
                  <Minus className="w-4 h-4" />
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
                  className="w-10 h-10 rounded-xl bg-[#0A0A0A] hover:bg-[#1a1a1a] active:scale-95 text-lg font-mono font-bold text-white transition flex items-center justify-center cursor-pointer border border-[#222222]"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Added Weight (+kg) for this set */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400">
                Added Weight (Set #{todaysSets.length + 1})
              </label>
              <input
                type="number"
                min="0"
                step="0.5"
                max="100"
                value={weightAddedKg > 0 ? weightAddedKg : ''}
                onChange={e => setWeightAddedKg(Math.max(0, Number(e.target.value)))}
                placeholder="+0 kg (Bodyweight)"
                className="w-full bg-[#0A0A0A] border border-[#222222] rounded-xl px-3 py-2 text-sm text-white font-mono focus:border-[#D1FF00] outline-none"
              />
            </div>

            {/* RPE Selector for this set */}
            <div className="space-y-1.5 font-mono">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Exertion (RPE for Set #{todaysSets.length + 1})</span>
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

            {/* Notes / Feedback */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400">Set Notes / Feedback (Optional)</label>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="e.g. Crisp lockout, clean hollow body..."
                rows={2}
                className="w-full bg-[#0A0A0A] border border-[#222222] rounded-xl px-3 py-2 text-xs text-zinc-200 placeholder:text-zinc-600 focus:border-[#D1FF00] outline-none resize-none font-sans"
              />
            </div>

            {/* Rest Timer Auto-Start Cue */}
            <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#0A0A0A] border border-[#222222] text-xs font-mono">
              <span className="text-zinc-300 flex items-center gap-2 text-[11px]">
                <Timer className="w-3.5 h-3.5 text-[#D1FF00]" />
                <span>Recommended Rest: <strong className="text-[#D1FF00] font-bold">{exercise.passCriteria.restSeconds || 90}s</strong></span>
              </span>
              <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D1FF00] animate-pulse" />
                Auto-starts rest timer
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2.5 pt-1">
              <button
                type="button"
                id="cancel-log-btn"
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl border border-[#222222] bg-[#0A0A0A] hover:bg-[#1a1a1a] text-zinc-400 hover:text-zinc-200 font-mono font-bold text-xs uppercase tracking-wider transition flex items-center justify-center cursor-pointer whitespace-nowrap"
              >
                Cancel
              </button>
              <button
                type="submit"
                id="confirm-save-log-btn"
                className="flex-1 py-2.5 rounded-xl bg-[#D1FF00] hover:bg-[#b8e600] text-black font-mono font-extrabold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-sm active:scale-95 cursor-pointer whitespace-nowrap"
              >
                <Check className="w-4 h-4 shrink-0" />
                <span>Log Set</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
