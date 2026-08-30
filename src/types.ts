export type SkillCategory = 'Pull' | 'Push' | 'Dip' | 'Handstand' | 'Static Hold' | 'Core' | 'Legs';
export type SkillDifficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'Elite';
export type MetricType = 'reps' | 'seconds' | 'reps_weighted';

export interface PassCriteria {
  targetReps?: number;
  targetHoldSeconds?: number;
  targetSets: number;
  restSeconds: number;
  formStandard: string;
  tempo?: string;
  notes?: string;
}

export interface ProgressionExercise {
  id: string;
  skillTreeId: string;
  title: string;
  subtitle: string;
  level: number;
  difficulty: SkillDifficulty;
  category: SkillCategory;
  equipment: string[];
  metricType: MetricType;
  passCriteria: PassCriteria;
  prerequisites: string[]; // exercise IDs
  unlockedSkills: string[]; // exercise IDs
  description: string;
  formCues: string[];
  commonMistakes: string[];
  primaryMuscles: string[];
  secondaryMuscles: string[];
  illustrationType: string;
  tips: string;
}

export interface SkillTree {
  id: string;
  name: string;
  shortName: string;
  category: SkillCategory;
  description: string;
  iconName: string;
  color: string;
  accentColor: string;
  exercises: string[]; // exercise IDs in progressive order
}

export interface WorkoutLogEntry {
  id: string;
  exerciseId: string;
  date: string; // ISO date string (YYYY-MM-DD)
  timestamp: number;
  metricValue: number; // reps or seconds
  sets: number;
  weightAddedKg?: number;
  rpe?: number; // 1 to 10
  notes?: string;
  isPB?: boolean;
  passedCriteria?: boolean;
}

export interface PBRecord {
  exerciseId: string;
  bestValue: number; // reps or seconds
  bestWeightKg?: number;
  bestSets?: number;
  dateAchieved: string;
  isPassed: boolean;
  datePassed?: string;
}

export interface UserProgressState {
  logs: WorkoutLogEntry[];
  pbRecords: Record<string, PBRecord>;
  favorites: string[];
  activeFilter: SkillCategory | 'All';
  searchQuery: string;
  selectedTreeId: string | null;
  selectedExerciseId: string | null;
}
