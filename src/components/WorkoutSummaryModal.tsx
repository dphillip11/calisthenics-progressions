import React, { useState } from 'react';
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
  Dumbbell,
  Play,
  X,
  Flame,
  Activity,
  Layers,
  Clock,
  RotateCw,
  CheckCircle2,
  ChevronRight,
  Shield,
  Zap
} from 'lucide-react';

interface WorkoutSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  preset: WorkoutPreset;
  sessionConfig: WorkoutSessionConfig;
  trees: SkillTree[];
  pbRecords: Record<string, PBRecord>;
  allExercises: Record<string, ProgressionExercise>;
  onSelectPreset: (preset: WorkoutPreset) => void;
  onChangeExerciseLevel: (slot: 'A1' | 'B1' | 'A2' | 'B2', exercise: ProgressionExercise) => void;
  onStartWorkout: () => void;
}

export const WorkoutSummaryModal: React.FC<WorkoutSummaryModalProps> = ({
  isOpen,
  onClose,
  preset,
  sessionConfig,
  trees,
  pbRecords,
  allExercises,
  onSelectPreset,
  onChangeExerciseLevel,
  onStartWorkout
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'overview' | 'warmups' | 'stretches'>('overview');

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
      <div className="bg-[#181a20] rounded-xl border border-[#2b2f3a] p-3.5 sm:p-4 flex flex-col justify-between hover:border-[#3d4352] transition-colors">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 bg-[#121316] px-2 py-0.5 rounded border border-[#262933]">
              {label} · {tree?.shortName}
            </span>
            {isPassed && (
              <span className="text-[10px] font-mono text-[#D1FF00] bg-[#D1FF00]/10 px-1.5 py-0.5 rounded flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Mastered
              </span>
            )}
          </div>

          <h4 className="text-sm sm:text-base font-bold text-white font-display line-clamp-1">
            {exercise.title}
          </h4>
          <p className="text-xs text-zinc-400 mt-0.5 line-clamp-1">
            {exercise.subtitle}
          </p>
        </div>

        {/* Target & Level Stepper */}
        <div className="mt-3 pt-3 border-t border-[#262933] flex items-center justify-between text-xs font-mono">
          <div className="text-zinc-300">
            <span className="text-zinc-400 text-[10px] uppercase block">Target</span>
            <span className="font-bold text-[#D1FF00]">
              {exercise.metricType === 'seconds'
                ? `${exercise.passCriteria.targetHoldSeconds || 15}s Hold`
                : `${exercise.passCriteria.targetReps || 8} Reps`}
            </span>
          </div>

          {/* Level Switcher */}
          <div className="flex items-center gap-1.5 bg-[#121316] p-1 rounded-lg border border-[#262933]">
            <button
              onClick={() => {
                if (currentIndex > 0) {
                  onChangeExerciseLevel(slotKey, treeExList[currentIndex - 1]);
                }
              }}
              disabled={currentIndex <= 0}
              className="w-6 h-6 rounded flex items-center justify-center text-zinc-400 hover:text-white hover:bg-[#20232a] disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer"
              title="Regression / Lower Level"
            >
              ←
            </button>
            <span className="text-[11px] font-bold text-zinc-200 px-1">
              Lvl {exercise.level}
            </span>
            <button
              onClick={() => {
                if (currentIndex < treeExList.length - 1) {
                  onChangeExerciseLevel(slotKey, treeExList[currentIndex + 1]);
                }
              }}
              disabled={currentIndex >= treeExList.length - 1}
              className="w-6 h-6 rounded flex items-center justify-center text-zinc-400 hover:text-white hover:bg-[#20232a] disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer"
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
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#121316] border border-[#2d313d] rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl shadow-black/80 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="px-5 sm:px-6 py-4 border-b border-[#252833] flex items-center justify-between bg-[#15171c] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D1FF00] flex items-center justify-center text-black shadow-md shadow-[#D1FF00]/15 shrink-0">
              <Dumbbell className="w-5 h-5 stroke-[2.3]" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white font-display tracking-tight mt-0.5">
                {preset.name}: {preset.subtitle}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#20232b] hover:bg-[#2c303d] text-zinc-400 hover:text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Preset Selector Ribbon */}
        <div className="px-5 sm:px-6 py-2.5 bg-[#0f1013] border-b border-[#20222a] flex items-center justify-between gap-2 overflow-x-auto no-scrollbar shrink-0">
          <div className="flex items-center gap-1.5">
            {WORKOUT_PRESETS.map((p, idx) => {
              const isSelected = p.id === preset.id;
              return (
                <button
                  key={p.id}
                  onClick={() => onSelectPreset(p)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition cursor-pointer shrink-0 ${
                    isSelected
                      ? 'bg-[#D1FF00] text-black shadow-sm'
                      : 'bg-[#181a20] hover:bg-[#242731] text-zinc-400 hover:text-white border border-[#2b2f3a]'
                  }`}
                >
                  Workout {String.fromCharCode(65 + idx)}
                </button>
              );
            })}
          </div>

          <div className="text-[11px] font-mono text-zinc-400 shrink-0 hidden sm:flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-[#D1FF00]" />
            <span>~35–40 Mins Total</span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="px-5 sm:px-6 pt-3 pb-1 border-b border-[#20222a] flex items-center gap-4 bg-[#121316] shrink-0 text-xs font-mono">
          <button
            onClick={() => setActiveTab('warmups')}
            className={`pb-2 font-bold transition border-b-2 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'warmups'
                ? 'border-[#D1FF00] text-[#D1FF00]'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            Warmup ({warmups.length})
          </button>
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-2 font-bold transition border-b-2 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'overview'
                ? 'border-[#D1FF00] text-[#D1FF00]'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Dumbbell className="w-3.5 h-3.5" />
            Supersets
          </button>
          <button
            onClick={() => setActiveTab('stretches')}
            className={`pb-2 font-bold transition border-b-2 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'stretches'
                ? 'border-[#D1FF00] text-[#D1FF00]'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            Stretches ({stretches.length})
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {activeTab === 'overview' && (
            <div className="space-y-5">
              {/* Focus Banner */}
              <div className="bg-[#181a20]/70 border border-[#2b2f3a] rounded-xl p-3.5 text-xs text-zinc-300 flex items-start gap-2.5">
                <Zap className="w-4 h-4 text-[#D1FF00] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block mb-0.5">{preset.focus}</span>
                  <p className="text-zinc-400 leading-relaxed">{preset.description}</p>
                </div>
              </div>

              {/* SUPERSET 1 BLOCK */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#D1FF00] text-black font-mono font-black text-xs flex items-center justify-center">
                      1
                    </span>
                    <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                      Superset 1 · 3 Rounds
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {renderExerciseSlot(preset.superset1.labelA, 'A1', treeA1, sessionConfig.exerciseA1)}
                  {renderExerciseSlot(preset.superset1.labelB, 'B1', treeB1, sessionConfig.exerciseB1)}
                </div>
              </div>

              {/* INTER-SUPERSET REST INDICATOR */}
              <div className="flex items-center justify-center gap-2 py-1">
                <div className="h-px bg-[#262933] flex-1" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 bg-[#181a20] px-3 py-1 rounded-full border border-[#262933]">
                  120s Block Rest Between Supersets
                </span>
                <div className="h-px bg-[#262933] flex-1" />
              </div>

              {/* SUPERSET 2 BLOCK */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#2a2e3a] text-zinc-200 font-mono font-black text-xs flex items-center justify-center border border-[#3f4557]">
                      2
                    </span>
                    <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                      Superset 2 · 3 Rounds
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {renderExerciseSlot(preset.superset2.labelA, 'A2', treeA2, sessionConfig.exerciseA2)}
                  {renderExerciseSlot(preset.superset2.labelB, 'B2', treeB2, sessionConfig.exerciseB2)}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'warmups' && (
            <div className="space-y-3">
              <p className="text-xs text-zinc-400 leading-relaxed">
                These targeted joint prep and pulse movements are auto-timed with 5-second countdowns to prepare your wrists, shoulders, and core for heavy calisthenics loading:
              </p>

              <div className="space-y-2">
                {warmups.map((w, idx) => (
                  <div
                    key={w!.id}
                    className="p-3 bg-[#181a20] border border-[#2b2f3a] rounded-xl flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-[#242732] flex items-center justify-center text-[#D1FF00] font-mono font-bold text-xs shrink-0">
                        {idx + 1}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-zinc-100">{w!.name}</h4>
                        <p className="text-xs text-zinc-400">{w!.purpose}</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#D1FF00] bg-[#121316] px-2.5 py-1 rounded border border-[#262933] shrink-0">
                      {w!.target}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'stretches' && (
            <div className="space-y-3">
              <p className="text-xs text-zinc-400 leading-relaxed">
                Decompress the spine, open tight lats and chest, and reset your nervous system after completing all 6 superset rounds:
              </p>

              <div className="space-y-2">
                {stretches.map((s, idx) => (
                  <div
                    key={s!.id}
                    className="p-3 bg-[#181a20] border border-[#2b2f3a] rounded-xl flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-[#242732] flex items-center justify-center text-[#D1FF00] font-mono font-bold text-xs shrink-0">
                        {idx + 1}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-zinc-100">{s!.name}</h4>
                        <p className="text-xs text-zinc-400">{s!.purpose}</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#D1FF00] bg-[#121316] px-2.5 py-1 rounded border border-[#262933] shrink-0">
                      {s!.target}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Actions Footer */}
        <div className="p-4 sm:p-5 border-t border-[#252833] bg-[#15171c] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5 w-full sm:w-auto ms-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#20232b] hover:bg-[#2a2e3b] text-zinc-300 font-mono font-bold text-xs transition cursor-pointer"
            >
              Cancel
            </button>

            <button
              id="begin-workout-btn"
              onClick={onStartWorkout}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-[#D1FF00] hover:bg-[#b8e600] text-black font-mono font-black text-xs uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-[#D1FF00]/20 active:scale-95"
            >
              <Play className="w-4 h-4 fill-black stroke-[2.2]" />
              <span>Begin</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
