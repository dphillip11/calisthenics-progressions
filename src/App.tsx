import React, { useState, useEffect } from 'react';
import {
  SkillTree,
  ProgressionExercise,
  WorkoutLogEntry,
  PBRecord,
  SkillCategory
} from './types';
import { SKILL_TREES, EXERCISES } from './data/calisthenicsData';
import {
  loadStoredLogs,
  saveStoredLogs,
  loadStoredPBs,
  saveStoredPBs,
  loadFavorites,
  saveFavorites,
  exportUserData,
  resetAllDataToDefault,
  evaluateWorkoutEntry
} from './utils/storage';
import { Header } from './components/Header';
import { SkillTreeView } from './components/SkillTreeView';
import { ExerciseCatalogView } from './components/ExerciseCatalogView';
import { MasteryStats } from './components/MasteryStats';
import { ExerciseDetailModal } from './components/ExerciseDetailModal';
import { LogWorkoutModal } from './components/LogWorkoutModal';
import { RestTimer } from './components/RestTimer';
import {
  Award,
  Layers,
  Sparkles,
  Flame,
  ChevronRight,
  TrendingUp,
  Target,
  Dumbbell
} from 'lucide-react';

export default function App() {
  // State initialization
  const [logs, setLogs] = useState<WorkoutLogEntry[]>([]);
  const [pbRecords, setPbRecords] = useState<Record<string, PBRecord>>({});
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedTreeId, setSelectedTreeId] = useState<string | null>('pull-up-muscle-up');
  const [selectedExercise, setSelectedExercise] = useState<ProgressionExercise | null>(null);
  const [loggingExercise, setLoggingExercise] = useState<ProgressionExercise | null>(null);
  const [activeCategory, setActiveCategory] = useState<SkillCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'trees' | 'catalog' | 'stats'>('trees');
  const [isTimerOpen, setIsTimerOpen] = useState<boolean>(false);

  // Load from local storage on mount
  useEffect(() => {
    const loadedLogs = loadStoredLogs();
    const loadedPBs = loadStoredPBs();
    const loadedFavs = loadFavorites();

    setLogs(loadedLogs);
    setPbRecords(loadedPBs);
    setFavorites(loadedFavs);
  }, []);

  // Save Workout Log & Update PB Record
  const handleSaveLog = (newEntryData: Omit<WorkoutLogEntry, 'id' | 'timestamp'>) => {
    const timestamp = new Date(newEntryData.date).getTime() || Date.now();
    const newLog: WorkoutLogEntry = {
      ...newEntryData,
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      timestamp
    };

    const updatedLogs = [newLog, ...logs];
    setLogs(updatedLogs);
    saveStoredLogs(updatedLogs);

    // Recalculate PB for this exercise
    const exercise = EXERCISES[newLog.exerciseId];
    if (exercise) {
      const existingPB = pbRecords[exercise.id];
      const evaluation = evaluateWorkoutEntry(
        exercise,
        newLog.metricValue,
        newLog.sets,
        newLog.weightAddedKg,
        existingPB
      );

      const isPassed = evaluation.isPass || (existingPB ? existingPB.isPassed : false);

      const updatedPB: PBRecord = {
        exerciseId: exercise.id,
        bestValue: evaluation.newPBValue,
        bestWeightKg: newLog.weightAddedKg || existingPB?.bestWeightKg,
        bestSets: newLog.sets || existingPB?.bestSets,
        dateAchieved: newLog.metricValue >= (existingPB?.bestValue || 0) ? newLog.date : (existingPB?.dateAchieved || newLog.date),
        isPassed: isPassed,
        datePassed: isPassed ? (existingPB?.datePassed || newLog.date) : undefined
      };

      const updatedPBs = {
        ...pbRecords,
        [exercise.id]: updatedPB
      };

      setPbRecords(updatedPBs);
      saveStoredPBs(updatedPBs);
    }
  };

  // Delete a log entry
  const handleDeleteLog = (logId: string) => {
    const updatedLogs = logs.filter(l => l.id !== logId);
    setLogs(updatedLogs);
    saveStoredLogs(updatedLogs);

    // Recalculate all PBs from remaining logs
    const newPBs: Record<string, PBRecord> = {};
    for (const log of updatedLogs) {
      const ex = EXERCISES[log.exerciseId];
      if (!ex) continue;
      const target = ex.metricType === 'seconds'
        ? ex.passCriteria.targetHoldSeconds || 0
        : ex.passCriteria.targetReps || 0;

      const existing = newPBs[log.exerciseId];
      if (!existing || log.metricValue > existing.bestValue) {
        newPBs[log.exerciseId] = {
          exerciseId: log.exerciseId,
          bestValue: log.metricValue,
          bestWeightKg: log.weightAddedKg,
          bestSets: log.sets,
          dateAchieved: log.date,
          isPassed: log.metricValue >= target && target > 0,
          datePassed: log.metricValue >= target && target > 0 ? log.date : undefined
        };
      }
    }

    setPbRecords(newPBs);
    saveStoredPBs(newPBs);
  };

  // Reset to initial sample data
  const handleResetData = () => {
    const { logs: defaultLogs, pbs: defaultPBs, favs: defaultFavs } = resetAllDataToDefault();
    setLogs(defaultLogs);
    setPbRecords(defaultPBs);
    setFavorites(defaultFavs);
  };

  // Export data
  const handleExportData = () => {
    exportUserData(logs, pbRecords, favorites);
  };

  // Transfer stopwatch seconds directly into log modal
  const handleTransferHoldTime = (seconds: number) => {
    if (selectedExercise) {
      setLoggingExercise(selectedExercise);
    } else {
      // Pick first static hold exercise or current tree's active exercise
      const currentTree = SKILL_TREES.find(t => t.id === selectedTreeId) || SKILL_TREES[0];
      const ex = EXERCISES[currentTree.exercises[0]];
      setLoggingExercise(ex);
    }
  };

  // Filtered Trees & Exercises based on search or category
  const filteredTrees = SKILL_TREES.filter(tree => {
    if (activeCategory !== 'All' && tree.category !== activeCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTreeName = tree.name.toLowerCase().includes(q) || tree.description.toLowerCase().includes(q);
      const matchExerciseInTree = tree.exercises.some(id => {
        const ex = EXERCISES[id];
        return ex && (
          ex.title.toLowerCase().includes(q) ||
          ex.description.toLowerCase().includes(q) ||
          ex.primaryMuscles.some(m => m.toLowerCase().includes(q))
        );
      });
      return matchTreeName || matchExerciseInTree;
    }
    return true;
  });

  const allFilteredExercises = Object.values(EXERCISES).filter(ex => {
    if (activeCategory !== 'All' && ex.category !== activeCategory) {
      return false;
    }
    if (selectedTreeId && ex.skillTreeId !== selectedTreeId) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        ex.title.toLowerCase().includes(q) ||
        ex.description.toLowerCase().includes(q) ||
        ex.primaryMuscles.some(m => m.toLowerCase().includes(q)) ||
        ex.equipment.some(e => e.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const currentActiveTree = SKILL_TREES.find(t => t.id === selectedTreeId) || (filteredTrees.length > 0 ? filteredTrees[0] : SKILL_TREES[0]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-zinc-100 flex flex-col font-sans selection:bg-[#D1FF00]/30 selection:text-[#D1FF00] bg-grid-pattern">
      {/* Top Navbar */}
      <Header
        trees={SKILL_TREES}
        selectedTreeId={selectedTreeId}
        activeCategory={activeCategory}
        searchQuery={searchQuery}
        viewMode={viewMode}
        isTimerOpen={isTimerOpen}
        onSelectTree={setSelectedTreeId}
        onSelectCategory={setActiveCategory}
        onSearchChange={setSearchQuery}
        onViewModeChange={setViewMode}
        onToggleTimer={() => setIsTimerOpen(!isTimerOpen)}
        onExportData={handleExportData}
        onResetData={handleResetData}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Floating / Side Rest Timer Bar (if opened) */}
        {isTimerOpen && (
          <div className="max-w-xl mx-auto mb-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <RestTimer
              onTransferHoldTime={handleTransferHoldTime}
              defaultRestSeconds={selectedExercise?.passCriteria.restSeconds || 90}
            />
          </div>
        )}

        {/* VIEW 1: SKILL TREES & PROGRESSION ROADMAPS */}
        {viewMode === 'trees' && (
          <div className="space-y-6">
            {/* Skill Trees Horizontal Selector Grid */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#D1FF00]" />
                  Progression Pathways
                </span>
                <span className="text-[11px] font-mono text-zinc-500">
                  {filteredTrees.length} Skill Trees
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                {filteredTrees.map(tree => {
                  const isSelected = tree.id === selectedTreeId;
                  const treeExs = tree.exercises.map(id => EXERCISES[id]).filter(Boolean);
                  const passed = treeExs.filter(ex => {
                    const pb = pbRecords[ex.id];
                    const target = ex.metricType === 'seconds'
                      ? ex.passCriteria.targetHoldSeconds || 0
                      : ex.passCriteria.targetReps || 0;
                    return pb?.isPassed || (pb && pb.bestValue >= target && target > 0);
                  }).length;

                  return (
                    <button
                      key={tree.id}
                      onClick={() => setSelectedTreeId(tree.id)}
                      className={`p-3 rounded-lg border text-left transition-all duration-150 cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#141414] border-[#D1FF00] shadow-sm shadow-[#D1FF00]/15 ring-1 ring-[#D1FF00]/30'
                          : 'bg-[#141414] hover:bg-[#1a1a1a] border-[#222222] hover:border-zinc-700'
                      }`}
                    >
                      <div>
                        <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-500 block">
                          {tree.category}
                        </span>
                        <h4 className={`text-xs sm:text-sm font-bold tracking-tight mt-0.5 line-clamp-1 font-display ${
                          isSelected ? 'text-[#D1FF00]' : 'text-zinc-200'
                        }`}>
                          {tree.shortName}
                        </h4>
                      </div>

                      <div className="mt-3 flex items-center justify-between text-[10px] font-mono">
                        <span className={isSelected ? 'text-[#D1FF00] font-bold' : 'text-zinc-500'}>
                          {passed}/{treeExs.length}
                        </span>
                        {passed === treeExs.length && (
                          <span className="text-[#D1FF00] text-xs font-bold">★</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Selected Skill Tree Pathway View */}
            {currentActiveTree ? (
              <SkillTreeView
                tree={currentActiveTree}
                exercises={EXERCISES}
                pbRecords={pbRecords}
                logs={logs}
                onSelectExercise={setSelectedExercise}
                onOpenLogModal={setLoggingExercise}
              />
            ) : (
              <div className="p-12 text-center bg-[#141414] border border-[#222222] rounded-xl text-zinc-400 font-mono text-xs">
                No skill trees match the active filter.
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: ALL EXERCISES CATALOG */}
        {viewMode === 'catalog' && (
          <ExerciseCatalogView
            exercises={allFilteredExercises}
            trees={SKILL_TREES}
            pbRecords={pbRecords}
            logs={logs}
            onSelectExercise={setSelectedExercise}
            onOpenLogModal={setLoggingExercise}
          />
        )}

        {/* VIEW 3: MASTERY STATS & ANALYTICS */}
        {viewMode === 'stats' && (
          <MasteryStats
            trees={SKILL_TREES}
            exercises={EXERCISES}
            pbRecords={pbRecords}
            logs={logs}
            onSelectTree={treeId => {
              setSelectedTreeId(treeId);
              setViewMode('trees');
            }}
          />
        )}
      </main>

      {/* MODAL 1: EXERCISE DETAIL & GRAPH MODAL */}
      {selectedExercise && (
        <ExerciseDetailModal
          exercise={selectedExercise}
          skillTree={SKILL_TREES.find(t => t.id === selectedExercise.skillTreeId)}
          logs={logs}
          pbRecord={pbRecords[selectedExercise.id]}
          allExercises={EXERCISES}
          onSelectExercise={id => {
            const next = EXERCISES[id];
            if (next) setSelectedExercise(next);
          }}
          onOpenLogModal={ex => {
            setLoggingExercise(ex);
          }}
          onDeleteLog={handleDeleteLog}
          onClose={() => setSelectedExercise(null)}
        />
      )}

      {/* MODAL 2: LOG WORKOUT / RECORD PB MODAL */}
      {loggingExercise && (
        <LogWorkoutModal
          exercise={loggingExercise}
          existingPB={pbRecords[loggingExercise.id]}
          onSaveLog={handleSaveLog}
          onClose={() => setLoggingExercise(null)}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-[#222222] bg-[#0A0A0A] py-6 text-center text-xs text-zinc-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="tracking-tight">
            CALISTHENICS PROGRESSIONS &amp; PB TRACKER · GEOMETRIC BALANCE
          </p>
          <div className="flex items-center gap-3 text-zinc-600 text-[11px]">
            <span>Pull-Up</span>
            <span>·</span>
            <span>Planche</span>
            <span>·</span>
            <span>Dips</span>
            <span>·</span>
            <span>Handstand</span>
            <span>·</span>
            <span>Front Lever</span>
            <span>·</span>
            <span>Pistol Squat</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
