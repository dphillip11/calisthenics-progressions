import React from 'react';
import { SkillTree } from '../types';
import {
  Trees,
  Layers,
  Flame,
  Activity,
  BarChart3,
  Database,
  Timer
} from 'lucide-react';

interface HeaderProps {
  trees: SkillTree[];
  selectedTreeId: string | null;
  viewMode: 'warmup' | 'trees' | 'stretches' | 'stats';
  isTimerOpen: boolean;
  onSelectTree: (treeId: string | null) => void;
  onViewModeChange: (mode: 'warmup' | 'trees' | 'stretches' | 'stats') => void;
  onToggleTimer: () => void;
  onOpenDataModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  viewMode,
  isTimerOpen,
  onViewModeChange,
  onToggleTimer,
  onOpenDataModal
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0A0A0A]/95 border-b border-[#222222] backdrop-blur-xl">
      {/* Top Bar: Heading Brand on Left, Data & Chrono Icons on Right */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3.5 pb-2.5 flex items-center justify-between gap-4">
        {/* Thematic Brand Logo & Title */}
        <div
          onClick={() => {
            onViewModeChange('trees');
          }}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-9 h-9 rounded-xl bg-[#D1FF00] flex items-center justify-center text-black shadow-md shadow-[#D1FF00]/15 group-hover:scale-105 transition-transform duration-200 shrink-0">
            <Trees className="w-5 h-5 stroke-[2.2]" />
          </div>
          <h1 className="text-lg sm:text-xl font-black text-white tracking-wider font-display group-hover:text-[#D1FF00] transition-colors leading-none">
            CALISTHENICS
          </h1>
        </div>

        {/* Action Buttons: Database & Chrono Timer */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Database Icon Button */}
          <button
            id="open-data-modal-btn"
            onClick={onOpenDataModal}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-[#141414] hover:bg-[#1f1f1f] text-zinc-300 hover:text-[#D1FF00] border border-[#222222] hover:border-[#D1FF00]/40 transition cursor-pointer flex items-center gap-1.5 text-xs font-mono font-bold shadow-sm"
            title="Data & Storage Management (Import, Export, Clear, Reset)"
          >
            <Database className="w-4 h-4 text-[#D1FF00]" />
            <span className="hidden sm:inline">Data</span>
          </button>

          {/* Rest Timer / Chrono Button */}
          <button
            id="toggle-timer-btn"
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
        </div>
      </div>

      {/* Sub-bar directly under heading: Warmup, Trees, Stretches, Analytics */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-3 pt-0.5 flex items-center overflow-x-auto no-scrollbar">
        <div className="inline-flex items-center bg-[#141414] p-1 rounded-xl border border-[#222222] text-xs font-mono">
          <button
            id="nav-warmup-btn"
            onClick={() => onViewModeChange('warmup')}
            className={`px-3 sm:px-4 py-1.5 rounded-lg font-bold transition cursor-pointer flex items-center gap-1.5 sm:gap-2 tracking-tight ${
              viewMode === 'warmup'
                ? 'bg-[#D1FF00] text-black shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Warmup</span>
          </button>

          <button
            id="nav-trees-btn"
            onClick={() => onViewModeChange('trees')}
            className={`px-3 sm:px-4 py-1.5 rounded-lg font-bold transition cursor-pointer flex items-center gap-1.5 sm:gap-2 tracking-tight ${
              viewMode === 'trees'
                ? 'bg-[#D1FF00] text-black shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Trees</span>
          </button>

          <button
            id="nav-stretches-btn"
            onClick={() => onViewModeChange('stretches')}
            className={`px-3 sm:px-4 py-1.5 rounded-lg font-bold transition cursor-pointer flex items-center gap-1.5 sm:gap-2 tracking-tight ${
              viewMode === 'stretches'
                ? 'bg-[#D1FF00] text-black shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Stretches</span>
          </button>

          <button
            id="nav-stats-btn"
            onClick={() => onViewModeChange('stats')}
            className={`px-3 sm:px-4 py-1.5 rounded-lg font-bold transition cursor-pointer flex items-center gap-1.5 sm:gap-2 tracking-tight ${
              viewMode === 'stats'
                ? 'bg-[#D1FF00] text-black shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Analytics</span>
          </button>
        </div>
      </div>
    </header>
  );
};

