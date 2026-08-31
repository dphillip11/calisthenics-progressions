import React, { useState } from 'react';
import { ProgressionExercise, WorkoutLogEntry, PBRecord, SkillTree } from '../types';
import { BiomechanicalIllustration } from './BiomechanicalIllustration';
import { ProgressGraph } from './ProgressGraph';
import {
  ArrowLeft,
  Award,
  CheckCircle2,
  AlertCircle,
  Target,
  ArrowRight,
  Flame,
  Clock,
  Layers,
  ChevronRight,
  ExternalLink,
  Timer,
  Plus,
  Database
} from 'lucide-react';

interface ExerciseDetailModalProps {
  exercise: ProgressionExercise;
  skillTree?: SkillTree;
  logs: WorkoutLogEntry[];
  pbRecord?: PBRecord;
  allExercises: Record<string, ProgressionExercise>;
  isTimerOpen?: boolean;
  onSelectExercise: (id: string) => void;
  onOpenLogModal: (exercise: ProgressionExercise) => void;
  onSaveLog?: (entry: Omit<WorkoutLogEntry, 'id' | 'timestamp'>) => void;
  onOpenTimer?: (exercise: ProgressionExercise, initialMode?: 'rest' | 'hold') => void;
  onToggleTimer?: () => void;
  onOpenDataModal?: () => void;
  onDeleteLog?: (id: string) => void;
  onClose: () => void;
}

export const ExerciseDetailModal: React.FC<ExerciseDetailModalProps> = ({
  exercise,
  skillTree,
  logs,
  pbRecord,
  allExercises,
  isTimerOpen = false,
  onSelectExercise,
  onOpenLogModal,
  onOpenTimer,
  onToggleTimer,
  onOpenDataModal,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'history'>('overview');

  const isSeconds = exercise.metricType === 'seconds';
  const targetThreshold = isSeconds
    ? exercise.passCriteria.targetHoldSeconds || 10
    : exercise.passCriteria.targetReps || 10;
  const targetSets = exercise.passCriteria.targetSets || 3;

  const currentBest = pbRecord ? pbRecord.bestValue : 0;
  const isPassed = pbRecord?.isPassed || (currentBest >= targetThreshold && targetThreshold > 0);

  const difficultyColors: Record<string, string> = {
    Beginner: 'bg-zinc-800 text-zinc-300 border-zinc-700',
    Intermediate: 'bg-zinc-800 text-zinc-200 border-zinc-600',
    Advanced: 'bg-zinc-800 text-white border-zinc-500',
    Elite: 'bg-[#D1FF00]/15 text-[#D1FF00] border-[#D1FF00]/40'
  };

  const handleTimerAction = () => {
    if (onToggleTimer) {
      onToggleTimer();
    } else if (onOpenTimer) {
      onOpenTimer(exercise, isSeconds ? 'hold' : 'rest');
    }
  };

  return (
    <div
      id="exercise-detail-fullscreen-page"
      className="fixed inset-0 z-40 bg-[#0A0A0A] overflow-y-auto text-zinc-100 flex flex-col font-sans selection:bg-[#D1FF00]/30 selection:text-[#D1FF00] bg-grid-pattern"
    >
      {/* Full-screen Sticky Top Navbar */}
      <header className="sticky top-0 z-30 bg-[#0A0A0A]/95 border-b border-[#222222] backdrop-blur-xl">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-3.5 pb-2.5 flex items-center justify-between gap-3 sm:gap-4">
          {/* Left: Back Button & Exercise Context */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              id="back-to-trees-btn"
              onClick={onClose}
              className="px-3 py-1.5 rounded-xl bg-[#141414] hover:bg-[#1f1f1f] text-zinc-200 hover:text-white border border-[#222222] hover:border-[#D1FF00]/40 transition cursor-pointer flex items-center gap-1.5 text-xs font-mono font-bold shrink-0 shadow-sm active:scale-95 group"
            >
              <ArrowLeft className="w-4 h-4 text-[#D1FF00] group-hover:-translate-x-0.5 transition-transform" />
              <span>Back</span>
            </button>

            <div className="flex items-center gap-2 min-w-0">
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border uppercase tracking-wider shrink-0 ${difficultyColors[exercise.difficulty] || 'border-zinc-700 text-zinc-400'}`}>
                Lvl {exercise.level}
              </span>
              {skillTree && (
                <span className="text-xs font-mono text-zinc-400 truncate hidden sm:inline-block">
                  {skillTree.name}
                </span>
              )}
            </div>
          </div>

          {/* Right: Data & Chrono / Timer Button (Exact same alignment as Main Header) */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Database Button */}
            {onOpenDataModal && (
              <button
                onClick={onOpenDataModal}
                className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-[#141414] hover:bg-[#1f1f1f] text-zinc-300 hover:text-[#D1FF00] border border-[#222222] hover:border-[#D1FF00]/40 transition cursor-pointer flex items-center gap-1.5 text-xs font-mono font-bold shadow-sm"
                title="Data & Storage Management"
              >
                <Database className="w-4 h-4 text-[#D1FF00]" />
                <span className="hidden sm:inline">Data</span>
              </button>
            )}

            {/* Rest Timer / Chrono Button */}
            <button
              id="fullscreen-toggle-timer-btn"
              onClick={handleTimerAction}
              className={`p-2 sm:px-3 sm:py-1.5 rounded-xl border text-xs font-bold font-mono uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 ${
                isTimerOpen
                  ? 'bg-[#D1FF00] text-black border-[#D1FF00] shadow-sm shadow-[#D1FF00]/20'
                  : 'bg-[#141414] hover:bg-[#1c1c1c] text-zinc-300 border-[#222222] hover:text-white'
              }`}
              title="Toggle Rest Timer & Stopwatch"
            >
              <Timer className="w-4 h-4" />
              <span className="hidden sm:inline">Chrono</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar - Full Width & Evenly Distributed */}
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-3 pt-0.5">
          <div className="w-full grid grid-cols-3 bg-[#141414] p-1 sm:p-1.5 rounded-xl border border-[#222222] text-xs font-mono gap-1.5 sm:gap-2">
            <button
              id="exercise-tab-overview"
              onClick={() => setActiveTab('overview')}
              className={`py-2 px-3 rounded-lg font-bold transition cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === 'overview'
                  ? 'bg-[#D1FF00] text-black shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-[#1a1a1a]'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Overview</span>
            </button>

            <button
              id="exercise-tab-history"
              onClick={() => setActiveTab('history')}
              className={`py-2 px-3 rounded-lg font-bold transition cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === 'history'
                  ? 'bg-[#D1FF00] text-black shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-[#1a1a1a]'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>History</span>
            </button>

            <button
              id="exercise-tab-log-set-btn"
              onClick={() => onOpenLogModal(exercise)}
              className="py-2 px-3 rounded-lg font-bold transition cursor-pointer flex items-center justify-center gap-2 bg-[#D1FF00]/10 hover:bg-[#D1FF00] text-[#D1FF00] hover:text-black border border-[#D1FF00]/40 hover:border-[#D1FF00] shadow-sm active:scale-98"
              title="Log a single set via popup"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Log Set</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Page Scrollable Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 space-y-6">
        {/* Exercise Hero Header & Metrics */}
        <div className="bg-[#141414] border border-[#222222] rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold border uppercase tracking-wider ${difficultyColors[exercise.difficulty] || 'border-zinc-700 text-zinc-400'}`}>
                Level {exercise.level} &middot; {exercise.difficulty}
              </span>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-zinc-800 text-zinc-300 border border-zinc-700">
                {exercise.category} Pattern
              </span>
              {exercise.videoDemoUrl && (
                <a
                  href={exercise.videoDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-rose-500/15 border border-rose-500/40 text-rose-400 hover:text-white hover:bg-rose-500/30 text-[10px] font-mono font-bold transition"
                >
                  <span>Video Demo</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-display tracking-tight">
              {exercise.title}
            </h1>
            <p className="text-xs sm:text-sm font-mono text-zinc-400">{exercise.subtitle}</p>
          </div>

          {/* Quick Metrics & PB Status */}
          <div className="flex items-center gap-3 self-start md:self-auto shrink-0">
            <div className="bg-[#0A0A0A] border border-[#222222] rounded-xl px-4 py-2.5 text-right">
              <div className="text-[10px] font-mono font-semibold text-zinc-500 uppercase tracking-widest">
                PERSONAL BEST
              </div>
              <div className="text-2xl font-black text-[#D1FF00] font-mono flex items-baseline justify-end gap-1">
                {currentBest}
                <span className="text-xs font-mono text-zinc-500 font-normal">
                  {isSeconds ? 'sec hold' : 'reps'}
                </span>
              </div>
            </div>

            {isPassed ? (
              <div className="px-4 py-2.5 rounded-xl bg-[#D1FF00]/15 border border-[#D1FF00]/40 text-[#D1FF00] flex flex-col items-center justify-center min-w-[80px]">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-[10px] font-mono font-bold mt-0.5">PASSED</span>
              </div>
            ) : (
              <div className="px-4 py-2.5 rounded-xl bg-[#0A0A0A] border border-[#222222] text-zinc-400 flex flex-col items-center justify-center min-w-[80px]">
                <Target className="w-5 h-5 text-[#D1FF00]" />
                <span className="text-[10px] font-mono font-bold mt-0.5 text-zinc-400">TRAINING</span>
              </div>
            )}
          </div>
        </div>

        {/* TAB 1: OVERVIEW & BLUEPRINT */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Top Row: Movement Image & Pass Criteria Standard */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Biomechanical Vector Diagram */}
              <div className="lg:col-span-6 bg-[#141414] border border-[#222222] rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider">
                  <span>Biomechanical Diagram</span>
                  <span className="text-[10px] text-[#D1FF00] font-mono">Posture Model</span>
                </div>
                <BiomechanicalIllustration
                  type={exercise.illustrationType}
                  className="w-full h-64 rounded-xl"
                  accentColor="#D1FF00"
                />
                <p className="text-xs text-zinc-400 italic px-1 font-sans">
                  {exercise.tips}
                </p>
              </div>

              {/* Pass Criteria & Mastery Standards Box */}
              <div className="lg:col-span-6 bg-[#141414] border border-[#222222] rounded-2xl p-5 space-y-4 shadow-sm flex flex-col justify-between">
                <div className="space-y-3.5">
                  <div className="flex items-center gap-2 text-[#D1FF00]">
                    <Award className="w-4 h-4" />
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                      Mastery Pass Standard
                    </h3>
                  </div>

                  {/* Quantitative Target Benchmark */}
                  <div className="bg-[#0A0A0A] border border-[#222222] rounded-xl p-4 flex items-center justify-between font-mono">
                    <div>
                      <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Required Target</div>
                      <div className="text-xl font-black text-[#D1FF00]">
                        {targetSets} sets &times; {targetThreshold} {isSeconds ? 'sec hold' : 'reps'}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Rest Standard</div>
                      <div className="text-base font-bold text-zinc-200">
                        {exercise.passCriteria.restSeconds}s
                      </div>
                    </div>
                  </div>

                  {/* Strict Form Standard */}
                  <div className="space-y-1">
                    <div className="text-[10px] font-mono font-semibold text-zinc-400 uppercase tracking-widest">
                      Strict Form Standard:
                    </div>
                    <p className="text-xs text-zinc-300 bg-[#0A0A0A] border border-[#222222] rounded-xl p-3 leading-relaxed font-sans">
                      {exercise.passCriteria.formStandard}
                    </p>
                  </div>

                  {exercise.passCriteria.tempo && (
                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                      <Clock className="w-3.5 h-3.5 text-[#D1FF00]" />
                      <span>Cadence / Tempo: <strong className="text-zinc-200">{exercise.passCriteria.tempo}</strong></span>
                    </div>
                  )}
                </div>

                {/* Pass Status Banner */}
                <div>
                  {isPassed ? (
                    <div className="p-3 rounded-xl bg-[#D1FF00]/15 border border-[#D1FF00]/40 text-[#D1FF00] text-xs font-mono flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#D1FF00] shrink-0" />
                      <span>
                        <strong>Mastery Achieved!</strong> PB of {currentBest} {isSeconds ? 's' : 'reps'} meets target.
                      </span>
                    </div>
                  ) : (
                    <div className="p-3 rounded-xl bg-[#0A0A0A] border border-[#222222] text-zinc-300 text-xs font-mono flex items-center justify-between">
                      <span>Current PB: <strong>{currentBest}</strong> / {targetThreshold} {isSeconds ? 's' : 'reps'}</span>
                      <span className="font-bold text-[#D1FF00]">
                        {targetThreshold - currentBest} {isSeconds ? 's' : 'reps'} to pass
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Movement Mechanics & Blueprint */}
            <div className="bg-[#141414] border border-[#222222] rounded-2xl p-5 space-y-3">
              <h3 className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
                Movement Blueprint &amp; Mechanics
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed font-sans">{exercise.description}</p>
            </div>

            {/* Form Cues vs Common Mistakes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Form Cues */}
              <div className="bg-[#141414] border border-[#222222] rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-[#D1FF00] text-[10px] font-mono font-bold uppercase tracking-widest">
                  <CheckCircle2 className="w-4 h-4" />
                  Essential Form Cues
                </div>
                <ul className="space-y-2">
                  {exercise.formCues.map((cue, i) => (
                    <li key={i} className="text-xs sm:text-sm text-zinc-300 flex items-start gap-2.5 font-sans">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D1FF00] shrink-0 mt-2" />
                      <span>{cue}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Common Mistakes */}
              <div className="bg-[#141414] border border-[#222222] rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-rose-400 text-[10px] font-mono font-bold uppercase tracking-widest">
                  <AlertCircle className="w-4 h-4" />
                  Common Mistakes to Avoid
                </div>
                <ul className="space-y-2">
                  {exercise.commonMistakes.map((mistake, i) => (
                    <li key={i} className="text-xs sm:text-sm text-zinc-300 flex items-start gap-2.5 font-sans">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-2" />
                      <span>{mistake}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Muscle Activations & Equipment */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#141414] border border-[#222222] rounded-2xl p-5 space-y-2.5">
                <div className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-[#D1FF00]" />
                  Target Muscle Groups
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {exercise.primaryMuscles.map(m => (
                    <span key={m} className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-[#D1FF00]/15 text-[#D1FF00] border border-[#D1FF00]/40">
                      {m} (Primary)
                    </span>
                  ))}
                  {exercise.secondaryMuscles.map(m => (
                    <span key={m} className="px-2.5 py-1 rounded-lg text-xs font-mono text-zinc-400 bg-[#0A0A0A] border border-[#222222]">
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-[#141414] border border-[#222222] rounded-2xl p-5 space-y-2.5">
                <div className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-zinc-400" />
                  Required Equipment &amp; Pattern
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {exercise.equipment.map(eq => (
                    <span key={eq} className="px-2.5 py-1 rounded-lg text-xs font-mono text-zinc-300 bg-[#0A0A0A] border border-[#222222]">
                      {eq}
                    </span>
                  ))}
                  <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-zinc-800 text-zinc-200 border border-zinc-700">
                    {exercise.category} Pattern
                  </span>
                </div>
              </div>
            </div>

            {/* Prerequisites & Next Skills */}
            <div className="bg-[#141414] border border-[#222222] rounded-2xl p-5 space-y-3">
              <div className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
                Progression Roadmap Connections
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono">
                {/* Prerequisites */}
                <div>
                  <div className="text-[10px] text-zinc-500 mb-1.5 uppercase tracking-wider">Prerequisites</div>
                  {exercise.prerequisites.length === 0 ? (
                    <div className="text-xs text-zinc-500 italic font-sans">None (Foundational Entry)</div>
                  ) : (
                    <div className="space-y-2">
                      {exercise.prerequisites.map(preId => {
                        const preEx = allExercises[preId];
                        if (!preEx) return null;
                        return (
                          <button
                            key={preId}
                            onClick={() => onSelectExercise(preId)}
                            className="w-full text-left p-2.5 rounded-xl bg-[#0A0A0A] hover:bg-[#1c1c1c] border border-[#222222] transition flex items-center justify-between text-xs text-zinc-200 cursor-pointer"
                          >
                            <span className="font-semibold truncate">{preEx.title}</span>
                            <ChevronRight className="w-4 h-4 text-zinc-500 shrink-0" />
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Next Skills */}
                <div>
                  <div className="text-[10px] text-zinc-500 mb-1.5 uppercase tracking-wider">Next Progression Step</div>
                  {exercise.unlockedSkills.length === 0 ? (
                    <div className="text-xs text-[#D1FF00] font-bold p-2.5 bg-[#0A0A0A] rounded-xl border border-[#D1FF00]/20">
                      ★ Pinnacle Skill Mastery Reached
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {exercise.unlockedSkills.map(nextId => {
                        const nextEx = allExercises[nextId];
                        if (!nextEx) return null;
                        return (
                          <button
                            key={nextId}
                            onClick={() => onSelectExercise(nextId)}
                            className="w-full text-left p-2.5 rounded-xl bg-[#0A0A0A] hover:bg-[#1c1c1c] border border-[#222222] hover:border-[#D1FF00]/40 transition flex items-center justify-between text-xs text-[#D1FF00] cursor-pointer"
                          >
                            <span className="font-semibold truncate">{nextEx.title}</span>
                            <ArrowRight className="w-4 h-4 text-[#D1FF00] shrink-0" />
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

        {/* TAB 2: HISTORY & PROGRESS GRAPH */}
        {activeTab === 'history' && (
          <ProgressGraph
            exercise={exercise}
            logs={logs}
            pbRecord={pbRecord}
          />
        )}
      </main>
    </div>
  );
};
