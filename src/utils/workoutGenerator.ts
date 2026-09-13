import {
  WorkoutPreset,
  WorkoutSessionConfig,
  SkillTree,
  ProgressionExercise,
  PBRecord,
  WorkoutLogEntry
} from '../types';
import { WORKOUT_PRESETS } from '../data/workoutPresets';
import { SKILL_TREES, EXERCISES } from '../data/calisthenicsData';

const WORKOUT_ROTATION_STORAGE_KEY = 'calisthenics_last_workout_preset_idx_v1';

/**
 * Extensible interface allowing algorithmic or rule-based pairing generators
 * if more skill trees are added in the future.
 */
export interface WorkoutGeneratorInterface {
  getAvailablePresets: () => WorkoutPreset[];
  getNextPreset: () => WorkoutPreset;
  getPresetById: (id: string) => WorkoutPreset | undefined;
  resolveWorkingExerciseForTree: (
    treeId: string,
    pbRecords: Record<string, PBRecord>,
    allExercises: Record<string, ProgressionExercise>
  ) => ProgressionExercise;
  buildSessionConfig: (
    preset: WorkoutPreset,
    pbRecords: Record<string, PBRecord>,
    allExercises: Record<string, ProgressionExercise>
  ) => WorkoutSessionConfig;
  generateDynamicPairingWorkout?: (
    allTrees: SkillTree[],
    recentLogs: WorkoutLogEntry[],
    pbRecords: Record<string, PBRecord>
  ) => WorkoutPreset;
}

/**
 * Resolves the user's current working exercise in a skill tree.
 * Checks progression in sequential order: returns the first exercise that has NOT yet been passed.
 * If all exercises are passed, returns the final (highest mastery) exercise.
 * If none are found, defaults to the tree's first exercise.
 */
export function resolveWorkingExerciseForTree(
  treeId: string,
  pbRecords: Record<string, PBRecord>,
  allExercises: Record<string, ProgressionExercise>
): ProgressionExercise {
  const tree = SKILL_TREES.find(t => t.id === treeId);
  if (!tree || tree.exercises.length === 0) {
    // Fallback if tree not found
    return Object.values(allExercises)[0];
  }

  for (const exerciseId of tree.exercises) {
    const exercise = allExercises[exerciseId];
    if (!exercise) continue;
    const record = pbRecords[exerciseId];
    if (!record || !record.isPassed) {
      return exercise;
    }
  }

  // If user passed all exercises in the tree, target the final master exercise
  const lastExerciseId = tree.exercises[tree.exercises.length - 1];
  return allExercises[lastExerciseId] || allExercises[tree.exercises[0]];
}

export function getLastWorkoutPresetIndex(): number {
  try {
    const raw = localStorage.getItem(WORKOUT_ROTATION_STORAGE_KEY);
    if (raw !== null) {
      const idx = parseInt(raw, 10);
      if (!isNaN(idx) && idx >= 0 && idx < WORKOUT_PRESETS.length) {
        return idx;
      }
    }
  } catch {
    // Ignore storage issues
  }
  return 0;
}

export function setLastWorkoutPresetIndex(index: number): void {
  try {
    localStorage.setItem(WORKOUT_ROTATION_STORAGE_KEY, String(index));
  } catch {
    // Ignore storage issues
  }
}

export function getNextWorkoutPreset(): { preset: WorkoutPreset; index: number } {
  const currentIdx = getLastWorkoutPresetIndex();
  // Rotate to next preset sequentially
  const nextIdx = (currentIdx + 1) % WORKOUT_PRESETS.length;
  return {
    preset: WORKOUT_PRESETS[nextIdx],
    index: nextIdx
  };
}

export function getCurrentWorkoutPreset(): { preset: WorkoutPreset; index: number } {
  const idx = getLastWorkoutPresetIndex();
  return {
    preset: WORKOUT_PRESETS[idx] || WORKOUT_PRESETS[0],
    index: idx
  };
}

/**
 * Builds a complete WorkoutSessionConfig from a preset by dynamically
 * resolving the user's current working levels in each of the 4 tree endpoints.
 */
export function buildSessionConfig(
  preset: WorkoutPreset,
  pbRecords: Record<string, PBRecord>,
  allExercises: Record<string, ProgressionExercise>
): WorkoutSessionConfig {
  const exerciseA1 = resolveWorkingExerciseForTree(preset.superset1.treeAId, pbRecords, allExercises);
  const exerciseB1 = resolveWorkingExerciseForTree(preset.superset1.treeBId, pbRecords, allExercises);
  const exerciseA2 = resolveWorkingExerciseForTree(preset.superset2.treeAId, pbRecords, allExercises);
  const exerciseB2 = resolveWorkingExerciseForTree(preset.superset2.treeBId, pbRecords, allExercises);

  return {
    preset,
    exerciseA1,
    exerciseB1,
    exerciseA2,
    exerciseB2,
    roundsPerSuperset: 3,
    restBetweenRoundsSeconds: 90,
    restBetweenSupersetsSeconds: 120
  };
}

/**
 * Implementation of WorkoutGeneratorInterface
 */
export class PresetWorkoutGenerator implements WorkoutGeneratorInterface {
  getAvailablePresets(): WorkoutPreset[] {
    return WORKOUT_PRESETS;
  }

  getNextPreset(): WorkoutPreset {
    const { preset } = getNextWorkoutPreset();
    return preset;
  }

  getPresetById(id: string): WorkoutPreset | undefined {
    return WORKOUT_PRESETS.find(p => p.id === id);
  }

  resolveWorkingExerciseForTree(
    treeId: string,
    pbRecords: Record<string, PBRecord>,
    allExercises: Record<string, ProgressionExercise>
  ): ProgressionExercise {
    return resolveWorkingExerciseForTree(treeId, pbRecords, allExercises);
  }

  buildSessionConfig(
    preset: WorkoutPreset,
    pbRecords: Record<string, PBRecord>,
    allExercises: Record<string, ProgressionExercise>
  ): WorkoutSessionConfig {
    return buildSessionConfig(preset, pbRecords, allExercises);
  }

  /**
   * Future-proof algorithmic generator hook:
   * Selects complementary push/pull/core/legs pairings dynamically
   * based on the trees least trained in recent logs.
   */
  generateDynamicPairingWorkout(
    allTrees: SkillTree[],
    recentLogs: WorkoutLogEntry[],
    pbRecords: Record<string, PBRecord>
  ): WorkoutPreset {
    // Count recent log volume per tree
    const treeUsageCount: Record<string, number> = {};
    allTrees.forEach(t => {
      treeUsageCount[t.id] = 0;
    });

    recentLogs.slice(0, 30).forEach(log => {
      const ex = EXERCISES[log.exerciseId];
      if (ex && ex.skillTreeId && treeUsageCount[ex.skillTreeId] !== undefined) {
        treeUsageCount[ex.skillTreeId] += 1;
      }
    });

    // Group trees by movement category
    const pulls = allTrees.filter(t => t.category === 'Pull' || t.category === 'Static Hold');
    const pushes = allTrees.filter(t => t.category === 'Push' || t.category === 'Dip' || t.category === 'Handstand');
    const cores = allTrees.filter(t => t.category === 'Core');
    const legs = allTrees.filter(t => t.category === 'Legs');

    // Sort by least recently used
    const sortByLeastUsed = (list: SkillTree[]) =>
      [...list].sort((a, b) => (treeUsageCount[a.id] || 0) - (treeUsageCount[b.id] || 0));

    const sortedPulls = sortByLeastUsed(pulls);
    const sortedPushes = sortByLeastUsed(pushes);
    const sortedCores = sortByLeastUsed(cores);
    const sortedLegs = sortByLeastUsed(legs);

    const pullTree = sortedPulls[0] || allTrees[0];
    const pushTree = sortedPushes[0] || allTrees[3];
    const coreTree = sortedCores[0] || allTrees[8];
    const legTree = sortedLegs[0] || allTrees[9];

    return {
      id: `dynamic-${Date.now()}`,
      name: 'Dynamic Auto-Balanced Session',
      subtitle: `${pullTree.shortName} + ${pushTree.shortName} & ${coreTree.shortName} + ${legTree.shortName}`,
      focus: 'Algorithmic Antagonistic Rotation',
      description: 'Dynamically generated superset session balancing the least recently trained skill trees across Pull, Push, Core, and Lower Body movement planes.',
      superset1: {
        treeAId: pullTree.id,
        treeBId: pushTree.id,
        labelA: pullTree.category,
        labelB: pushTree.category
      },
      superset2: {
        treeAId: coreTree.id,
        treeBId: legTree.id,
        labelA: coreTree.category,
        labelB: legTree.category
      },
      warmupIds: ['wu-boxer-bounce', 'wu-quadruped-wrist-rocks', 'wu-scapular-pushups'],
      stretchIds: ['str-passive-bar-hang', 'str-doorway-chest-stretch', 'str-seated-pike-hamstring']
    };
  }
}

export const defaultWorkoutGenerator = new PresetWorkoutGenerator();
