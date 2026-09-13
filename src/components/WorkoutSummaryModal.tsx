import React, { useState, useEffect } from 'react';
import {
  WorkoutPreset,
  WorkoutSessionConfig,
  ProgressionExercise,
  PBRecord,
  SkillTree
} from '../types';
import { WORKOUT_PRESETS } from '../data/workoutPresets';
import { WARMUP_EXERCISES } from '../data/warmupData';
import { STRETCH_EXERCISES } from '../data/stretchData';
import {
  ArrowLeft,
  Dumbbell,
  Play,
  Flame,
  Activity,
  Layers,
  Clock,
  CheckCircle2,
  Zap,
  Timer,
  Database
} from 'lucide-react';

interface WorkoutSummaryModalProps {
  isOpen?: boolean;
  onClose: () => void;
  preset: WorkoutPreset;
  sessionConfig: WorkoutSessionConfig;
  trees: SkillTree[];
  pbRecords: Record<string, PBRecord>;
  allExercises: Record<string, ProgressionExercise>;
  isTimerOpen?: boolean;
  onToggleTimer?: () => void;
  onOpenDataModal?: () => void;
  onSelectPreset: (preset: WorkoutPreset) => void;
  onChangeExerciseLevel: (slot: 'A1' | 'B1' | 'A2' | 'B2', exercise: ProgressionExercise) => void;
  onStartWorkout: () => void;
}

export const WorkoutSummaryModal: React.FC<WorkoutSummaryModalProps> = ({
  isOpen = true,
  onClose,
  preset,
  sessionConfig,
  trees,
  pbRecords,
  allExercises,
  isTimerOpen = false,
  onToggleTimer,
  onOpenDataModal,
  onSelectPreset,
  onChangeExerciseLevel,
  onStartWorkout
}) => {
  if (isOpen === false) return null;

  const [activeTab, setActiveTab] = useState<'overview' | 'warmups' | 'stretches'>('warmups');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [preset.id]);

  const treeA1 = trees.find(t => t.id === preset.superset1.treeAId);
  const treeB1 = trees.find(t => t.id === preset.superset1.treeBId);
  const treeA2 = trees.find(t => t.id === preset.superset2.treeAId);
  const treeB2 = trees.find(t => t.id === preset.superset2.treeBId);

  const warmups = preset.warmupIds
    .map(id => WARMUP_EXERCISES.find(w => w.id === id))
    .filter(Boolean);

  const stretches = preset.stretchIds
    .map(id => STRETCH_EXERCISES.find(s => s.id === id))
    .filter(Boolean);

  const getSkillLabel = (treeId: string) => {
    switch (treeId) {
      case 'pull-up-muscle-up':
        return 'Pull-Ups';
      case 'beginner-pull-up-tree':
        return 'Pull Foundations';
      case 'muscle-up-assistance-tree':
        return 'Muscle-Up';
      case 'dips-progression':
        return 'Dips';
      case 'push-up-planche':
        return 'Push-Ups & Planche';
      case 'handstand-hspu':
        return 'Handstand';
      case 'front-lever-progression':
        return 'Front Lever';
      case 'dragon-flag-tree':
        return 'Dragon Flag';
      case 'l-sit-v-sit-manna':
        return 'L-Sit / V-Sit';
      case 'pistol-squat-tree':
        return 'Pistol Squats';
      default: {
        const found = trees.find(t => t.id === treeId);
        return found?.shortName || found?.name || 'Skill';
      }
    }
  };

  const skillsSummary = `${getSkillLabel(preset.superset1.treeAId)} & ${getSkillLabel(preset.superset1.treeBId)} • ${getSkillLabel(preset.superset2.treeAId)} & ${getSkillLabel(preset.superset2.treeBId)}`;

  const renderExerciseSlot = (
    label: string,
    slotKey: 'A1' | 'B1' | 'A2' | 'B2',
    tree: SkillTree | undefined,
    exercise: ProgressionExercise
  ) => {
    const isPassed = pbRecords[exercise.id]?.isPassed;
    const treeExList = tree?.exercises.map(id => allExercises[id]).filter(Boolean) || [];
    const currentIndex = treeExList.findIndex(e => e.id === exercise.id);

    return (
      <div className="bg-[#20232a] rounded-2xl border border-[#333742] hover:border-[#4b5263] p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 shadow-sm">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 bg-[#14161b] px-2.5 py-0.5 rounded border border-[#2b2f38]">
              {label} · {tree?.shortName}
            </span>
            {isPassed ? (
              <span className="text-[10px] font-mono text-[#D1FF00] bg-[#D1FF00]/10 px-2 py-0.5 rounded flex items-center gap-1 border border-[#D1FF00]/25">
                <CheckCircle2 className="w-3 h-3" /> Mastered
              </span>
            ) : (
              <span className="text-[10px] font-mono text-zinc-400 bg-[#14161b] px-2 py-0.5 rounded border border-[#2b2f38]">
                {exercise.difficulty}
              </span>
            )}
          </div>

          <h4 className="text-base sm:text-lg font-bold text-white font-display line-clamp-1">
            {exercise.title}
          </h4>
          <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
            {exercise.subtitle}
          </p>
        </div>

        {/* Target & Level Stepper */}
        <div className="mt-4 pt-3.5 border-t border-[#2d313d] flex items-center justify-between text-xs font-mono">
          <div>
            <span className="text-zinc-400 text-[10px] uppercase block tracking-wider">Target Criteria</span>
            <span className="font-bold text-[#D1FF00] text-sm">
              {exercise.metricType === 'seconds'
                ? `${exercise.passCriteria.targetHoldSeconds || 15}s Hold`
                : `${exercise.passCriteria.targetReps || 8} Reps`}
            </span>
          </div>

          {/* Level Switcher */}
          <div className="flex items-center gap-1 bg-[#14161b] p-1 rounded-xl border border-[#2b2f38]">
            <button
              onClick={() => {
                if (currentIndex > 0) {
                  onChangeExerciseLevel(slotKey, treeExList[currentIndex - 1]);
                }
              }}
              disabled={currentIndex <= 0}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-[#20232a] disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer transition text-xs font-bold"
              title="Regression / Lower Level"
            >
              ←
            </button>
            <span className="text-xs font-bold text-zinc-200 px-2 font-mono">
              Lvl {exercise.level}
            </span>
            <button
              onClick={() => {
                if (currentIndex < treeExList.length - 1) {
                  onChangeExerciseLevel(slotKey, treeExList[currentIndex + 1]);
                }
              }}
              disabled={currentIndex >= treeExList.length - 1}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-[#20232a] disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer transition text-xs font-bold"
              title="Progression / Higher Level"
            >
              →
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      id="workout-summary-page"
      className="w-full min-h-screen bg-[#0A0A0A] text-zinc-100 flex flex-col font-sans selection:bg-[#D1FF00]/30 selection:text-[#D1FF00] bg-grid-pattern"
    >
      {/* Full-screen Sticky Top Navbar (Identical to Exercise Details Page) */}
      <header className="sticky top-0 z-30 bg-[#0A0A0A]/95 border-b border-[#222222] backdrop-blur-xl">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-3.5 pb-2.5 flex items-center justify-between gap-3 sm:gap-4">
          {/* Left: Back Button & Context (Identical to Exercise Details Page) */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              id="back-from-summary-btn"
              onClick={onClose}
              className="px-3 py-1.5 rounded-xl bg-[#141414] hover:bg-[#1f1f1f] text-zinc-200 hover:text-white border border-[#222222] hover:border-[#D1FF00]/40 transition cursor-pointer flex items-center gap-1.5 text-xs font-mono font-bold shrink-0 shadow-sm active:scale-95 group"
            >
              <ArrowLeft className="w-4 h-4 text-[#D1FF00] group-hover:-translate-x-0.5 transition-transform" />
              <span>Back</span>
            </button>

            <div className="flex items-center gap-2 min-w-0">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold border uppercase tracking-wider shrink-0 bg-[#D1FF00]/10 text-[#D1FF00] border-[#D1FF00]/25">
                Workout {preset.name}
              </span>
              <span className="text-xs font-mono text-zinc-400 truncate hidden sm:inline-block">
                {preset.subtitle}
              </span>
            </div>
          </div>

          {/* Right: Data, Chrono & Begin Workout Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
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

            {onToggleTimer && (
              <button
                id="summary-toggle-timer-btn"
                onClick={onToggleTimer}
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
            )}

            <button
              id="begin-workout-header-btn"
              onClick={onStartWorkout}
              className="px-4 py-1.5 rounded-xl bg-[#D1FF00] hover:bg-[#b8e600] text-black font-mono font-black text-xs uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 shadow-sm shadow-[#D1FF00]/20 active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-black stroke-[2.2]" />
              <span>Begin</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Page Scrollable Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 space-y-5">
        {/* Workout Title Header (Clean, concise - no big banner) */}
        <div>
          <p className="text-xs font-mono text-zinc-400 mb-1">
            {skillsSummary}
          </p>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight">
            Workout {preset.name}: {preset.subtitle}
          </h1>
        </div>

        {/* Workout Selection: 4 evenly spaced buttons labeled A, B, C, D */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {WORKOUT_PRESETS.map(p => {
            const isSelected = p.id === preset.id;
            return (
              <button
                key={p.id}
                id={`preset-btn-${p.name.toLowerCase()}`}
                onClick={() => onSelectPreset(p)}
                className={`py-2.5 sm:py-3 rounded-xl border text-center font-mono font-black text-sm sm:text-base transition-all duration-150 cursor-pointer shadow-xs ${
                  isSelected
                    ? 'bg-[#181b22] text-[#D1FF00] border-[#D1FF00] ring-1 ring-[#D1FF00]/40 shadow-sm shadow-[#D1FF00]/15'
                    : 'bg-[#111317] hover:bg-[#181a20] text-zinc-400 hover:text-zinc-200 border-[#262a35]'
                }`}
                title={`Workout ${p.name}: ${p.subtitle}`}
              >
                {p.name}
              </button>
            );
          })}
        </div>

        {/* Sections Tabs: Warmup on the left of Supersets */}
        <div className="w-full grid grid-cols-3 bg-[#141414] p-1 sm:p-1.5 rounded-xl border border-[#222222] text-xs font-mono gap-1.5 sm:gap-2">
          <button
            id="workout-tab-warmups"
            onClick={() => setActiveTab('warmups')}
            className={`py-2 px-3 rounded-lg font-bold transition cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'warmups'
                ? 'bg-[#D1FF00] text-black shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-[#1a1a1a]'
            }`}
          >
            <Flame className="w-4 h-4" />
            <span>Warmup ({warmups.length})</span>
          </button>

          <button
            id="workout-tab-overview"
            onClick={() => setActiveTab('overview')}
            className={`py-2 px-3 rounded-lg font-bold transition cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'overview'
                ? 'bg-[#D1FF00] text-black shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-[#1a1a1a]'
            }`}
          >
            <Dumbbell className="w-4 h-4" />
            <span>Supersets</span>
          </button>

          <button
            id="workout-tab-stretches"
            onClick={() => setActiveTab('stretches')}
            className={`py-2 px-3 rounded-lg font-bold transition cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'stretches'
                ? 'bg-[#D1FF00] text-black shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-[#1a1a1a]'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Stretches ({stretches.length})</span>
          </button>
        </div>

        {/* Active Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6 pt-2">
            {/* SUPERSET 1 ENCASED PAIR */}
            <div className="relative border border-[#2b2f38] rounded-2xl p-4 sm:p-5 pt-6 transition-colors">
              <div className="absolute -top-2 left-4 sm:left-5 bg-[#0A0A0A] px-2.5 flex items-center">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300">
                  Superset 1 · {sessionConfig.roundsPerSuperset} Rounds
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderExerciseSlot(preset.superset1.labelA, 'A1', treeA1, sessionConfig.exerciseA1)}
                {renderExerciseSlot(preset.superset1.labelB, 'B1', treeB1, sessionConfig.exerciseB1)}
              </div>
            </div>

            {/* INTER-SUPERSET REST INDICATOR */}
            <div className="flex items-center justify-center gap-3 py-1">
              <div className="h-px bg-[#262933] flex-1" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#D1FF00] bg-[#14161b] px-4 py-1.5 rounded-full border border-[#2b2f38] shadow-xs">
                120s Transition Rest Between Supersets
              </span>
              <div className="h-px bg-[#262933] flex-1" />
            </div>

            {/* SUPERSET 2 ENCASED PAIR */}
            <div className="relative border border-[#2b2f38] rounded-2xl p-4 sm:p-5 pt-6 transition-colors">
              <div className="absolute -top-2 left-4 sm:left-5 bg-[#0A0A0A] px-2.5 flex items-center">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300">
                  Superset 2 · {sessionConfig.roundsPerSuperset} Rounds
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderExerciseSlot(preset.superset2.labelA, 'A2', treeA2, sessionConfig.exerciseA2)}
                {renderExerciseSlot(preset.superset2.labelB, 'B2', treeB2, sessionConfig.exerciseB2)}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'warmups' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {warmups.map((w, idx) => (
                <div
                  key={w!.id}
                  className="bg-[#20232a] rounded-2xl border border-[#333742] hover:border-[#4b5263] p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 bg-[#14161b] px-2.5 py-0.5 rounded border border-[#2b2f38]">
                        Warmup #{idx + 1} · {w!.categoryLabel}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400 bg-[#14161b] px-2 py-0.5 rounded border border-[#2b2f38]">
                        {w!.difficulty}
                      </span>
                    </div>

                    <h4 className="text-base sm:text-lg font-bold text-white font-display line-clamp-1">
                      {w!.name}
                    </h4>
                    <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                      {w!.purpose}
                    </p>
                  </div>

                  {/* Timing under hard rule */}
                  <div className="mt-4 pt-3.5 border-t border-[#2d313d] flex items-center justify-between text-xs font-mono">
                    <div>
                      <span className="text-zinc-400 text-[10px] uppercase block tracking-wider">Target Timing</span>
                      <span className="font-bold text-[#D1FF00] text-sm">
                        {w!.target}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 bg-[#14161b] px-2.5 py-1.5 rounded-xl border border-[#2b2f38] text-[11px] font-mono text-zinc-300">
                      <Clock className="w-3.5 h-3.5 text-[#D1FF00]" />
                      <span>Auto-Timed</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'stretches' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stretches.map((s, idx) => (
                <div
                  key={s!.id}
                  className="bg-[#20232a] rounded-2xl border border-[#333742] hover:border-[#4b5263] p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 bg-[#14161b] px-2.5 py-0.5 rounded border border-[#2b2f38]">
                        Cooldown #{idx + 1} · {s!.categoryLabel}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400 bg-[#14161b] px-2 py-0.5 rounded border border-[#2b2f38]">
                        {s!.intensity}
                      </span>
                    </div>

                    <h4 className="text-base sm:text-lg font-bold text-white font-display line-clamp-1">
                      {s!.name}
                    </h4>
                    <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                      {s!.purpose}
                    </p>
                  </div>

                  {/* Timing under hard rule */}
                  <div className="mt-4 pt-3.5 border-t border-[#2d313d] flex items-center justify-between text-xs font-mono">
                    <div>
                      <span className="text-zinc-400 text-[10px] uppercase block tracking-wider">Target Timing</span>
                      <span className="font-bold text-[#D1FF00] text-sm">
                        {s!.target}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 bg-[#14161b] px-2.5 py-1.5 rounded-xl border border-[#2b2f38] text-[11px] font-mono text-zinc-300">
                      <Clock className="w-3.5 h-3.5 text-[#D1FF00]" />
                      <span>Recovery Hold</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Actions Bar */}
        <div className="pt-6 flex items-center justify-end border-t border-[#222222]">
          <button
            id="begin-workout-bottom-btn"
            onClick={onStartWorkout}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#D1FF00] hover:bg-[#b8e600] text-black font-mono font-black text-xs uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-[#D1FF00]/20 active:scale-95"
          >
            <Play className="w-4 h-4 fill-black stroke-[2.2]" />
            <span>Begin Workout</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export const WorkoutSummaryView = WorkoutSummaryModal;
