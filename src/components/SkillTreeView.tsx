import React from 'react';
import { SkillTree, ProgressionExercise, PBRecord, WorkoutLogEntry } from '../types';
import { BiomechanicalIllustration } from './BiomechanicalIllustration';
import {
  CheckCircle2,
  Lock,
  Flame,
  Award,
  ArrowRight,
  TrendingUp,
  Dumbbell,
  Target,
  ChevronRight,
  Sparkles,
  Clock,
  ExternalLink
} from 'lucide-react';

interface SkillTreeViewProps {
  tree: SkillTree;
  exercises: Record<string, ProgressionExercise>;
  pbRecords: Record<string, PBRecord>;
  logs: WorkoutLogEntry[];
  onSelectExercise: (exercise: ProgressionExercise) => void;
  onOpenLogModal: (exercise: ProgressionExercise) => void;
}

export const SkillTreeView: React.FC<SkillTreeViewProps> = ({
  tree,
  exercises,
  pbRecords,
  logs,
  onSelectExercise,
  onOpenLogModal
}) => {
  const treeExercises = tree.exercises.map(id => exercises[id]).filter(Boolean);

  // Compute masteries
  let passedCount = 0;
  const nodes = treeExercises.map((exercise, index) => {
    const pb = pbRecords[exercise.id];
    const isSeconds = exercise.metricType === 'seconds';
    const target = isSeconds
      ? exercise.passCriteria.targetHoldSeconds || 0
      : exercise.passCriteria.targetReps || 0;
    
    const currentBest = pb ? pb.bestValue : 0;
    const isPassed = pb?.isPassed || false;

    if (isPassed) passedCount++;

    // Determine status
    // Prerequisite check: either index === 0 or previous exercise was passed
    const prevPassed = index === 0 || treeExercises.slice(0, index).every(prev => {
      const prevPb = pbRecords[prev.id];
      return prevPb?.isPassed || false;
    });

    let status: 'mastered' | 'ready' | 'in-progress' | 'locked' = 'locked';
    if (isPassed) {
      status = 'mastered';
    } else if (currentBest > 0) {
      status = 'in-progress';
    } else if (prevPassed) {
      status = 'ready';
    } else {
      status = 'locked';
    }

    return {
      exercise,
      currentBest,
      target,
      isPassed,
      status,
      isSeconds
    };
  });

  const masteryPercent = Math.round((passedCount / treeExercises.length) * 100);

  return (
    <div className="space-y-6">
      {/* Branch Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-[#20232a] border border-[#333742] hover:border-[#4b5263] p-6 sm:p-7 shadow-md transition-all duration-200">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#D1FF00]">
              <Sparkles className="w-3.5 h-3.5 text-[#D1FF00]" />
              <span>Progression Pathway</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-display">
              {tree.name}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
              {tree.description}
            </p>
          </div>

          {/* Mastery Progress Card */}
          <div className="bg-[#14161b] border border-[#2b2f38] rounded-xl p-4 min-w-[240px] space-y-2.5 shrink-0 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider">Pathway Mastery</span>
              <span className="text-sm font-extrabold font-mono text-[#D1FF00]">
                {passedCount} / {treeExercises.length}
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-[#1c1f26] h-2 rounded-full overflow-hidden border border-[#2b2f38]">
              <div
                className="h-full bg-[#D1FF00] rounded-full transition-all duration-500"
                style={{ width: `${masteryPercent}%` }}
              />
            </div>

            <div className="text-[11px] font-mono text-zinc-400 text-right">
              {masteryPercent === 100 ? (
                <span className="text-[#D1FF00] font-bold">✓ 100% Mastery Achieved</span>
              ) : (
                `${100 - masteryPercent}% remaining to master`
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Progressive Step-by-Step Pathway */}
      <div className="space-y-3.5">
        {nodes.map((node, index) => {
          const { exercise, currentBest, target, isPassed, status, isSeconds } = node;

          const statusConfig = {
            mastered: {
              badge: 'Mastered',
              badgeColor: 'bg-emerald-950/70 text-emerald-300 border-emerald-500/50 font-mono font-bold',
              border: 'border-emerald-500/60 hover:border-emerald-400/90 ring-1 ring-emerald-500/20 shadow-md',
              cardBg: 'bg-[#20232a]',
              icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            },
            'in-progress': {
              badge: 'In Progress',
              badgeColor: 'bg-amber-950/70 text-amber-300 border-amber-500/50 font-mono font-bold',
              border: 'border-amber-400/60 hover:border-amber-400/90 ring-1 ring-amber-400/20 shadow-sm',
              cardBg: 'bg-[#20232a]',
              icon: <Flame className="w-4 h-4 text-amber-400" />
            },
            ready: {
              badge: 'Unlocked',
              badgeColor: 'bg-[#2b303a] text-zinc-200 border-[#3e4453] font-mono font-bold',
              border: 'border-[#333742] hover:border-[#4b5263] shadow-md',
              cardBg: 'bg-[#20232a]',
              icon: <Target className="w-4 h-4 text-zinc-300" />
            },
            locked: {
              badge: 'Locked',
              badgeColor: 'bg-[#181a1f] text-zinc-500 border-[#2a2d36] font-mono',
              border: 'border-[#2a2d36] opacity-65',
              cardBg: 'bg-[#181a1f]',
              icon: <Lock className="w-3.5 h-3.5 text-zinc-500" />
            }
          }[status];

          return (
            <div key={exercise.id} className="relative">
              {/* Connector line between steps */}
              {index < nodes.length - 1 && (
                <div className="absolute left-6 sm:left-8 top-14 bottom-0 w-[1px] bg-[#333742] z-0" />
              )}

              <div
                className={`relative z-10 ${statusConfig.cardBg} border ${statusConfig.border} rounded-2xl p-5 sm:p-6 transition-all duration-200 shadow-md flex flex-col lg:flex-row lg:items-center justify-between gap-5`}
              >
                {/* Left: Level node + Info */}
                <div className="flex items-start gap-3.5 sm:gap-4 flex-1 min-w-0">
                  {/* Step Level Badge Icon */}
                  <div
                    className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex flex-col items-center justify-center shrink-0 border ${
                      isPassed
                        ? 'bg-[#14161b] border-emerald-500/60 text-[#D1FF00]'
                        : status === 'in-progress'
                        ? 'bg-[#14161b] border-amber-500/60 text-amber-400'
                        : status === 'ready'
                        ? 'bg-[#14161b] border-[#2b2f38] text-zinc-200'
                        : 'bg-[#121317] border-[#272a33] text-zinc-500'
                    }`}
                  >
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-400">LVL</span>
                    <span className="text-sm sm:text-base font-black font-mono leading-none">
                      {exercise.level}
                    </span>
                  </div>

                  {/* Text Details */}
                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded text-[9px] font-bold border uppercase tracking-wider ${statusConfig.badgeColor}`}>
                        {statusConfig.badge}
                      </span>
                      <span className="text-xs font-mono font-semibold text-zinc-200">
                        {exercise.difficulty}
                      </span>
                      <span className="text-xs font-mono text-zinc-400 hidden sm:inline-block">
                        · {exercise.equipment.join(', ')}
                      </span>
                      {exercise.videoDemoUrl && (
                        <a
                          href={exercise.videoDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500/15 border border-rose-500/40 text-rose-400 hover:text-white hover:bg-rose-500/30 transition ml-auto sm:ml-0"
                          title="Watch video demo breakdown on YouTube"
                        >
                          <span>Video Demo</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>

                    <h3
                      onClick={() => onSelectExercise(exercise)}
                      className="text-base sm:text-lg font-bold text-white font-display tracking-tight hover:text-[#D1FF00] transition cursor-pointer flex items-center gap-1.5 truncate"
                    >
                      {exercise.title}
                      <ChevronRight className="w-4 h-4 text-zinc-400 opacity-75" />
                    </h3>

                    {/* Pass Criteria Summary */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-300 font-sans">
                      <div className="flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-[#D1FF00] shrink-0" />
                        <span>
                          Pass Target: <strong className="text-white font-mono font-bold">{exercise.passCriteria.targetSets} × {target} {isSeconds ? 's' : 'reps'}</strong>
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-zinc-400 font-mono text-[11px]">
                        <Clock className="w-3 h-3" />
                        <span>Rest: {exercise.passCriteria.restSeconds}s</span>
                      </div>
                    </div>

                    <p className="text-xs text-zinc-400 line-clamp-1 italic font-sans">
                      "{exercise.passCriteria.formStandard}"
                    </p>
                  </div>
                </div>

                {/* Center: Movement Thumbnail Vector Illustration */}
                <div
                  onClick={() => onSelectExercise(exercise)}
                  className="w-full lg:w-44 h-24 shrink-0 rounded-xl overflow-hidden cursor-pointer border border-[#333742] hover:border-[#4b5263] bg-[#14161b] transition shadow-inner"
                  title="Click to view biomechanical illustration and full form cues"
                >
                  <BiomechanicalIllustration
                    type={exercise.illustrationType}
                    className="w-full h-full p-2"
                    accentColor="#D1FF00"
                  />
                </div>

                {/* Right: Personal Best & Action Buttons */}
                <div className="flex sm:flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-3 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#333742]">
                  {/* Current PB box */}
                  <div className="text-left lg:text-right bg-[#14161b] border border-[#2b2f38] rounded-xl px-3.5 py-2 min-w-[110px] shadow-xs">
                    <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">
                      PB RECORD
                    </span>
                    <div className="text-lg sm:text-xl font-black text-[#D1FF00] font-mono flex items-baseline gap-1 justify-start lg:justify-end">
                      {currentBest}
                      <span className="text-xs font-semibold font-mono text-zinc-400">
                        / {target} {isSeconds ? 's' : 'reps'}
                      </span>
                    </div>
                  </div>

                  {/* Action Button Group */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onSelectExercise(exercise)}
                      className="px-3.5 py-2 rounded-xl bg-[#2b303a] hover:bg-[#383e4c] text-zinc-200 font-mono font-bold text-xs transition flex items-center gap-1.5 border border-[#3e4453] hover:border-[#525a6c] shadow-sm cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <TrendingUp className="w-3.5 h-3.5 text-[#D1FF00]" />
                      <span>Details</span>
                    </button>

                    <button
                      onClick={() => onOpenLogModal(exercise)}
                      className="px-3.5 py-2 rounded-xl bg-[#D1FF00] hover:bg-[#b8e600] text-black font-mono font-black text-xs uppercase tracking-wider transition flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer border border-black/20 whitespace-nowrap shrink-0"
                    >
                      <Dumbbell className="w-3.5 h-3.5" />
                      <span>Log</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
