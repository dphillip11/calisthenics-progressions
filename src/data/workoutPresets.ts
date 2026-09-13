import { WorkoutPreset } from '../types';

export const WORKOUT_PRESETS: WorkoutPreset[] = [
  {
    id: 'workout-a-vertical-strength',
    name: 'Workout A',
    subtitle: 'Vertical Push & Pull + Compression',
    focus: 'Pull-Up & Dips Mastery, L-Sit & Pistol Squats',
    description: 'A classic antagonistic strength session pairing vertical pulling (Pull-Up / Muscle-Up tree) with vertical pushing (Dips tree), followed by core compression (L-Sit to Manna) and unilateral leg balance (Pistol Squat).',
    superset1: {
      treeAId: 'pull-up-muscle-up',
      treeBId: 'dips-progression',
      labelA: 'Vertical Pull',
      labelB: 'Vertical Push'
    },
    superset2: {
      treeAId: 'l-sit-v-sit-manna',
      treeBId: 'pistol-squat-tree',
      labelA: 'Anterior Core',
      labelB: 'Unilateral Legs'
    },
    warmupIds: [
      'wu-boxer-bounce',
      'wu-quadruped-wrist-rocks',
      'wu-dead-hang-scap-pulls',
      'wu-deep-squat-pry'
    ],
    stretchIds: [
      'str-passive-bar-hang',
      'str-doorway-chest-stretch',
      'str-seated-pike-hamstring'
    ]
  },
  {
    id: 'workout-b-straight-arm-levers',
    name: 'Workout B',
    subtitle: 'Straight-Arm Levers & Inversion',
    focus: 'Front Lever & Planche, Handstand & Dragon Flag',
    description: 'A pure gymnastic leverage session pairing horizontal straight-arm pulling (Front Lever tree) with horizontal anterior shoulder push (Push-Up to Planche), followed by overhead inversion (Handstand / HSPU) and posterior core lever control (Dragon Flag).',
    superset1: {
      treeAId: 'front-lever-progression',
      treeBId: 'push-up-planche',
      labelA: 'Horizontal Pull Lever',
      labelB: 'Anterior Push Lever'
    },
    superset2: {
      treeAId: 'handstand-hspu',
      treeBId: 'dragon-flag-tree',
      labelA: 'Overhead Inversion',
      labelB: 'Straight-Body Core'
    },
    warmupIds: [
      'wu-jumping-jacks',
      'wu-back-of-hand-press',
      'wu-scapular-pushups',
      'wu-hollow-arch-rocks'
    ],
    stretchIds: [
      'str-puppy-pose-lat-reach',
      'str-kneeling-wrist-flexor-stretch',
      'str-cobra-upward-dog'
    ]
  },
  {
    id: 'workout-c-transition-power',
    name: 'Workout C',
    subtitle: 'Dynamic Transitions & Overhead Power',
    focus: 'MU Assistance & Handstand, Front Lever & Pistols',
    description: 'Build explosive dynamic transition mechanics and lockouts pairing muscle-up assistance drills with handstand balance and pike pressing, rounded out with horizontal back strength and single-leg mobility.',
    superset1: {
      treeAId: 'muscle-up-assistance-tree',
      treeBId: 'handstand-hspu',
      labelA: 'Transition & Transfer',
      labelB: 'Overhead Press / Balance'
    },
    superset2: {
      treeAId: 'front-lever-progression',
      treeBId: 'pistol-squat-tree',
      labelA: 'Posterior Pull Lever',
      labelB: 'Unilateral Legs'
    },
    warmupIds: [
      'wu-arm-circles-swings',
      'wu-quadruped-wrist-rocks',
      'wu-shoulder-dislocates',
      'wu-deep-squat-pry'
    ],
    stretchIds: [
      'str-overhead-tricep-side-bend',
      'str-couch-stretch-hip-flexor',
      'str-passive-bar-hang'
    ]
  },
  {
    id: 'workout-d-foundations-volume',
    name: 'Workout D',
    subtitle: 'High Volume Pull/Push & Core Rigidity',
    focus: 'Foundational Pull & Push, Dips & Dragon Flag',
    description: 'Target high-volume calisthenics capacity from zero pull-up foundations and floor push variations, progressing into parallel bar stability and Bruce Lee dragon flag core tension.',
    superset1: {
      treeAId: 'beginner-pull-up-tree',
      treeBId: 'push-up-planche',
      labelA: 'Pull Foundation',
      labelB: 'Push Mechanics'
    },
    superset2: {
      treeAId: 'dips-progression',
      treeBId: 'dragon-flag-tree',
      labelA: 'Bar Support & Dip',
      labelB: 'Hollow Lever Core'
    },
    warmupIds: [
      'wu-boxer-bounce',
      'wu-finger-pulses',
      'wu-cat-cow',
      'wu-scapular-pushups'
    ],
    stretchIds: [
      'str-doorway-chest-stretch',
      'str-reverse-wrist-extensor-stretch',
      'str-straddle-pancake'
    ]
  }
];
