import React, { useState } from 'react';
import { ProgressionExercise, WorkoutLogEntry, PBRecord, SkillTree } from '../types';
import { BiomechanicalIllustration } from './BiomechanicalIllustration';
import { ProgressGraph } from './ProgressGraph';
import {
  X,
  Award,
  CheckCircle2,
  AlertCircle,
  Dumbbell,
  Target,
  ArrowRight,
  Flame,
  Clock,
  Layers,
  ChevronRight,
  Trash2,
  Calendar,
  Sparkles,
  Info,
  ExternalLink
} from 'lucide-react';

interface ExerciseDetailModalProps {
  exercise: ProgressionExercise;
  skillTree?: SkillTree;
  logs: WorkoutLogEntry[];
  pbRecord?: PBRecord;
  allExercises: Record<string, ProgressionExercise>;
  onSelectExercise: (id: string) => void;
  onOpenLogModal: (exercise: ProgressionExercise) => void;
  onDeleteLog?: (id: string) => void;
  onClose: () => void;
}

export const ExerciseDetailModal: React.FC<ExerciseDetailModalProps> = ({
  exercise,
  skillTree,
  logs,
  pbRecord,
  allExercises,
  onSelectExercise,
  onOpenLogModal,
  onDeleteLog,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'graph' | 'history'>('overview');

  const isSeconds = exercise.metricType === 'seconds';
  const targetThreshold = isSeconds
    ? exercise.passCriteria.targetHoldSeconds || 0
    : exercise.passCriteria.targetReps || 0;

  const currentBest = pbRecord ? pbRecord.bestValue : 0;
  const isPassed = pbRecord?.isPassed || (currentBest >= targetThreshold && targetThreshold > 0);

  const exerciseLogs = [...logs]
    .filter(l => l.exerciseId === exercise.id)
    .sort((a, b) => b.timestamp - a.timestamp);

  const difficultyColors: Record<string, string> = {
    Beginner: 'bg-zinc-800 text-zinc-300 border-zinc-700',
    Intermediate: 'bg-zinc-800 text-zinc-200 border-zinc-600',
    Advanced: 'bg-zinc-800 text-white border-zinc-500',
    Elite: 'bg-[#D1FF00]/15 text-[#D1FF00] border-[#D1FF00]/40'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div
        id="exercise-detail-modal-container"
        className="relative w-full max-w-4xl bg-[#141414] border border-[#222222] rounded-xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Sticky Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#222222] bg-[#0A0A0A] sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border uppercase tracking-wider ${difficultyColors[exercise.difficulty] || 'border-zinc-700 text-zinc-400'}`}>
              Level {exercise.level} · {exercise.difficulty}
            </span>
            {skillTree && (
              <span className="text-xs font-mono text-zinc-500 hidden sm:inline-block">
                {skillTree.name}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenLogModal(exercise)}
              className="px-3 py-1.5 rounded-lg bg-[#D1FF00] hover:bg-[#b8e600] text-black font-mono font-extrabold text-xs uppercase tracking-wider transition flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
            >
              <Dumbbell className="w-3.5 h-3.5" />
              Log Set / PB
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-[#222222] transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {/* Title & Summary */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-black text-white font-display tracking-tight">
                {exercise.title}
              </h2>
              <p className="text-xs font-mono text-zinc-400">{exercise.subtitle}</p>
            </div>

            {/* Current Status Pill */}
            <div className="flex items-center gap-2.5 self-start md:self-auto">
              <div className="bg-[#0A0A0A] border border-[#222222] rounded-lg px-3.5 py-2 text-right">
                <div className="text-[9px] font-mono font-semibold text-zinc-500 uppercase tracking-widest">
                  PERSONAL BEST
                </div>
                <div className="text-xl font-black text-[#D1FF00] font-mono flex items-baseline justify-end gap-1">
                  {currentBest}
                  <span className="text-[10px] font-mono text-zinc-500 font-normal">
                    {isSeconds ? 'sec hold' : 'reps'}
                  </span>
                </div>
              </div>

              {isPassed ? (
                <div className="p-2.5 rounded-lg bg-[#D1FF00]/15 border border-[#D1FF00]/40 text-[#D1FF00] flex flex-col items-center justify-center min-w-[68px]">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="text-[9px] font-mono font-bold mt-0.5">PASSED</span>
                </div>
              ) : (
                <div className="p-2.5 rounded-lg bg-[#0A0A0A] border border-[#222222] text-zinc-400 flex flex-col items-center justify-center min-w-[68px]">
                  <Target className="w-5 h-5 text-[#D1FF00]" />
                  <span className="text-[9px] font-mono font-bold mt-0.5 text-zinc-400">TRAINING</span>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Tabs inside modal */}
          <div className="flex items-center gap-2 border-b border-[#222222] pb-2 font-mono">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-[#D1FF00] text-black shadow-sm'
                  : 'bg-[#0A0A0A] text-zinc-400 border border-[#222222] hover:text-white'
              }`}
            >
              Overview &amp; Pass Criteria
            </button>
            <button
              onClick={() => setActiveTab('graph')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'graph'
                  ? 'bg-[#D1FF00] text-black shadow-sm'
                  : 'bg-[#0A0A0A] text-zinc-400 border border-[#222222] hover:text-white'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              PB Progress Graph
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'history'
                  ? 'bg-[#D1FF00] text-black shadow-sm'
                  : 'bg-[#0A0A0A] text-zinc-400 border border-[#222222] hover:text-white'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              Logs ({exerciseLogs.length})
            </button>
          </div>

          {/* TAB 1: OVERVIEW & PASS CRITERIA */}
          {activeTab === 'overview' && (
            <div className="space-y-5">
              {/* Top Row: Movement Image + Pass Criteria Box */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Movement Vector Diagram */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider">
                    <span>Biomechanical Diagram</span>
                    <span className="text-[10px] text-[#D1FF00] font-mono">Posture Model</span>
                  </div>
                  <BiomechanicalIllustration
                    type={exercise.illustrationType}
                    className="w-full h-52 rounded-lg"
                    accentColor="#D1FF00"
                  />
                  <p className="text-xs text-zinc-400 italic px-1 font-sans">
                    {exercise.tips}
                  </p>
                </div>

                {/* Detailed Pass Criteria Box */}
                <div className="bg-[#0A0A0A] border border-[#222222] rounded-lg p-4 space-y-3.5 shadow-sm">
                  <div className="flex items-center gap-2 text-[#D1FF00]">
                    <Award className="w-4 h-4" />
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                      Mastery Pass Standard
                    </h4>
                  </div>

                  {/* Quantitative Target Benchmark */}
                  <div className="bg-[#141414] border border-[#222222] rounded-md p-3.5 flex items-center justify-between font-mono">
                    <div>
                      <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Required Target</div>
                      <div className="text-lg font-black text-[#D1FF00]">
                        {exercise.passCriteria.targetSets} sets × {targetThreshold} {isSeconds ? 'sec hold' : 'reps'}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Rest Standard</div>
                      <div className="text-sm font-bold text-zinc-200">
                        {exercise.passCriteria.restSeconds}s
                      </div>
                    </div>
                  </div>

                  {/* Form Standard Requirements */}
                  <div className="space-y-1">
                    <div className="text-[10px] font-mono font-semibold text-zinc-400 uppercase tracking-widest">
                      Strict Form Standard:
                    </div>
                    <p className="text-xs text-zinc-300 bg-[#141414] border border-[#222222] rounded-md p-2.5 leading-relaxed font-sans">
                      {exercise.passCriteria.formStandard}
                    </p>
                  </div>

                  {exercise.passCriteria.tempo && (
                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                      <Clock className="w-3 h-3 text-[#D1FF00]" />
                      <span>Cadence / Tempo: <strong className="text-zinc-200">{exercise.passCriteria.tempo}</strong></span>
                    </div>
                  )}

                  {/* Pass Status Banner */}
                  {isPassed ? (
                    <div className="p-2.5 rounded-md bg-[#D1FF00]/15 border border-[#D1FF00]/40 text-[#D1FF00] text-xs font-mono flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#D1FF00] shrink-0" />
                      <span>
                        <strong>Mastery Achieved!</strong> PB of {currentBest} {isSeconds ? 's' : 'reps'} meets target.
                      </span>
                    </div>
                  ) : (
                    <div className="p-2.5 rounded-md bg-[#141414] border border-[#222222] text-zinc-300 text-xs font-mono flex items-center justify-between">
                      <span>Current: <strong>{currentBest}</strong> / {targetThreshold} {isSeconds ? 's' : 'reps'}</span>
                      <span className="font-bold text-[#D1FF00]">
                        {targetThreshold - currentBest} {isSeconds ? 's' : 'reps'} to pass
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="bg-[#0A0A0A] border border-[#222222] rounded-lg p-4 space-y-1.5">
                <h4 className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">Movement Blueprint &amp; Mechanics</h4>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">{exercise.description}</p>
              </div>

              {/* Form Cues vs Common Mistakes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {/* Form Cues */}
                <div className="bg-[#0A0A0A] border border-[#222222] rounded-lg p-4 space-y-2.5">
                  <div className="flex items-center gap-2 text-[#D1FF00] text-[10px] font-mono font-bold uppercase tracking-widest">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Essential Form Cues
                  </div>
                  <ul className="space-y-1.5">
                    {exercise.formCues.map((cue, i) => (
                      <li key={i} className="text-xs text-zinc-300 flex items-start gap-2 font-sans">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D1FF00] shrink-0 mt-1.5" />
                        <span>{cue}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Common Mistakes */}
                <div className="bg-[#0A0A0A] border border-[#222222] rounded-lg p-4 space-y-2.5">
                  <div className="flex items-center gap-2 text-rose-400 text-[10px] font-mono font-bold uppercase tracking-widest">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Common Mistakes to Avoid
                  </div>
                  <ul className="space-y-1.5">
                    {exercise.commonMistakes.map((mistake, i) => (
                      <li key={i} className="text-xs text-zinc-300 flex items-start gap-2 font-sans">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-1.5" />
                        <span>{mistake}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Muscle Activations & Equipment */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Muscles */}
                <div className="bg-[#0A0A0A] border border-[#222222] rounded-lg p-3.5 space-y-2">
                  <div className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-[#D1FF00]" />
                    Target Muscle Groups
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {exercise.primaryMuscles.map(m => (
                      <span key={m} className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#D1FF00]/15 text-[#D1FF00] border border-[#D1FF00]/40">
                        {m} (Primary)
                      </span>
                    ))}
                    {exercise.secondaryMuscles.map(m => (
                      <span key={m} className="px-2 py-0.5 rounded text-[10px] font-mono text-zinc-400 bg-[#141414] border border-[#222222]">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Equipment & Category */}
                <div className="bg-[#0A0A0A] border border-[#222222] rounded-lg p-3.5 space-y-2">
                  <div className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-zinc-400" />
                    Required Equipment &amp; Pattern
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {exercise.equipment.map(eq => (
                      <span key={eq} className="px-2 py-0.5 rounded text-[10px] font-mono text-zinc-300 bg-[#141414] border border-[#222222]">
                        {eq}
                      </span>
                    ))}
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-zinc-800 text-zinc-200 border border-zinc-700">
                      {exercise.category} Pattern
                    </span>
                  </div>
                </div>
              </div>

              {/* Prerequisites & Next Skills */}
              <div className="bg-[#0A0A0A] border border-[#222222] rounded-lg p-3.5 space-y-2.5">
                <div className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
                  Progression Roadmap Connections
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
                  {/* Prerequisites */}
                  <div>
                    <div className="text-[10px] text-zinc-500 mb-1 uppercase tracking-wider">Prerequisites</div>
                    {exercise.prerequisites.length === 0 ? (
                      <div className="text-xs text-zinc-500 italic font-sans">None (Foundational Entry)</div>
                    ) : (
                      <div className="space-y-1.5">
                        {exercise.prerequisites.map(preId => {
                          const preEx = allExercises[preId];
                          if (!preEx) return null;
                          return (
                            <button
                              key={preId}
                              onClick={() => onSelectExercise(preId)}
                              className="w-full text-left p-2 rounded-md bg-[#141414] hover:bg-[#1c1c1c] border border-[#222222] transition flex items-center justify-between text-xs text-zinc-200 cursor-pointer"
                            >
                              <span className="font-semibold truncate">{preEx.title}</span>
                              <ChevronRight className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Next Unlocked Skills */}
                  <div>
                    <div className="text-[10px] text-zinc-500 mb-1 uppercase tracking-wider">Next Unlocked Progression</div>
                    {exercise.unlockedSkills.length === 0 ? (
                      <div className="text-xs text-[#D1FF00] font-bold">
                        ★ Pinnacle Skill Mastery Reached
                      </div>
                    ) : (
                      <div className="space-y-1.5">
                        {exercise.unlockedSkills.map(nextId => {
                          const nextEx = allExercises[nextId];
                          if (!nextEx) return null;
                          return (
                            <button
                              key={nextId}
                              onClick={() => onSelectExercise(nextId)}
                              className="w-full text-left p-2 rounded-md bg-[#141414] hover:bg-[#1c1c1c] border border-[#222222] hover:border-[#D1FF00]/40 transition flex items-center justify-between text-xs text-[#D1FF00] cursor-pointer"
                            >
                              <span className="font-semibold truncate">{nextEx.title}</span>
                              <ArrowRight className="w-3.5 h-3.5 text-[#D1FF00] shrink-0" />
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROGRESS GRAPH */}
          {activeTab === 'graph' && (
            <div>
              <ProgressGraph
                exercise={exercise}
                logs={logs}
                pbRecord={pbRecord}
                onOpenLogModal={() => onOpenLogModal(exercise)}
              />
            </div>
          )}

          {/* TAB 3: WORKOUT LOG HISTORY */}
          {activeTab === 'history' && (
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">Historical Workout Log Entries</h4>
                <button
                  onClick={() => onOpenLogModal(exercise)}
                  className="px-3 py-1.5 rounded-lg bg-[#D1FF00] hover:bg-[#b8e600] text-black font-mono font-extrabold text-xs uppercase tracking-wider transition flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Dumbbell className="w-3.5 h-3.5" /> Log New Entry
                </button>
              </div>

              {exerciseLogs.length === 0 ? (
                <div className="p-8 text-center bg-[#0A0A0A] rounded-lg border border-[#222222] text-zinc-500 font-mono text-xs">
                  No workouts recorded for this exercise yet. Click above to log your first session!
                </div>
              ) : (
                <div className="space-y-2">
                  {exerciseLogs.map(log => (
                    <div
                      key={log.id}
                      className="p-3 rounded-lg bg-[#0A0A0A] border border-[#222222] flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-zinc-700 transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-md bg-[#141414] border border-[#222222] text-[#D1FF00] font-mono font-bold text-base min-w-[50px] text-center">
                          {log.metricValue}
                          <span className="text-[9px] block font-mono text-zinc-500">
                            {isSeconds ? 'sec' : 'reps'}
                          </span>
                        </div>

                        <div className="space-y-0.5 font-mono">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white">{log.date}</span>
                            {log.isPB && (
                              <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-[#D1FF00]/15 text-[#D1FF00] border border-[#D1FF00]/40">
                                ★ Personal Best
                              </span>
                            )}
                            {log.passedCriteria && (
                              <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-white/10 text-white border border-white/20">
                                ✓ Passed
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-zinc-400">
                            {log.sets} sets {log.weightAddedKg ? `· +${log.weightAddedKg}kg` : ''} {log.rpe ? `· RPE ${log.rpe}/10` : ''}
                          </div>
                          {log.notes && (
                            <p className="text-[11px] text-zinc-500 italic pt-0.5 font-sans">
                              "{log.notes}"
                            </p>
                          )}
                        </div>
                      </div>

                      {onDeleteLog && (
                        <button
                          onClick={() => onDeleteLog(log.id)}
                          className="self-end sm:self-center p-1.5 rounded-md text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 transition cursor-pointer"
                          title="Delete log entry"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
