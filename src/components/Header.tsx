import React, { useRef } from 'react';
import { SkillTree, SkillCategory } from '../types';
import {
  Flame,
  Search,
  Award,
  Layers,
  ListFilter,
  Download,
  Upload,
  Trash2,
  RotateCcw,
  Timer,
  CheckCircle2,
  Sparkles,
  BarChart3
} from 'lucide-react';

interface HeaderProps {
  trees: SkillTree[];
  selectedTreeId: string | null;
  activeCategory: SkillCategory | 'All';
  searchQuery: string;
  viewMode: 'trees' | 'catalog' | 'stats';
  isTimerOpen: boolean;
  onSelectTree: (treeId: string | null) => void;
  onSelectCategory: (category: SkillCategory | 'All') => void;
  onSearchChange: (query: string) => void;
  onViewModeChange: (mode: 'trees' | 'catalog' | 'stats') => void;
  onToggleTimer: () => void;
  onExportData: () => void;
  onImportData: (file: File) => void;
  onClearData: () => void;
  onResetData: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  trees,
  selectedTreeId,
  activeCategory,
  searchQuery,
  viewMode,
  isTimerOpen,
  onSelectTree,
  onSelectCategory,
  onSearchChange,
  onViewModeChange,
  onToggleTimer,
  onExportData,
  onImportData,
  onClearData,
  onResetData
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImportData(file);
    }
    // reset input value so re-importing the same file works
    if (e.target) {
      e.target.value = '';
    }
  };
  const categories: (SkillCategory | 'All')[] = [
    'All',
    'Pull',
    'Push',
    'Dip',
    'Handstand',
    'Static Hold',
    'Core',
    'Legs'
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0A0A0A]/95 border-b border-[#222222] backdrop-blur-xl">
      {/* Top Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3.5">
        {/* Brand Logo & Title */}
        <div className="flex items-center justify-between">
          <div
            onClick={() => {
              onSelectTree(null);
              onViewModeChange('trees');
            }}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-9 h-9 rounded-lg bg-[#D1FF00] flex items-center justify-center text-black shadow-md shadow-[#D1FF00]/15 group-hover:scale-105 transition-transform duration-200">
              <Flame className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black text-white tracking-wider font-display group-hover:text-[#D1FF00] transition-colors">
                  CALISTHENICS
                </h1>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-[#D1FF00]/15 text-[#D1FF00] border border-[#D1FF00]/40 uppercase font-mono tracking-widest">
                  PRO
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 font-mono tracking-tight">
                Skill Trees · Pass Criteria · PB Tracking
              </p>
            </div>
          </div>

          {/* Mobile Timer Toggle */}
          <button
            onClick={onToggleTimer}
            className="md:hidden p-2 rounded-lg bg-[#141414] border border-[#222222] text-[#D1FF00]"
          >
            <Timer className="w-4 h-4" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md relative">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="Search progressions, cues, targets, muscles..."
            className="w-full bg-[#141414] border border-[#222222] focus:border-[#D1FF00] rounded-lg pl-9 pr-4 py-2 text-xs sm:text-sm text-zinc-200 placeholder:text-zinc-500 outline-none transition font-sans"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-[#D1FF00] text-xs font-mono"
            >
              Clear
            </button>
          )}
        </div>

        {/* View Switches & Action Buttons */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          {/* View Mode Nav */}
          <div className="flex items-center bg-[#141414] p-1 rounded-lg border border-[#222222] text-xs font-mono">
            <button
              id="nav-trees-btn"
              onClick={() => onViewModeChange('trees')}
              className={`px-3 py-1.5 rounded-md font-bold transition cursor-pointer flex items-center gap-1.5 tracking-tight ${
                viewMode === 'trees'
                  ? 'bg-[#D1FF00] text-black shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Trees
            </button>
            <button
              id="nav-catalog-btn"
              onClick={() => onViewModeChange('catalog')}
              className={`px-3 py-1.5 rounded-md font-bold transition cursor-pointer flex items-center gap-1.5 tracking-tight ${
                viewMode === 'catalog'
                  ? 'bg-[#D1FF00] text-black shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <ListFilter className="w-3.5 h-3.5" />
              Catalog
            </button>
            <button
              id="nav-stats-btn"
              onClick={() => onViewModeChange('stats')}
              className={`px-3 py-1.5 rounded-md font-bold transition cursor-pointer flex items-center gap-1.5 tracking-tight ${
                viewMode === 'stats'
                  ? 'bg-[#D1FF00] text-black shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              Analytics
            </button>
          </div>

          {/* Rest Timer Button */}
          <button
            onClick={onToggleTimer}
            className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold font-mono uppercase tracking-wider transition cursor-pointer ${
              isTimerOpen
                ? 'bg-[#D1FF00] text-black border-[#D1FF00] shadow-sm shadow-[#D1FF00]/20'
                : 'bg-[#141414] hover:bg-[#1c1c1c] text-zinc-300 border-[#222222]'
            }`}
            title="Toggle Rest Timer & Stopwatch"
          >
            <Timer className="w-3.5 h-3.5" />
            <span>Chrono</span>
          </button>

          {/* Data Backup & Management Actions */}
          <div className="flex items-center gap-1 bg-[#141414] p-1 rounded-lg border border-[#222222]">
            {/* Hidden JSON File Input */}
            <input
              type="file"
              ref={fileInputRef}
              accept=".json,application/json"
              onChange={handleFileChange}
              className="hidden"
            />

            <button
              id="import-data-btn"
              onClick={() => fileInputRef.current?.click()}
              className="p-1.5 sm:px-2.5 sm:py-1 rounded-md text-zinc-400 hover:text-[#D1FF00] hover:bg-[#1f1f1f] transition cursor-pointer flex items-center gap-1.5 text-xs font-mono"
              title="Import Data from JSON backup file"
            >
              <Upload className="w-3.5 h-3.5" />
              <span className="hidden lg:inline font-bold">Import</span>
            </button>

            <button
              id="export-data-btn"
              onClick={onExportData}
              className="p-1.5 sm:px-2.5 sm:py-1 rounded-md text-zinc-400 hover:text-[#D1FF00] hover:bg-[#1f1f1f] transition cursor-pointer flex items-center gap-1.5 text-xs font-mono"
              title="Export Workout & PB Data (JSON Backup)"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden lg:inline font-bold">Export</span>
            </button>

            <button
              id="clear-data-btn"
              onClick={onClearData}
              className="p-1.5 sm:px-2.5 sm:py-1 rounded-md text-zinc-400 hover:text-rose-400 hover:bg-[#1f1f1f] transition cursor-pointer flex items-center gap-1.5 text-xs font-mono"
              title="Clear all stored logs, PBs, and custom data"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden lg:inline font-bold">Clear</span>
            </button>

            <button
              id="reset-data-btn"
              onClick={onResetData}
              className="p-1.5 sm:px-2.5 sm:py-1 rounded-md text-zinc-400 hover:text-amber-300 hover:bg-[#1f1f1f] transition cursor-pointer flex items-center gap-1.5 text-xs font-mono"
              title="Reset to default sample progression data"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden lg:inline font-bold">Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter Pills & Tree Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 border-t border-[#222222] flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 shrink-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-3 py-1 rounded-md text-xs font-mono uppercase tracking-wider transition cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#D1FF00] text-black font-extrabold border border-[#D1FF00] shadow-sm'
                  : 'bg-[#141414] text-zinc-400 border border-[#222222] hover:border-zinc-700 hover:text-zinc-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tree Selector Quick Filter */}
        {selectedTreeId && (
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[11px] font-mono text-zinc-500 uppercase">Tree:</span>
            <button
              onClick={() => onSelectTree(null)}
              className="px-2.5 py-0.5 rounded-md bg-[#141414] hover:bg-[#1c1c1c] text-[#D1FF00] text-xs font-mono font-bold border border-[#222222] hover:border-[#D1FF00]/40 flex items-center gap-1.5 transition"
            >
              <span>{trees.find(t => t.id === selectedTreeId)?.shortName || 'Skill Tree'}</span>
              <span className="text-zinc-500 hover:text-[#D1FF00]">✕</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
