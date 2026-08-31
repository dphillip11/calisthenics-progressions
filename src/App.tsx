import React, { useState, useEffect } from 'react';
import {
  SkillTree,
  ProgressionExercise,
  WorkoutLogEntry,
  PBRecord
} from './types';
import { SKILL_TREES, EXERCISES } from './data/calisthenicsData';
import { WARMUP_EXERCISES } from './data/warmupData';
import { STRETCH_EXERCISES } from './data/stretchData';
import {
  loadStoredLogs,
  saveStoredLogs,
  loadStoredPBs,
  saveStoredPBs,
  loadFavorites,
  saveFavorites,
  exportUserData,
  clearAllData,
  importUserData,
  resetAllDataToDefault,
  evaluateWorkoutEntry
} from './utils/storage';
import { Header } from './components/Header';
import { SkillTreeView } from './components/SkillTreeView';
import { WarmupView } from './components/WarmupView';
import { StretchView } from './components/StretchView';
import { MasteryStats } from './components/MasteryStats';
import { ExerciseDetailModal } from './components/ExerciseDetailModal';
import { LogWorkoutModal } from './components/LogWorkoutModal';
import { DataManagementModal } from './components/DataManagementModal';
import { RestTimer } from './components/RestTimer';
import {
  Layers,
  Flame,
  Activity,
  CheckCircle2,
  AlertCircle,
  X
} from 'lucide-react';

export default function App() {
  // State initialization
  const [logs, setLogs] = useState<WorkoutLogEntry[]>([]);
  const [pbRecords, setPbRecords] = useState<Record<string, PBRecord>>({});
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedTreeId, setSelectedTreeId] = useState<string>('pull-up-muscle-up');
  const [selectedExercise, setSelectedExercise] = useState<ProgressionExercise | null>(null);
  const [loggingExercise, setLoggingExercise] = useState<ProgressionExercise | null>(null);
  const [viewMode, setViewMode] = useState<'warmup' | 'trees' | 'stretches' | 'stats'>('trees');
  const [isTimerOpen, setIsTimerOpen] = useState<boolean>(false);
  const [timerInitialMode, setTimerInitialMode] = useState<'rest' | 'hold'>('rest');
  const [timerTargetExercise, setTimerTargetExercise] = useState<ProgressionExercise | null>(null);
  const [isDataModalOpen, setIsDataModalOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Auto-dismiss toast after 4.5 seconds
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 4500);
    return () => clearTimeout(timer);
  }, [toast]);

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

  // Clear all data (empty state)
  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear ALL workouts, history, and personal records? This cannot be undone.')) {
      const { logs: emptyLogs, pbs: emptyPBs, favs: emptyFavs } = clearAllData();
      setLogs(emptyLogs);
      setPbRecords(emptyPBs);
      setFavorites(emptyFavs);
      setToast({
        type: 'info',
        message: 'All workout logs and PB records have been cleared.'
      });
    }
  };

  // Reset to initial sample data
  const handleResetData = () => {
    if (window.confirm('Reset all workout logs and PBs to default sample data?')) {
      const { logs: defaultLogs, pbs: defaultPBs, favs: defaultFavs } = resetAllDataToDefault();
      setLogs(defaultLogs);
      setPbRecords(defaultPBs);
      setFavorites(defaultFavs);
      setToast({
        type: 'info',
        message: 'Reset to default sample progression data.'
      });
    }
  };

  // Export data
  const handleExportData = () => {
    exportUserData(logs, pbRecords, favorites);
    setToast({
      type: 'success',
      message: 'Exported backup JSON file successfully.'
    });
  };

  // Import data from JSON file
  const handleImportData = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (!content) {
        setToast({
          type: 'error',
          message: 'Failed to read file content.'
        });
        return;
      }

      const result = importUserData(content);
      if (result.success && result.logs && result.pbs) {
        setLogs(result.logs);
        setPbRecords(result.pbs);
        if (result.favs) {
          setFavorites(result.favs);
        }
        setToast({
          type: 'success',
          message: result.message
        });
      } else {
        setToast({
          type: 'error',
          message: result.message
        });
      }
    };
    reader.onerror = () => {
      setToast({
        type: 'error',
        message: 'Error reading selected file.'
      });
    };
    reader.readAsText(file);
  };

  // Open Front-most Timer modal with contextual exercise & mode
  const handleOpenTimer = (exercise?: ProgressionExercise | null, mode?: 'rest' | 'hold') => {
    const targetEx = exercise || selectedExercise || (SKILL_TREES.find(t => t.id === selectedTreeId)?.exercises[0] ? EXERCISES[SKILL_TREES.find(t => t.id === selectedTreeId)!.exercises[0]] : null);
    setTimerTargetExercise(targetEx);

    if (mode) {
      setTimerInitialMode(mode);
    } else if (targetEx?.metricType === 'seconds') {
      setTimerInitialMode('hold');
    } else {
      setTimerInitialMode('rest');
    }

    setIsTimerOpen(true);
  };

  // Callback when RestTimer logs a completed set
  const handleTimerLogSet = (exercise: ProgressionExercise, metricValue: number) => {
    handleSaveLog({
      exerciseId: exercise.id,
      date: new Date().toISOString().slice(0, 10),
      metricValue,
      sets: 1,
      rpe: 8,
      notes: `Logged via Chrono / Timer (${metricValue} ${exercise.metricType === 'seconds' ? 's hold' : 'reps'})`
    });

    setToast({
      type: 'success',
      message: `Set recorded: ${metricValue} ${exercise.metricType === 'seconds' ? 'seconds' : 'reps'} for ${exercise.title}`
    });
  };

  const currentActiveTree = SKILL_TREES.find(t => t.id === selectedTreeId) || SKILL_TREES[0];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-zinc-100 flex flex-col font-sans selection:bg-[#D1FF00]/30 selection:text-[#D1FF00] bg-grid-pattern">
      {/* Top Navbar */}
      <Header
        trees={SKILL_TREES}
        selectedTreeId={selectedTreeId}
        viewMode={viewMode}
        isTimerOpen={isTimerOpen}
        onSelectTree={setSelectedTreeId}
        onViewModeChange={setViewMode}
        onToggleTimer={() => handleOpenTimer(selectedExercise)}
        onOpenDataModal={() => setIsDataModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 space-y-6">
        {/* VIEW 1: SKILL TREES & PROGRESSION PATHWAYS */}
        {viewMode === 'trees' && (
          <div className="space-y-6">
            {/* Unfiltered Progression Pathways Ribbon / Grid */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#D1FF00]" />
                  Progression Pathways
                </span>
                <span className="text-[11px] font-mono text-zinc-500">
                  {SKILL_TREES.length} Total Pathways &middot; Select to Filter
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-9 gap-2">
                {SKILL_TREES.map(tree => {
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
                      className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between shadow-xs ${
                        isSelected
                          ? 'bg-[#20232a] border-[#D1FF00] shadow-md shadow-[#D1FF00]/10 ring-1 ring-[#D1FF00]/40'
                          : 'bg-[#20232a]/70 hover:bg-[#20232a] border-[#333742] hover:border-[#4b5263]'
                      }`}
                    >
                      <div>
                        <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-400 block">
                          {tree.category}
                        </span>
                        <h4 className={`text-xs sm:text-sm font-bold tracking-tight mt-0.5 line-clamp-1 font-display ${
                          isSelected ? 'text-[#D1FF00]' : 'text-zinc-200'
                        }`}>
                          {tree.shortName}
                        </h4>
                      </div>

                      <div className="mt-2.5 pt-2 border-t border-[#333742] flex items-center justify-between text-[10px] font-mono">
                        <span className={isSelected ? 'text-[#D1FF00] font-bold' : 'text-zinc-400'}>
                          {passed}/{treeExs.length} done
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
            {currentActiveTree && (
              <SkillTreeView
                tree={currentActiveTree}
                exercises={EXERCISES}
                pbRecords={pbRecords}
                logs={logs}
                onSelectExercise={setSelectedExercise}
                onOpenLogModal={setLoggingExercise}
              />
            )}
          </div>
        )}

        {/* VIEW: WARMUP & JOINT PREP */}
        {viewMode === 'warmup' && (
          <WarmupView
            exercises={WARMUP_EXERCISES}
            onOpenTimer={() => handleOpenTimer(null, 'rest')}
          />
        )}

        {/* VIEW: STRETCHES & MOBILITY */}
        {viewMode === 'stretches' && (
          <StretchView
            exercises={STRETCH_EXERCISES}
            onOpenTimer={() => handleOpenTimer(null, 'hold')}
          />
        )}

        {/* VIEW: MASTERY STATS & ANALYTICS */}
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

      {/* FULL-SCREEN DISMISSABLE EXERCISE DETAIL PAGE */}
      {selectedExercise && (
        <ExerciseDetailModal
          exercise={selectedExercise}
          skillTree={SKILL_TREES.find(t => t.id === selectedExercise.skillTreeId)}
          logs={logs}
          pbRecord={pbRecords[selectedExercise.id]}
          allExercises={EXERCISES}
          isTimerOpen={isTimerOpen}
          onSelectExercise={id => {
            const next = EXERCISES[id];
            if (next) setSelectedExercise(next);
          }}
          onOpenLogModal={ex => {
            setLoggingExercise(ex);
          }}
          onSaveLog={handleSaveLog}
          onOpenTimer={(ex, mode) => handleOpenTimer(ex, mode)}
          onToggleTimer={() => handleOpenTimer(selectedExercise)}
          onOpenDataModal={() => setIsDataModalOpen(true)}
          onDeleteLog={handleDeleteLog}
          onClose={() => setSelectedExercise(null)}
        />
      )}

      {/* MODAL 2: LOG WORKOUT / RECORD PB MODAL */}
      {loggingExercise && (
        <LogWorkoutModal
          exercise={loggingExercise}
          existingPB={pbRecords[loggingExercise.id]}
          logs={logs}
          onSaveLog={handleSaveLog}
          onClose={() => setLoggingExercise(null)}
        />
      )}

      {/* MODAL 3: DATA & STORAGE MANAGEMENT MODAL */}
      {isDataModalOpen && (
        <DataManagementModal
          logsCount={logs.length}
          pbsCount={Object.keys(pbRecords).length}
          favoritesCount={favorites.length}
          onExportData={handleExportData}
          onImportData={handleImportData}
          onClearData={handleClearData}
          onResetData={handleResetData}
          onClose={() => setIsDataModalOpen(false)}
        />
      )}

      {/* FRONT-MOST TIMER & CHRONO MODAL (Floats on top of all screens and modals) */}
      <RestTimer
        isOpen={isTimerOpen}
        onClose={() => setIsTimerOpen(false)}
        activeExercise={timerTargetExercise || selectedExercise}
        defaultRestSeconds={(timerTargetExercise || selectedExercise)?.passCriteria.restSeconds || 90}
        initialMode={timerInitialMode}
        onLogCompletedSet={handleTimerLogSet}
      />

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 max-w-sm animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className={`p-3.5 rounded-xl border shadow-xl flex items-center gap-3 backdrop-blur-md ${
            toast.type === 'success'
              ? 'bg-[#141414]/95 border-[#D1FF00]/40 text-zinc-100 shadow-[#D1FF00]/10'
              : toast.type === 'error'
              ? 'bg-[#141414]/95 border-rose-500/40 text-zinc-100 shadow-rose-500/10'
              : 'bg-[#141414]/95 border-zinc-700 text-zinc-200 shadow-black/40'
          }`}>
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#D1FF00] shrink-0" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
            {toast.type === 'info' && <Flame className="w-5 h-5 text-zinc-400 shrink-0" />}
            <p className="text-xs font-sans font-medium flex-1">{toast.message}</p>
            <button
              onClick={() => setToast(null)}
              className="p-1 text-zinc-500 hover:text-zinc-300 transition cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
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
