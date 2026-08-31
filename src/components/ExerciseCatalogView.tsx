import React, { useState } from 'react';
import { ProgressionExercise, PBRecord, WorkoutLogEntry, SkillTree } from '../types';
import { BiomechanicalIllustration } from './BiomechanicalIllustration';
import {
  Award,
  CheckCircle2,
  Flame,
  Target,
  Dumbbell,
  TrendingUp,
  Clock,
  Filter,
  Layers,
  ExternalLink
} from 'lucide-react';

interface ExerciseCatalogViewProps {
  exercises: ProgressionExercise[];
  trees: SkillTree[];
  pbRecords: Record<string, PBRecord>;
  logs: WorkoutLogEntry[];
  onSelectExercise: (exercise: ProgressionExercise) => void;
  onOpenLogModal: (exercise: ProgressionExercise) => void;
}

export const ExerciseCatalogView: React.FC<ExerciseCatalogViewProps> = ({
  exercises,
  trees,
  pbRecords,
  logs,
  onSelectExercise,
  onOpenLogModal
}) => {
  const [statusFilter, setStatusFilter] = useState<'all' | 'mastered' | 'training' | 'ready'>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');

  const treeMap = new Map<string, SkillTree>(trees.map(t => [t.id, t]));

  const filteredExercises = exercises.filter(ex => {
    const pb = pbRecords[ex.id];
    const isSeconds = ex.metricType === 'seconds';
    const target = isSeconds
      ? ex.passCriteria.targetHoldSeconds || 0
      : ex.passCriteria.targetReps || 0;

    const currentBest = pb ? pb.bestValue : 0;
    const isPassed = pb?.isPassed || (currentBest >= target && target > 0);

    // Filter by status
    if (statusFilter === 'mastered' && !isPassed) return false;
    if (statusFilter === 'training' && (isPassed || currentBest === 0)) return false;
    if (statusFilter === 'ready' && (isPassed || currentBest > 0)) return false;

    // Filter by difficulty
    if (difficultyFilter !== 'all' && ex.difficulty !== difficultyFilter) return false;

    return true;
  });

  const difficultyColors: Record<string, string> = {
    Beginner: 'bg-zinc-800 text-zinc-300 border-zinc-700',
    Intermediate: 'bg-zinc-800 text-zinc-200 border-zinc-600',
    Advanced: 'bg-zinc-800 text-white border-zinc-500',
    Elite: 'bg-[#D1FF00]/15 text-[#D1FF00] border-[#D1FF00]/40'
  };

  return (
    <div className="space-y-5">
      {/* Filters Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 bg-[#141414] border border-[#222222] rounded-lg p-3.5 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider">
          <Filter className="w-3.5 h-3.5 text-[#D1FF00]" />
          <span>Exercise Filter</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Status filter buttons */}
          <div className="flex items-center bg-[#0A0A0A] p-1 rounded-md border border-[#222222] text-xs font-mono">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1 rounded font-medium transition cursor-pointer ${
                statusFilter === 'all'
                  ? 'bg-[#D1FF00] text-black font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              All ({exercises.length})
            </button>
            <button
              onClick={() => setStatusFilter('mastered')}
              className={`px-3 py-1 rounded font-medium transition cursor-pointer ${
                statusFilter === 'mastered'
                  ? 'bg-[#D1FF00] text-black font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Mastered
            </button>
            <button
              onClick={() => setStatusFilter('training')}
              className={`px-3 py-1 rounded font-medium transition cursor-pointer ${
                statusFilter === 'training'
                  ? 'bg-[#D1FF00] text-black font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              In Training
            </button>
          </div>

          {/* Difficulty filter dropdown */}
          <select
            value={difficultyFilter}
            onChange={e => setDifficultyFilter(e.target.value)}
            className="bg-[#0A0A0A] border border-[#222222] rounded-md px-3 py-1.5 text-xs text-zinc-300 font-mono focus:border-[#D1FF00] outline-none cursor-pointer"
          >
            <option value="all">All Difficulties</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Elite">Elite</option>
          </select>
        </div>
      </div>

      {/* Grid of Movement Cards */}
      {filteredExercises.length === 0 ? (
        <div className="p-12 text-center bg-[#141414] border border-[#222222] rounded-lg text-zinc-400 font-mono space-y-2">
          <Target className="w-8 h-8 mx-auto text-zinc-600 mb-2" />
          <p className="font-bold text-zinc-200">No exercises match the selected filters</p>
          <p className="text-xs text-zinc-500">Try adjusting your category or difficulty filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredExercises.map(exercise => {
            const pb = pbRecords[exercise.id];
            const isSeconds = exercise.metricType === 'seconds';
            const target = isSeconds
              ? exercise.passCriteria.targetHoldSeconds || 0
              : exercise.passCriteria.targetReps || 0;

            const currentBest = pb ? pb.bestValue : 0;
            const isPassed = pb?.isPassed || (currentBest >= target && target > 0);
            const parentTree = treeMap.get(exercise.skillTreeId);

            return (
              <div
                key={exercise.id}
                className="bg-[#20232a] border border-[#333742] hover:border-[#4b5263] rounded-lg p-4 transition-all duration-150 shadow-md flex flex-col justify-between space-y-3.5 group"
              >
                <div className="space-y-2.5">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold border uppercase tracking-wider bg-[#2c303a] text-zinc-200 border-[#3f4554]`}>
                        Lvl {exercise.level} · {exercise.difficulty}
                      </span>
                      {exercise.videoDemoUrl && (
                        <a
                          href={exercise.videoDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-rose-500/15 border border-rose-500/40 text-rose-400 hover:text-white hover:bg-rose-500/30 transition"
                          title="Watch video demonstration on YouTube"
                        >
                          <span>Video</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>

                    {isPassed ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-950/70 text-emerald-300 border border-emerald-500/50">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Mastered
                      </span>
                    ) : currentBest > 0 ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-amber-950/70 text-amber-300 border border-amber-500/50">
                        <Flame className="w-3 h-3 text-amber-400" /> In Training
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-[#282c35] text-zinc-300 border border-[#393e4d]">
                        Ready
                      </span>
                    )}
                  </div>

                  {/* Title & Tree subtitle */}
                  <div>
                    <h3
                      onClick={() => onSelectExercise(exercise)}
                      className="text-base font-bold text-white group-hover:text-[#D1FF00] transition cursor-pointer font-display tracking-tight line-clamp-1"
                    >
                      {exercise.title}
                    </h3>
                    <p className="text-[11px] font-mono text-zinc-400 line-clamp-1 mt-0.5">
                      {parentTree?.shortName || exercise.category} · {exercise.equipment.join(', ')}
                    </p>
                  </div>

                  {/* Biomechanical Vector Illustration */}
                  <div
                    onClick={() => onSelectExercise(exercise)}
                    className="w-full h-32 rounded-lg overflow-hidden cursor-pointer border border-[#333742] hover:border-[#4f5566] bg-[#121316] transition shadow-inner"
                  >
                    <BiomechanicalIllustration
                      type={exercise.illustrationType}
                      className="w-full h-full p-2"
                      accentColor="#D1FF00"
                    />
                  </div>

                  {/* Pass Standard Box */}
                  <div className="bg-[#16181d] border border-[#2d313b] rounded-md p-2.5 space-y-1 shadow-xs">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-zinc-300 flex items-center gap-1 text-[11px]">
                        <Award className="w-3 h-3 text-[#D1FF00]" />
                        Target Standard
                      </span>
                      <span className="font-mono font-bold text-[#D1FF00]">
                        {exercise.passCriteria.targetSets} × {target} {isSeconds ? 's' : 'reps'}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-300 line-clamp-1 italic font-sans">
                      "{exercise.passCriteria.formStandard}"
                    </p>
                  </div>
                </div>

                {/* Bottom Bar: PB Stat & Action Buttons */}
                <div className="pt-2.5 border-t border-[#333742] flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">
                      PB RECORD
                    </span>
                    <span className="text-base font-black font-mono text-[#D1FF00]">
                      {currentBest} {isSeconds ? 's' : 'reps'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onSelectExercise(exercise)}
                      className="p-1.5 rounded-md bg-[#2c303a] hover:bg-[#373c48] text-zinc-200 border border-[#3f4554] hover:border-[#525a6c] transition cursor-pointer shadow-xs"
                      title="View Full Details & Graph"
                    >
                      <TrendingUp className="w-3.5 h-3.5 text-[#D1FF00]" />
                    </button>
                    <button
                      onClick={() => onOpenLogModal(exercise)}
                      className="px-2.5 py-1.5 rounded-md bg-[#D1FF00] hover:bg-[#b8e600] text-black font-mono font-black text-xs uppercase tracking-wider transition flex items-center gap-1 shadow-xs active:scale-95 cursor-pointer border border-black/20"
                    >
                      <Dumbbell className="w-3.5 h-3.5" />
                      Log Set
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
