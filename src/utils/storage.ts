import { WorkoutLogEntry, PBRecord, ProgressionExercise } from '../types';
import { INITIAL_LOGS, deriveInitialPBRecords, EXERCISES } from '../data/calisthenicsData';

const STORAGE_KEYS = {
  LOGS: 'calisthenics_progressions_logs_v1',
  PB_RECORDS: 'calisthenics_progressions_pbs_v1',
  FAVORITES: 'calisthenics_progressions_favs_v1',
  SETTINGS: 'calisthenics_progressions_settings_v1'
};

export function loadStoredLogs(): WorkoutLogEntry[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.LOGS);
    if (!data) {
      // Return default initial logs
      saveStoredLogs(INITIAL_LOGS);
      return INITIAL_LOGS;
    }
    return JSON.parse(data);
  } catch (err) {
    console.error('Failed to load logs from localStorage', err);
    return INITIAL_LOGS;
  }
}

export function saveStoredLogs(logs: WorkoutLogEntry[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(logs));
  } catch (err) {
    console.error('Failed to save logs to localStorage', err);
  }
}

export function loadStoredPBs(): Record<string, PBRecord> {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PB_RECORDS);
    if (!data) {
      const logs = loadStoredLogs();
      const pbs = deriveInitialPBRecords(logs);
      saveStoredPBs(pbs);
      return pbs;
    }
    return JSON.parse(data);
  } catch (err) {
    console.error('Failed to load PBs from localStorage', err);
    return deriveInitialPBRecords(INITIAL_LOGS);
  }
}

export function saveStoredPBs(pbs: Record<string, PBRecord>): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PB_RECORDS, JSON.stringify(pbs));
  } catch (err) {
    console.error('Failed to save PBs to localStorage', err);
  }
}

export function loadFavorites(): string[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return data ? JSON.parse(data) : ['strict-pull-ups', 'pseudo-planche-push-ups', 'strict-parallel-dips'];
  } catch {
    return ['strict-pull-ups', 'pseudo-planche-push-ups', 'strict-parallel-dips'];
  }
}

export function saveFavorites(favs: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favs));
  } catch (err) {
    console.error('Failed to save favorites', err);
  }
}

export interface CheckPassResult {
  isPass: boolean;
  isPB: boolean;
  previousPB?: number;
  newPBValue: number;
}

export function evaluateWorkoutEntry(
  exercise: ProgressionExercise,
  metricValue: number,
  sets: number,
  weightAddedKg?: number,
  existingPB?: PBRecord
): CheckPassResult {
  const currentBest = existingPB ? existingPB.bestValue : 0;
  const isPB = metricValue > currentBest;
  
  let isPass = false;
  const { passCriteria, metricType } = exercise;

  if (metricType === 'reps' || metricType === 'reps_weighted') {
    if (passCriteria.targetReps && metricValue >= passCriteria.targetReps) {
      isPass = true;
    }
  } else if (metricType === 'seconds') {
    if (passCriteria.targetHoldSeconds && metricValue >= passCriteria.targetHoldSeconds) {
      isPass = true;
    }
  }

  return {
    isPass,
    isPB,
    previousPB: existingPB?.bestValue,
    newPBValue: Math.max(metricValue, currentBest)
  };
}

export function exportUserData(logs: WorkoutLogEntry[], pbs: Record<string, PBRecord>, favs: string[]) {
  const exportObject = {
    app: 'Calisthenics Progressions & PB Tracker',
    version: '1.0',
    exportedAt: new Date().toISOString(),
    logs,
    pbs,
    favorites: favs
  };

  const blob = new Blob([JSON.stringify(exportObject, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `calisthenics-progressions-backup-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function resetAllDataToDefault(): { logs: WorkoutLogEntry[]; pbs: Record<string, PBRecord>; favs: string[] } {
  localStorage.removeItem(STORAGE_KEYS.LOGS);
  localStorage.removeItem(STORAGE_KEYS.PB_RECORDS);
  localStorage.removeItem(STORAGE_KEYS.FAVORITES);

  const logs = [...INITIAL_LOGS];
  const pbs = deriveInitialPBRecords(logs);
  const favs = ['strict-pull-ups', 'pseudo-planche-push-ups', 'strict-parallel-dips'];

  saveStoredLogs(logs);
  saveStoredPBs(pbs);
  saveFavorites(favs);

  return { logs, pbs, favs };
}
