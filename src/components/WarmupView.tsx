import React, { useState } from 'react';
import { WarmupExercise } from '../types';
import { BiomechanicalIllustration } from './BiomechanicalIllustration';
import {
  Flame,
  CheckCircle2,
  Circle,
  Timer,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Video,
  ExternalLink,
  Eye
} from 'lucide-react';

interface WarmupViewProps {
  exercises: WarmupExercise[];
  onOpenTimer: () => void;
}

export const WarmupView: React.FC<WarmupViewProps> = ({
  exercises,
  onOpenTimer
}) => {
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [showDiagrams, setShowDiagrams] = useState<boolean>(true);

  const categories = [
    { id: 'all', label: 'All Exercises' },
    { id: 'cardio_pulse', label: 'Pulse & Heat' },
    { id: 'joint_prep', label: 'Wrists & Forearms' },
    { id: 'scapular_shoulders', label: 'Shoulders & Scapula' },
    { id: 'spine_core', label: 'Spine & Core' },
    { id: 'hips_lower', label: 'Hips & Lower Body' }
  ];

  const filteredExercises = filterCategory === 'all'
    ? exercises
    : exercises.filter(ex => ex.category === filterCategory);

  const toggleComplete = (id: string) => {
    setCompletedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleResetChecklist = () => {
    setCompletedIds([]);
  };

  const completedCount = exercises.filter(e => completedIds.includes(e.id)).length;
  const progressPercent = Math.round((completedCount / exercises.length) * 100);

  return (
    <div className="space-y-6">
      {/* Top Banner / Summary Header */}
      <div className="bg-[#121212] border border-[#222222] rounded-2xl p-4 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#D1FF00]/15 border border-[#D1FF00]/30 text-[#D1FF00] flex items-center justify-center">
              <Flame className="w-4 h-4" />
            </div>
            <h2 className="text-base sm:text-lg font-bold font-display text-white tracking-wide">
              Calisthenics Warmup &amp; Joint Prep
            </h2>
          </div>
          <p className="text-xs text-zinc-400 font-sans leading-relaxed max-w-2xl">
            A recommended sequence of joint lubrication, tendon conditioning, and kinetic activation. Pick and choose based on your training session—no rigid order required.
          </p>
        </div>

        {/* Quick Progress & Actions */}
        <div className="flex items-center gap-3 self-stretch md:self-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-[#1f1f1f]">
          <div className="text-left md:text-right">
            <div className="text-xs font-mono font-bold text-white flex items-center gap-1.5 md:justify-end">
              <span className="text-[#D1FF00]">{completedCount}</span> / {exercises.length} Prepped
              {progressPercent === 100 && (
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#D1FF00]/20 text-[#D1FF00] font-mono">
                  Ready!
                </span>
              )}
            </div>
            <div className="w-28 sm:w-36 h-1.5 bg-[#222222] rounded-full overflow-hidden mt-1.5">
              <div
                className="h-full bg-[#D1FF00] rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              id="toggle-warmup-diagrams-btn"
              onClick={() => setShowDiagrams(!showDiagrams)}
              className={`p-2 rounded-lg border text-xs font-mono transition cursor-pointer ${
                showDiagrams
                  ? 'bg-[#1a1a1a] text-[#D1FF00] border-[#333333]'
                  : 'bg-[#141414] text-zinc-400 border-[#262626] hover:text-white'
              }`}
              title="Toggle schematic diagrams"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
            {completedCount > 0 && (
              <button
                id="reset-warmup-checks-btn"
                onClick={handleResetChecklist}
                className="p-2 rounded-lg bg-[#181818] hover:bg-[#222222] text-zinc-400 hover:text-white border border-[#262626] transition text-xs font-mono"
                title="Reset checklist"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              id="warmup-timer-shortcut-btn"
              onClick={onOpenTimer}
              className="px-3 py-1.5 rounded-lg bg-[#181818] hover:bg-[#242424] text-zinc-200 hover:text-[#D1FF00] border border-[#262626] transition text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="Open stopwatch / interval timer"
            >
              <Timer className="w-3.5 h-3.5 text-[#D1FF00]" />
              <span className="hidden sm:inline">Timer</span>
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map(cat => {
          const isActive = filterCategory === cat.id;
          const count = cat.id === 'all'
            ? exercises.length
            : exercises.filter(e => e.category === cat.id).length;

          return (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 border ${
                isActive
                  ? 'bg-[#D1FF00] text-black border-[#D1FF00] shadow-sm'
                  : 'bg-[#121212] hover:bg-[#181818] text-zinc-400 hover:text-zinc-200 border-[#222222]'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1 rounded ${
                isActive ? 'bg-black/20 text-black font-extrabold' : 'bg-[#1e1e1e] text-zinc-500'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Warmup List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filteredExercises.map((exercise, index) => {
          const isDone = completedIds.includes(exercise.id);
          const isExpanded = expandedId === exercise.id;

          return (
            <div
              key={exercise.id}
              id={`warmup-item-${exercise.id}`}
              className={`rounded-xl border transition-all duration-200 overflow-hidden flex flex-col justify-between ${
                isDone
                  ? 'bg-[#101010]/80 border-emerald-500/25'
                  : 'bg-[#121212] border-[#222222] hover:border-zinc-700'
              }`}
            >
              <div>
                {/* Main Card Bar */}
                <div className="p-3.5 sm:p-4 flex items-start justify-between gap-3">
                  {/* Left Checkbox & Info */}
                  <div className="flex items-start gap-3 min-w-0">
                    <button
                      onClick={() => toggleComplete(exercise.id)}
                      className="shrink-0 pt-0.5 text-zinc-500 hover:text-[#D1FF00] transition cursor-pointer"
                      title={isDone ? 'Mark as incomplete' : 'Mark as done'}
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />
                      ) : (
                        <Circle className="w-5 h-5 text-zinc-600 hover:text-zinc-400" />
                      )}
                    </button>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-mono text-zinc-500 font-bold">
                          #{index + 1}
                        </span>
                        <h3 className={`text-sm font-bold font-sans tracking-tight transition ${
                          isDone ? 'text-zinc-400 line-through' : 'text-white'
                        }`}>
                          {exercise.name}
                        </h3>
                      </div>

                      <div className="mt-1 flex items-center gap-2 flex-wrap text-xs text-zinc-400 font-mono">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#1a1a1a] text-zinc-300 border border-[#2b2b2b]">
                          {exercise.categoryLabel}
                        </span>
                        <span className="text-[#D1FF00] font-semibold text-[11px]">
                          Target: {exercise.target}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions (Video demo & Expand) */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    {exercise.demoVideoUrl && (
                      <a
                        href={exercise.demoVideoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg bg-[#181818] hover:bg-[#222222] text-[#D1FF00] border border-[#2b2b2b] text-[11px] font-mono flex items-center gap-1 transition"
                        title="Watch video demo tutorial"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Demo</span>
                        <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                      </a>
                    )}
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : exercise.id)}
                      className="p-1.5 rounded-lg bg-[#181818] hover:bg-[#222222] text-zinc-400 hover:text-white border border-[#282828] text-xs font-mono transition cursor-pointer"
                      title="Toggle form cues"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Inline Illustration if enabled */}
                {showDiagrams && exercise.illustrationType && (
                  <div className="px-3.5 pb-2">
                    <BiomechanicalIllustration
                      type={exercise.illustrationType}
                      className="w-full h-32"
                      accentColor="#D1FF00"
                    />
                  </div>
                )}
              </div>

              {/* Expandable Form Cues & Purpose */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-2 border-t border-[#1a1a1a] bg-[#0d0d0d] space-y-2.5 text-xs animate-in fade-in duration-150">
                  <div className="p-2.5 rounded-lg bg-[#141414] border border-[#202020] text-zinc-300 font-sans leading-relaxed">
                    <span className="font-bold text-zinc-400 font-mono uppercase text-[10px] tracking-wider block mb-1">
                      Biomechanical Purpose
                    </span>
                    {exercise.purpose}
                  </div>

                  <div>
                    <span className="font-bold text-zinc-400 font-mono uppercase text-[10px] tracking-wider block mb-1">
                      Key Movement Cues
                    </span>
                    <ul className="space-y-1 font-sans text-zinc-300">
                      {exercise.cues.map((cue, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-[#D1FF00] font-mono text-[11px]">&rsaquo;</span>
                          <span>{cue}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-[#181818] text-[11px] font-mono text-zinc-500">
                    <div>
                      Focus: <span className="text-zinc-400">{exercise.focusArea.join(', ')}</span>
                    </div>
                    {exercise.demoVideoUrl && (
                      <a
                        href={exercise.demoVideoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#D1FF00] hover:underline flex items-center gap-1"
                      >
                        <span>Watch Demo Video</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
