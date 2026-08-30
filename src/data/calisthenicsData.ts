import { SkillTree, ProgressionExercise, WorkoutLogEntry, PBRecord } from '../types';

export const SKILL_TREES: SkillTree[] = [
  {
    id: 'pull-up-muscle-up',
    name: 'Pull-Up to Muscle-Up',
    shortName: 'Muscle-Up',
    category: 'Pull',
    description: 'Master vertical pulling mechanics from initial scapular retractions to dynamic transitions and the strict Bar/Ring Muscle-Up.',
    iconName: 'Flame',
    color: 'from-amber-500/20 to-orange-600/20',
    accentColor: 'text-amber-400',
    exercises: [
      'dead-hang-scapular-pulls',
      'australian-pull-ups',
      'negative-pull-ups',
      'strict-pull-ups',
      'l-sit-pull-ups',
      'explosive-chest-to-bar',
      'muscle-up-transition',
      'strict-bar-muscle-up'
    ]
  },
  {
    id: 'push-up-planche',
    name: 'Push-Up to Planche',
    shortName: 'Planche',
    category: 'Push',
    description: 'Develop straight-arm anterior deltoid and core strength toward the gravity-defying Full Planche.',
    iconName: 'Zap',
    color: 'from-cyan-500/20 to-blue-600/20',
    accentColor: 'text-cyan-400',
    exercises: [
      'incline-push-ups',
      'strict-floor-push-ups',
      'diamond-push-ups',
      'pseudo-planche-push-ups',
      'tuck-planche-hold',
      'advanced-tuck-planche',
      'straddle-planche-hold',
      'full-planche-hold'
    ]
  },
  {
    id: 'dips-progression',
    name: 'Dips to Ring Muscle Support',
    shortName: 'Dips Mastery',
    category: 'Dip',
    description: 'Build supreme vertical pushing strength and scapular depression across parallel bars and gymnastic rings.',
    iconName: 'Shield',
    color: 'from-emerald-500/20 to-teal-600/20',
    accentColor: 'text-emerald-400',
    exercises: [
      'bench-dips',
      'parallel-bar-support-hold',
      'negative-parallel-dips',
      'strict-parallel-dips',
      'straight-bar-dips',
      'strict-ring-dips',
      'ring-dips-rto'
    ]
  },
  {
    id: 'handstand-hspu',
    name: 'Handstand & Handstand Push-Up',
    shortName: 'Handstand / HSPU',
    category: 'Handstand',
    description: 'Master balance, hollow-body alignment, and vertical overhead pushing from wall drills to freestanding HSPUs.',
    iconName: 'Target',
    color: 'from-purple-500/20 to-indigo-600/20',
    accentColor: 'text-purple-400',
    exercises: [
      'elevated-pike-push-ups',
      'wall-handstand-chest-to-wall',
      'freestanding-handstand-hold',
      'wall-handstand-push-ups',
      'freestanding-handstand-push-up',
      '90-degree-push-up'
    ]
  },
  {
    id: 'front-lever-progression',
    name: 'Front Lever Mastery',
    shortName: 'Front Lever',
    category: 'Static Hold',
    description: 'Unlock maximum lat, posterior chain, and straight-arm pulling control to hold horizontal suspended leverage.',
    iconName: 'Compass',
    color: 'from-rose-500/20 to-red-600/20',
    accentColor: 'text-rose-400',
    exercises: [
      'active-hang-dragon-flag',
      'tuck-front-lever-hold',
      'advanced-tuck-front-lever',
      'single-leg-front-lever',
      'straddle-front-lever',
      'full-front-lever-hold',
      'front-lever-pull-ups'
    ]
  },
  {
    id: 'l-sit-v-sit-manna',
    name: 'L-Sit to V-Sit & Manna',
    shortName: 'L-Sit to Manna',
    category: 'Core',
    description: 'Develop intense compression strength, active hip flexor mobility, and shoulder extension from L-sit to Manna.',
    iconName: 'Activity',
    color: 'from-yellow-500/20 to-amber-600/20',
    accentColor: 'text-yellow-400',
    exercises: [
      'seated-pike-leg-lifts',
      'tuck-l-sit-support',
      'full-l-sit-hold',
      'straddle-l-sit-hold',
      'v-sit-hold',
      'manna-hold'
    ]
  },
  {
    id: 'pistol-squat-tree',
    name: 'Pistol Squat & Unilateral Legs',
    shortName: 'Pistol Squat',
    category: 'Legs',
    description: 'Build single-leg balance, ankle dorsiflexion mobility, and unilateral quad/glute power.',
    iconName: 'Award',
    color: 'from-lime-500/20 to-emerald-600/20',
    accentColor: 'text-lime-400',
    exercises: [
      'deep-bodyweight-squat',
      'cossack-squat',
      'box-step-downs',
      'assisted-pistol-squat',
      'strict-pistol-squat',
      'shrimp-squat',
      'weighted-pistol-squat'
    ]
  }
];

export const EXERCISES: Record<string, ProgressionExercise> = {
  // PULL-UP TO MUSCLE-UP
  'dead-hang-scapular-pulls': {
    id: 'dead-hang-scapular-pulls',
    skillTreeId: 'pull-up-muscle-up',
    title: 'Scapular Pulls & Active Hang',
    subtitle: 'Foundation 1 · Scapular Depression & Grip',
    level: 1,
    difficulty: 'Beginner',
    category: 'Pull',
    equipment: ['Pull-up Bar'],
    metricType: 'reps',
    passCriteria: {
      targetReps: 12,
      targetSets: 3,
      restSeconds: 90,
      formStandard: 'Arms locked straight throughout. Scapulae depressed fully downwards with a 2-second hold at peak retraction.',
      tempo: '2-2-1-1',
      notes: 'Ensure zero elbow bend and controlled return to active hang.'
    },
    prerequisites: [],
    unlockedSkills: ['australian-pull-ups'],
    description: 'The critical cornerstone for shoulder health and vertical pulling strength. Teaches the brain to engage the lower trapezius and latissimus dorsi before initiating any elbow flexion.',
    formCues: [
      'Overhand shoulder-width grip with thumbs wrapped',
      'Pull shoulder blades down away from ears without bending elbows',
      'Maintain hollow body with ribcage pulled in and toes pointed',
      'Pause for 2 full seconds in top scapular retraction'
    ],
    commonMistakes: [
      'Bending the elbows to cheat height',
      'Arching lower back into banana posture',
      'Dropping passively down without decelerating'
    ],
    primaryMuscles: ['Lower Trapezius', 'Latissimus Dorsi', 'Forearms'],
    secondaryMuscles: ['Rhomboids', 'Core'],
    illustrationType: 'scapular-pull',
    tips: 'Imagine squeezing a coin between the bottom tips of your shoulder blades.'
  },
  'australian-pull-ups': {
    id: 'australian-pull-ups',
    skillTreeId: 'pull-up-muscle-up',
    title: 'Inverted Rows (Australian Pull-Ups)',
    subtitle: 'Foundation 2 · Horizontal Pulling Mechanics',
    level: 2,
    difficulty: 'Beginner',
    category: 'Pull',
    equipment: ['Low Bar', 'Gymnastic Rings'],
    metricType: 'reps',
    passCriteria: {
      targetReps: 15,
      targetSets: 3,
      restSeconds: 90,
      formStandard: 'Bar at waist height. Straight plank bodyline. Chest touches bar on every rep with zero hip sagging.',
      tempo: '2-1-1-1'
    },
    prerequisites: ['dead-hang-scapular-pulls'],
    unlockedSkills: ['negative-pull-ups'],
    description: 'Horizontal pulling strengthens the rhomboids, rear deltoids, and middle back, creating the necessary pulling volume while reducing load compared to full vertical bodyweight.',
    formCues: [
      'Straight diagonal plank from heels to crown',
      'Pull chest up until it touches the bar/rings',
      'Drive elbows back past the ribcage',
      'Lock glutes and abs to avoid sagging hips'
    ],
    commonMistakes: [
      'Poking neck forward to touch bar with chin instead of chest',
      'Flaring elbows out at 90 degrees',
      'Dropping hips to initiate the pull'
    ],
    primaryMuscles: ['Rhomboids', 'Mid Trapezius', 'Biceps'],
    secondaryMuscles: ['Latissimus Dorsi', 'Rear Deltoids', 'Core'],
    illustrationType: 'inverted-row',
    tips: 'Progressively lower the bar or place feet on an elevated box to increase difficulty.'
  },
  'negative-pull-ups': {
    id: 'negative-pull-ups',
    skillTreeId: 'pull-up-muscle-up',
    title: 'Eccentric Negative Pull-Ups',
    subtitle: 'Foundation 3 · Supramaximal Eccentric Control',
    level: 3,
    difficulty: 'Beginner',
    category: 'Pull',
    equipment: ['Pull-up Bar', 'Box (optional)'],
    metricType: 'reps',
    passCriteria: {
      targetReps: 5,
      targetSets: 4,
      restSeconds: 120,
      formStandard: 'Jump/step to chin over bar. Lower down in a strictly controlled 6-to-8 second tempo to a dead hang.',
      tempo: '8-0-1-0'
    },
    prerequisites: ['australian-pull-ups'],
    unlockedSkills: ['strict-pull-ups'],
    description: 'Eccentric overload triggers rapid neuromuscular adaptations and tendon strengthening, bridging the gap to full concentric pull-ups.',
    formCues: [
      'Jump smoothly or step on a box to reach chin over bar',
      'Lower down at a constant, uniform speed without dropping fast midway',
      'Keep core rigid and prevent swinging',
      'Fully extend arms into a dead hang at bottom before stepping down'
    ],
    commonMistakes: [
      'Dropping abruptly in the bottom 30% of range',
      'Excessive leg kicking or kipping',
      'Rushing the descent (less than 5 seconds)'
    ],
    primaryMuscles: ['Latissimus Dorsi', 'Biceps Brachii', 'Brachialis'],
    secondaryMuscles: ['Forearms', 'Core'],
    illustrationType: 'negative-pull-up',
    tips: 'Count out loud: 1001, 1002, 1003... to ensure you hit at least 6-8 seconds on every single rep.'
  },
  'strict-pull-ups': {
    id: 'strict-pull-ups',
    skillTreeId: 'pull-up-muscle-up',
    title: 'Strict Dead-Hang Pull-Ups',
    subtitle: 'Level 4 · Clean Vertical Pulling Baseline',
    level: 4,
    difficulty: 'Intermediate',
    category: 'Pull',
    equipment: ['Pull-up Bar'],
    metricType: 'reps',
    passCriteria: {
      targetReps: 10,
      targetSets: 3,
      restSeconds: 120,
      formStandard: 'Dead hang bottom (elbows locked) to chin clearly clearing above the top of the bar. Zero leg kick, zero momentum.',
      tempo: '2-0-1-1'
    },
    prerequisites: ['negative-pull-ups'],
    unlockedSkills: ['l-sit-pull-ups', 'explosive-chest-to-bar'],
    description: 'The golden benchmark of upper body pulling strength. Clean form requires complete range of motion with full extension at the bottom and chin cleared over the bar.',
    formCues: [
      'Dead hang with arms fully extended between every rep',
      'Initiate with scapular depression, then drive elbows down to hips',
      'Bring chin completely over bar level',
      'Keep legs straight or slightly forward in hollow posture'
    ],
    commonMistakes: [
      'Half reps (not extending arms at bottom)',
      'Kipping or swinging legs to gain momentum',
      'Craning neck forward to cheat chin height'
    ],
    primaryMuscles: ['Latissimus Dorsi', 'Teres Major', 'Biceps'],
    secondaryMuscles: ['Rhomboids', 'Brachioradialis', 'Core'],
    illustrationType: 'strict-pull-up',
    tips: 'Think about pulling the bar down to your collarbones rather than pulling your body up.'
  },
  'l-sit-pull-ups': {
    id: 'l-sit-pull-ups',
    skillTreeId: 'pull-up-muscle-up',
    title: 'L-Sit Pull-Ups',
    subtitle: 'Level 5 · Strict Core & Posterior Lever Tension',
    level: 5,
    difficulty: 'Intermediate',
    category: 'Pull',
    equipment: ['Pull-up Bar'],
    metricType: 'reps',
    passCriteria: {
      targetReps: 8,
      targetSets: 3,
      restSeconds: 120,
      formStandard: 'Legs locked straight at exactly 90 degrees to torso throughout entire set. Dead hang to chin over bar.',
      tempo: '2-0-1-1'
    },
    prerequisites: ['strict-pull-ups'],
    unlockedSkills: ['explosive-chest-to-bar'],
    description: 'Eliminates any possible leg swinging while demanding fierce hip flexor, abdominal compression, and altered pulling leverage.',
    formCues: [
      'Lock knees with pointed toes at 90 degrees horizontal',
      'Maintain L-sit position continuously during ascent and descent',
      'Pull through full range of motion without dropping legs'
    ],
    commonMistakes: [
      'Legs drooping below horizontal during pull',
      'Bending knees',
      'Incomplete arm lockout at bottom'
    ],
    primaryMuscles: ['Latissimus Dorsi', 'Rectus Abdominis', 'Iliopsoas'],
    secondaryMuscles: ['Quads', 'Biceps', 'Forearms'],
    illustrationType: 'l-sit-pull-up',
    tips: 'Warm up your hamstring mobility and seated pike compression before performing these.'
  },
  'explosive-chest-to-bar': {
    id: 'explosive-chest-to-bar',
    skillTreeId: 'pull-up-muscle-up',
    title: 'Explosive High Pull-Ups (Chest-to-Bar / Sternum)',
    subtitle: 'Level 6 · Explosive Vertical Pulling Power',
    level: 6,
    difficulty: 'Advanced',
    category: 'Pull',
    equipment: ['Pull-up Bar'],
    metricType: 'reps',
    passCriteria: {
      targetReps: 6,
      targetSets: 3,
      restSeconds: 150,
      formStandard: 'Pull explosively until bar touches lower chest or upper abdomen. Fluid descent with minimal swing.',
      tempo: 'X-0-1-0'
    },
    prerequisites: ['strict-pull-ups'],
    unlockedSkills: ['muscle-up-transition'],
    description: 'The explosive power prerequisite for the muscle-up. Builds the high pull required to bring your center of gravity over the bar without chicken-winging.',
    formCues: [
      'Pull with maximum acceleration right from the dead hang',
      'Drive elbows down and back behind torso',
      'Look slightly upward and arch upper back slightly to bring sternum to bar',
      'Fast concentric velocity is critical'
    ],
    commonMistakes: [
      'Pulling too slowly and stalling at chin height',
      'Extreme kipping or cycling legs',
      'Allowing bar to hit face/chin'
    ],
    primaryMuscles: ['Latissimus Dorsi', 'Posterior Deltoids', 'Brachialis'],
    secondaryMuscles: ['Upper Trapezius', 'Core', 'Forearms'],
    illustrationType: 'chest-to-bar',
    tips: 'Envision throwing the bar down to your hips as violently as possible.'
  },
  'muscle-up-transition': {
    id: 'muscle-up-transition',
    skillTreeId: 'pull-up-muscle-up',
    title: 'Muscle-Up Transition Drills',
    subtitle: 'Level 7 · The Turnover Mechanics',
    level: 7,
    difficulty: 'Advanced',
    category: 'Pull',
    equipment: ['Low Bar', 'Bands / Rings'],
    metricType: 'reps',
    passCriteria: {
      targetReps: 5,
      targetSets: 3,
      restSeconds: 120,
      formStandard: 'Symmetrical simultaneous turnover of both elbows over the bar without chicken-winging or stalling.',
      tempo: '1-1-1-1'
    },
    prerequisites: ['explosive-chest-to-bar'],
    unlockedSkills: ['strict-bar-muscle-up'],
    description: 'The transition phase between the top of the pull and the bottom of the dip is where 90% of athletes fail. This drill grooved the exact false grip or wrist rollover technique.',
    formCues: [
      'Roll wrists over top of bar at peak height',
      'Shoot chest and shoulders aggressively over the bar',
      'Both elbows must rotate over simultaneously',
      'Keep bar close to bodyline during turnover'
    ],
    commonMistakes: [
      'Chicken-winging (one elbow rolling up before the other)',
      'Hesitating at the transition inflection point',
      'Pushing the bar away from the body'
    ],
    primaryMuscles: ['Rotator Cuff', 'Triceps', 'Lats'],
    secondaryMuscles: ['Pectoralis Major', 'Deltoids', 'Forearms'],
    illustrationType: 'muscle-up-transition',
    tips: 'Practice on low bars with feet assisting lightly to ingrain the fast forward head lean.'
  },
  'strict-bar-muscle-up': {
    id: 'strict-bar-muscle-up',
    skillTreeId: 'pull-up-muscle-up',
    title: 'Strict Bar / Ring Muscle-Up',
    subtitle: 'Level 8 · The Calisthenics Pinnacle',
    level: 8,
    difficulty: 'Elite',
    category: 'Pull',
    equipment: ['Pull-up Bar', 'Gymnastic Rings'],
    metricType: 'reps',
    passCriteria: {
      targetReps: 3,
      targetSets: 3,
      restSeconds: 180,
      formStandard: 'Dead hang start. Clean symmetrical pull, smooth simultaneous double-elbow transition, and lockout into straight bar dip. Zero knee kipping.',
      tempo: 'Strict'
    },
    prerequisites: ['muscle-up-transition'],
    unlockedSkills: [],
    description: 'The ultimate showcase of dynamic pulling, transitional coordination, and pressing power combined into a seamless vertical movement.',
    formCues: [
      'Slight false grip or high knuckles over bar',
      'Explosive high pull towards upper abdomen',
      'Aggressive head and chest drive forward over the bar',
      'Clean lockout at top with full arm extension',
      'Controlled descent reversing the path'
    ],
    commonMistakes: [
      'Aggressive knee tuck or kipping kick',
      'Asymmetrical single-arm entry',
      'Failing to lock out dip at top'
    ],
    primaryMuscles: ['Latissimus Dorsi', 'Triceps', 'Pectorals', 'Deltoids'],
    secondaryMuscles: ['Core', 'Forearms', 'Serratus Anterior'],
    illustrationType: 'strict-muscle-up',
    tips: 'Rest at least 3-4 minutes between heavy muscle-up attempts to allow full ATP replenishment.'
  },

  // PUSH-UP TO PLANCHE
  'incline-push-ups': {
    id: 'incline-push-ups',
    skillTreeId: 'push-up-planche',
    title: 'Incline Push-Ups',
    subtitle: 'Foundation 1 · Scapular Protraction & Chest Control',
    level: 1,
    difficulty: 'Beginner',
    category: 'Push',
    equipment: ['Bench', 'Elevated Bar'],
    metricType: 'reps',
    passCriteria: {
      targetReps: 15,
      targetSets: 3,
      restSeconds: 60,
      formStandard: 'Hands on bench. Rigid plank bodyline. Chest touches bench, full arm lockout with scapular protraction at top.',
      tempo: '2-0-1-1'
    },
    prerequisites: [],
    unlockedSkills: ['strict-floor-push-ups'],
    description: 'Builds pressing confidence, strengthens the wrists, and teaches the crucial hollow-body position before loading full bodyweight.',
    formCues: [
      'Hands slightly wider than shoulder width',
      'Tuck elbows at 45 degrees to torso',
      'Glutes and quads squeezed tight',
      'Push all the way up and spread shoulder blades at top'
    ],
    commonMistakes: [
      'Flaring elbows out to 90 degrees',
      'Sagging lower back',
      'Incomplete depth'
    ],
    primaryMuscles: ['Pectoralis Major', 'Triceps Brachii', 'Anterior Deltoid'],
    secondaryMuscles: ['Serratus Anterior', 'Core'],
    illustrationType: 'incline-pushup',
    tips: 'Keep neck neutral by looking at a spot on the bench directly between hands.'
  },
  'strict-floor-push-ups': {
    id: 'strict-floor-push-ups',
    skillTreeId: 'push-up-planche',
    title: 'Strict Floor Push-Ups',
    subtitle: 'Foundation 2 · Full Horizontal Pressing Standard',
    level: 2,
    difficulty: 'Beginner',
    category: 'Push',
    equipment: ['Floor'],
    metricType: 'reps',
    passCriteria: {
      targetReps: 20,
      targetSets: 3,
      restSeconds: 90,
      formStandard: 'Chest touches floor (or 1 inch off floor). Fully lock elbows and push floor away with protraction at top. Zero hip sag.',
      tempo: '2-0-1-1'
    },
    prerequisites: ['incline-push-ups'],
    unlockedSkills: ['diamond-push-ups'],
    description: 'The universal upper-body pushing baseline. Develops fundamental pushing stamina, serratus anterior activation, and anterior chain rigidity.',
    formCues: [
      'Fingers splayed gripping floor',
      'Elbows tracking at 45-degree angle',
      'Hollow body position with posterior pelvic tilt',
      'Full lockout with protraction at peak'
    ],
    commonMistakes: [
      'Piking hips into the air',
      'Dropping belly before chest',
      'Short-stroking without locking out at top'
    ],
    primaryMuscles: ['Pectoralis Major', 'Triceps Brachii', 'Anterior Deltoid'],
    secondaryMuscles: ['Serratus Anterior', 'Rectus Abdominis'],
    illustrationType: 'strict-pushup',
    tips: 'Screw your hands into the floor outward to activate rotator cuff stability.'
  },
  'diamond-push-ups': {
    id: 'diamond-push-ups',
    skillTreeId: 'push-up-planche',
    title: 'Diamond Push-Ups',
    subtitle: 'Level 3 · Tricep & Close-Grip Overload',
    level: 3,
    difficulty: 'Intermediate',
    category: 'Push',
    equipment: ['Floor'],
    metricType: 'reps',
    passCriteria: {
      targetReps: 15,
      targetSets: 3,
      restSeconds: 90,
      formStandard: 'Thumbs and index fingers touching in diamond shape under center of chest. Chest touches hands.',
      tempo: '2-1-1-1'
    },
    prerequisites: ['strict-floor-push-ups'],
    unlockedSkills: ['pseudo-planche-push-ups'],
    description: 'Shifts maximal leverage onto the triceps lateral and medial heads and inner pectorals while challenging wrist stability.',
    formCues: [
      'Form diamond/triangle with index fingers and thumbs',
      'Keep elbows tracking backward rather than flaring sideways',
      'Maintain rock-solid hollow plank',
      'Touch center of chest to diamond window'
    ],
    commonMistakes: [
      'Flaring elbows out to sides',
      'Flaring lower back',
      'Cheating range of motion'
    ],
    primaryMuscles: ['Triceps Brachii (All Heads)', 'Pectoralis Major', 'Anterior Deltoid'],
    secondaryMuscles: ['Core', 'Wrist Flexors'],
    illustrationType: 'diamond-pushup',
    tips: 'If wrists feel tight, slightly separate the hands while keeping palms turned inward.'
  },
  'pseudo-planche-push-ups': {
    id: 'pseudo-planche-push-ups',
    skillTreeId: 'push-up-planche',
    title: 'Pseudo Planche Push-Ups (PPPU)',
    subtitle: 'Level 4 · Straight-Arm Lean & Bicep Tendon Prep',
    level: 4,
    difficulty: 'Intermediate',
    category: 'Push',
    equipment: ['Floor', 'Parallettes'],
    metricType: 'reps',
    passCriteria: {
      targetReps: 10,
      targetSets: 3,
      restSeconds: 120,
      formStandard: 'Hands placed at waist level with deep forward shoulder lean. Maintain forward lean through entire repetition.',
      tempo: '3-1-1-1'
    },
    prerequisites: ['diamond-push-ups'],
    unlockedSkills: ['tuck-planche-hold'],
    description: 'The gateway exercise to planche strength. Shifts the center of mass over the hands, drastically increasing the load on the anterior deltoids and bicep tendons.',
    formCues: [
      'Turn fingers slightly outward (45 degrees) to protect wrists',
      'Lean forward until hands are at waist/hip height',
      'Protract shoulder blades aggressively at top',
      'Push up while maintaining the forward lean without sliding backward'
    ],
    commonMistakes: [
      'Shifting body backward during the press',
      'Losing hollow body and sagging hips',
      'Retracting shoulder blades at top lockout'
    ],
    primaryMuscles: ['Anterior Deltoid', 'Pectoralis Major', 'Biceps Tendon'],
    secondaryMuscles: ['Serratus Anterior', 'Core', 'Forearms'],
    illustrationType: 'pppu',
    tips: 'Place toes against a wall to prevent backward slide and ensure consistent forward lean depth.'
  },
  'tuck-planche-hold': {
    id: 'tuck-planche-hold',
    skillTreeId: 'push-up-planche',
    title: 'Tuck Planche Static Hold',
    subtitle: 'Level 5 · First True Straight-Arm Levitation',
    level: 5,
    difficulty: 'Advanced',
    category: 'Static Hold',
    equipment: ['Parallettes', 'Floor'],
    metricType: 'seconds',
    passCriteria: {
      targetHoldSeconds: 20,
      targetSets: 4,
      restSeconds: 150,
      formStandard: 'Elbows fully locked into extension. Maximum scapular protraction and depression. Knees tucked tight to chest, hips level with shoulders.',
      notes: 'No elbow bend allowed; zero contact with legs or ground.'
    },
    prerequisites: ['pseudo-planche-push-ups'],
    unlockedSkills: ['advanced-tuck-planche'],
    description: 'Lifting the entire body off the ground with straight arms. Demands extraordinary anterior deltoid strength, locked elbows, and scapular protraction.',
    formCues: [
      'Lock elbows completely straight (straight-arm strength)',
      'Push floor away to create dome across upper back (protraction)',
      'Tuck knees tight against chest and elevate hips level with shoulders',
      'Lean forward past wrists until feet float off floor'
    ],
    commonMistakes: [
      'Micro-bending the elbows (turns it into bent-arm hold)',
      'Hips dropping below shoulder level',
      'Retracting shoulder blades (sunken chest)'
    ],
    primaryMuscles: ['Anterior Deltoids', 'Biceps Brachii (Straight Arm)', 'Serratus Anterior'],
    secondaryMuscles: ['Upper Chest', 'Core', 'Wrists'],
    illustrationType: 'tuck-planche',
    tips: 'Parallettes allow deeper wrist leverage and greater height clearance during initial holds.'
  },
  'advanced-tuck-planche': {
    id: 'advanced-tuck-planche',
    skillTreeId: 'push-up-planche',
    title: 'Advanced Tuck Planche',
    subtitle: 'Level 6 · Flattening the Spine',
    level: 6,
    difficulty: 'Advanced',
    category: 'Static Hold',
    equipment: ['Parallettes', 'Floor'],
    metricType: 'seconds',
    passCriteria: {
      targetHoldSeconds: 15,
      targetSets: 4,
      restSeconds: 180,
      formStandard: 'Flat back parallel to ground. Thighs at 90 degrees to torso (knees un-tucked away from chest). Locked straight elbows.',
      notes: 'Shoulder lean must increase noticeably to counterbalance the extended hip lever.'
    },
    prerequisites: ['tuck-planche-hold'],
    unlockedSkills: ['straddle-planche-hold'],
    description: 'By opening the hip angle to 90 degrees and flattening the spine, the center of mass moves further back, demanding significantly more forward shoulder lean.',
    formCues: [
      'Open hips until lower back is completely flat and parallel to floor',
      'Knees point straight down, thighs at 90 degrees to spine',
      'Increase forward lean over hands to balance longer lever',
      'Elbow pits turned forward with locked arms'
    ],
    commonMistakes: [
      'Curved/rounded back (reverting to compact tuck)',
      'Hips sinking lower than shoulders',
      'Bending elbows under load'
    ],
    primaryMuscles: ['Anterior Deltoid', 'Serratus Anterior', 'Lower Back/Glutes'],
    secondaryMuscles: ['Biceps Tendons', 'Forearms', 'Core'],
    illustrationType: 'adv-tuck-planche',
    tips: 'Film your sets from the side profile to ensure your back is truly horizontal.'
  },
  'straddle-planche-hold': {
    id: 'straddle-planche-hold',
    skillTreeId: 'push-up-planche',
    title: 'Straddle Planche Hold',
    subtitle: 'Level 7 · Extended Straight-Leg Leverage',
    level: 7,
    difficulty: 'Elite',
    category: 'Static Hold',
    equipment: ['Parallettes', 'Floor'],
    metricType: 'seconds',
    passCriteria: {
      targetHoldSeconds: 10,
      targetSets: 4,
      restSeconds: 180,
      formStandard: 'Legs locked straight in wide straddle, parallel to floor. Hips aligned with shoulders. Pure locked-arm support.',
      notes: 'No piking at the hips.'
    },
    prerequisites: ['advanced-tuck-planche'],
    unlockedSkills: ['full-planche-hold'],
    description: 'Extending the legs in a wide straddle shortens the lever compared to full planche while requiring immense shoulder torque, hip abductor engagement, and glute squeeze.',
    formCues: [
      'Maximum active straddle with locked knees and pointed toes',
      'Lock glutes to keep pelvis in line with shoulders',
      'Drive heavy forward lean with protraction',
      'Elbows locked 100% straight'
    ],
    commonMistakes: [
      'Piking at hips (hip angle < 180 degrees)',
      'Banana back (too much arching)',
      'Bent arms'
    ],
    primaryMuscles: ['Anterior Deltoids', 'Pectoralis Major', 'Serratus Anterior', 'Glutes'],
    secondaryMuscles: ['Wrist Flexors', 'Abductors', 'Core'],
    illustrationType: 'straddle-planche',
    tips: 'A wider straddle significantly shortens the lever arm, making the balance point easier.'
  },
  'full-planche-hold': {
    id: 'full-planche-hold',
    skillTreeId: 'push-up-planche',
    title: 'Full Planche Static Hold',
    subtitle: 'Level 8 · The Holy Grail of Pushing Strength',
    level: 8,
    difficulty: 'Elite',
    category: 'Static Hold',
    equipment: ['Parallettes', 'Floor'],
    metricType: 'seconds',
    passCriteria: {
      targetHoldSeconds: 8,
      targetSets: 4,
      restSeconds: 240,
      formStandard: 'Body completely straight and parallel to the ground from shoulders to toes with legs together. Locked elbows, full protraction.',
      notes: 'Zero sag, zero piking. Flawless horizontal balance.'
    },
    prerequisites: ['straddle-planche-hold'],
    unlockedSkills: [],
    description: 'The pinnacle gymnastic static skill on floor or parallettes. Holding full bodyweight suspended horizontally with straight arms requires elite-level anterior deltoid and core strength.',
    formCues: [
      'Legs pinned together with pointed toes',
      'Posterior pelvic tilt with glutes and quads clenched',
      'Extreme forward lean past wrist line',
      'Upper back protracted with locked elbow joints'
    ],
    commonMistakes: [
      'Hips higher or lower than shoulder line',
      'Any bend in the elbows',
      'Losing straight-line body tension'
    ],
    primaryMuscles: ['Anterior Deltoids', 'Pectoralis Major', 'Serratus Anterior', 'Full Posterior Chain'],
    secondaryMuscles: ['Biceps Brachii', 'Forearms', 'Spinal Erectors'],
    illustrationType: 'full-planche',
    tips: 'Master band-assisted full planche holds to condition the exact nervous system neuromuscular pathways.'
  },

  // DIPS PROGRESSION
  'bench-dips': {
    id: 'bench-dips',
    skillTreeId: 'dips-progression',
    title: 'Bench / Box Dips',
    subtitle: 'Foundation 1 · Shoulder Extension Mobility',
    level: 1,
    difficulty: 'Beginner',
    category: 'Dip',
    equipment: ['Bench', 'Box'],
    metricType: 'reps',
    passCriteria: {
      targetReps: 20,
      targetSets: 3,
      restSeconds: 60,
      formStandard: 'Hands behind back on bench edge. Lower until elbows reach 90 degrees. Full lockout at top.',
      tempo: '2-0-1-1'
    },
    prerequisites: [],
    unlockedSkills: ['parallel-bar-support-hold'],
    description: 'Introduces vertical shoulder extension and tricep pressing under partial bodyweight.',
    formCues: [
      'Keep back close to the bench edge throughout movement',
      'Lower under control to 90 degrees at elbows',
      'Press through heels of palms to complete extension',
      'Depress shoulders down away from ears at top'
    ],
    commonMistakes: [
      'Flaring shoulders forward into anterior impingement',
      'Drifting hips far away from bench',
      'Shrugging neck at bottom'
    ],
    primaryMuscles: ['Triceps Brachii', 'Anterior Deltoid'],
    secondaryMuscles: ['Pectoralis Major', 'Lower Traps'],
    illustrationType: 'bench-dip',
    tips: 'Elevate feet on another bench to incrementally increase load before moving to parallel bars.'
  },
  'parallel-bar-support-hold': {
    id: 'parallel-bar-support-hold',
    skillTreeId: 'dips-progression',
    title: 'Parallel Bar Support Hold',
    subtitle: 'Foundation 2 · Scapular Depression Mastery',
    level: 2,
    difficulty: 'Beginner',
    category: 'Dip',
    equipment: ['Parallel Bars'],
    metricType: 'seconds',
    passCriteria: {
      targetHoldSeconds: 45,
      targetSets: 3,
      restSeconds: 90,
      formStandard: 'Arms locked straight on parallel bars. Shoulders depressed down away from ears (long neck). Hollow bodyline.',
      notes: 'No bending at elbows or collapsing in shoulders.'
    },
    prerequisites: ['bench-dips'],
    unlockedSkills: ['negative-parallel-dips'],
    description: 'Conditions the pectoral tendons, triceps tendon insertions, and lower trapezius to support 100% of bodyweight in straight-arm lockout.',
    formCues: [
      'Push bars down to create maximum distance between shoulders and ears',
      'Keep elbows locked straight without trembling',
      'Tuck pelvis and squeeze glutes',
      'Breathe steadily into diaphragm'
    ],
    commonMistakes: [
      'Shrugging shoulders into ears',
      'Soft/bent elbows',
      'Swinging legs'
    ],
    primaryMuscles: ['Lower Trapezius', 'Pectoralis Minor', 'Triceps'],
    secondaryMuscles: ['Core', 'Forearms'],
    illustrationType: 'pbar-support',
    tips: 'Think about pushing the floor through the parallel bars.'
  },
  'negative-parallel-dips': {
    id: 'negative-parallel-dips',
    skillTreeId: 'dips-progression',
    title: 'Eccentric Negative Dips',
    subtitle: 'Foundation 3 · Deep Range Strength Building',
    level: 3,
    difficulty: 'Beginner',
    category: 'Dip',
    equipment: ['Parallel Bars'],
    metricType: 'reps',
    passCriteria: {
      targetReps: 6,
      targetSets: 3,
      restSeconds: 120,
      formStandard: 'Jump to top support. Lower slowly over 5-6 seconds to below 90-degree elbow depth before stepping off.',
      tempo: '6-0-1-0'
    },
    prerequisites: ['parallel-bar-support-hold'],
    unlockedSkills: ['strict-parallel-dips'],
    description: 'Prepares the chest and shoulders for full-depth dips through controlled eccentric loading.',
    formCues: [
      'Start in locked support hold',
      'Lean slightly forward as you lower',
      'Controlled 5+ second descent down past 90 degrees',
      'Step down onto box and reset at top'
    ],
    commonMistakes: [
      'Freefalling in the bottom half',
      'Shoulders rounding forward excessively',
      'Lack of full descent depth'
    ],
    primaryMuscles: ['Triceps Brachii', 'Lower Pectoralis Major', 'Anterior Deltoids'],
    secondaryMuscles: ['Serratus', 'Core'],
    illustrationType: 'negative-dip',
    tips: 'Ensure your chest leads slightly ahead of your hands for optimal shoulder mechanics.'
  },
  'strict-parallel-dips': {
    id: 'strict-parallel-dips',
    skillTreeId: 'dips-progression',
    title: 'Strict Parallel Bar Dips',
    subtitle: 'Level 4 · The Standard Bodyweight Dip',
    level: 4,
    difficulty: 'Intermediate',
    category: 'Dip',
    equipment: ['Parallel Bars'],
    metricType: 'reps',
    passCriteria: {
      targetReps: 15,
      targetSets: 3,
      restSeconds: 120,
      formStandard: 'Break 90 degrees at bottom (biceps touch forearms). Press to full lockout with shoulders depressed at top.',
      tempo: '2-1-1-1'
    },
    prerequisites: ['negative-parallel-dips'],
    unlockedSkills: ['straight-bar-dips', 'strict-ring-dips'],
    description: 'The foundational benchmark of upper body pushing power, targeting the lower chest, anterior delts, and triceps with full bodyweight.',
    formCues: [
      'Slight forward torso lean (approx 15-20 degrees)',
      'Descend until shoulder joint is below elbow joint',
      'Drive aggressively upward without kicking legs',
      'Lock out elbows and depress scapulae at top'
    ],
    commonMistakes: [
      'Cutting depth short above 90 degrees',
      'Flaring elbows out excessively wide',
      'Kicking knees up on the ascent'
    ],
    primaryMuscles: ['Pectoralis Major (Sternal Head)', 'Triceps Brachii', 'Anterior Deltoid'],
    secondaryMuscles: ['Lower Trapezius', 'Rhomboids', 'Core'],
    illustrationType: 'strict-dip',
    tips: 'Keep your gaze focused 4-5 feet ahead on the floor to maintain neutral cervical alignment.'
  },
  'straight-bar-dips': {
    id: 'straight-bar-dips',
    skillTreeId: 'dips-progression',
    title: 'Straight Bar Dips',
    subtitle: 'Level 5 · Muscle-Up Dip Integration',
    level: 5,
    difficulty: 'Intermediate',
    category: 'Dip',
    equipment: ['Single Pull-up / Straight Bar'],
    metricType: 'reps',
    passCriteria: {
      targetReps: 10,
      targetSets: 3,
      restSeconds: 120,
      formStandard: 'Both hands on single bar in front of chest. Lower until lower chest touches the bar. Press back to lockout.',
      tempo: '2-0-1-1'
    },
    prerequisites: ['strict-parallel-dips'],
    unlockedSkills: ['strict-ring-dips'],
    description: 'Demands leaning forward over a single horizontal bar while navigating your torso around it. Essential for finishing the top half of a Bar Muscle-Up.',
    formCues: [
      'Grip bar with thumbs around or over',
      'Lean chest forward and bring legs slightly forward to counterbalance',
      'Touch lower chest/sternum to the bar at the bottom',
      'Push up until arms are fully locked out'
    ],
    commonMistakes: [
      'Resting chest on the bar',
      'Uneven pushing (one side pushing faster)',
      'Incomplete lockout'
    ],
    primaryMuscles: ['Lower Pectorals', 'Triceps', 'Anterior Deltoids'],
    secondaryMuscles: ['Core', 'Forearms'],
    illustrationType: 'straight-bar-dip',
    tips: 'Keeping your feet together slightly in front of the bar creates an ideal hollow counterweight.'
  },
  'strict-ring-dips': {
    id: 'strict-ring-dips',
    skillTreeId: 'dips-progression',
    title: 'Gymnastic Ring Dips',
    subtitle: 'Level 6 · Unstable Dynamic Pressing',
    level: 6,
    difficulty: 'Advanced',
    category: 'Dip',
    equipment: ['Gymnastic Rings'],
    metricType: 'reps',
    passCriteria: {
      targetReps: 10,
      targetSets: 3,
      restSeconds: 150,
      formStandard: 'Rings kept stable without shaking. Full depth (biceps touch ring straps). Full lockout at top with rings parallel.',
      tempo: '2-1-1-1'
    },
    prerequisites: ['strict-parallel-dips'],
    unlockedSkills: ['ring-dips-rto'],
    description: 'The free multidirectional movement of gymnastic rings removes all structural bar stabilization, forcing the rotator cuff, chest, and serratus to work overtime.',
    formCues: [
      'Keep rings pinned close to body throughout',
      'Lower deep until ring tops touch armpits/shoulders',
      'Drive straight up to locked support',
      'Maintain calm body tension to prevent ring wobble'
    ],
    commonMistakes: [
      'Letting rings drift away from the torso',
      'Severe shaking indicating stabilizer fatigue',
      'Incomplete range at bottom or top'
    ],
    primaryMuscles: ['Pectoralis Major', 'Triceps', 'Rotator Cuff (Supraspinatus/Infraspinatus)'],
    secondaryMuscles: ['Serratus Anterior', 'Core', 'Lats'],
    illustrationType: 'ring-dip',
    tips: 'Practice holding a static ring support for 30s before initiating dynamic ring dip reps.'
  },
  'ring-dips-rto': {
    id: 'ring-dips-rto',
    skillTreeId: 'dips-progression',
    title: 'Ring Dips with RTO (Rings Turned Out)',
    subtitle: 'Level 7 · Elite Gymnastic Standard',
    level: 7,
    difficulty: 'Elite',
    category: 'Dip',
    equipment: ['Gymnastic Rings'],
    metricType: 'reps',
    passCriteria: {
      targetReps: 8,
      targetSets: 3,
      restSeconds: 180,
      formStandard: 'At top of every rep, rotate rings outward 45-90 degrees with locked elbows and long neck for 1-second pause.',
      tempo: '2-1-1-2'
    },
    prerequisites: ['strict-ring-dips'],
    unlockedSkills: [],
    description: 'Turning the rings outward at the top of the dip completely isolates the bicep tendon, triceps lockout, and chest in extreme external rotation.',
    formCues: [
      'Turn rings 45 to 90 degrees outward at top lockout',
      'Show the thumbs pointing outwards away from body',
      'Hollow body posture with pointed toes',
      'Controlled descent back to deep neutral ring dip'
    ],
    commonMistakes: [
      'Turning rings out with soft, unlocked elbows',
      'Shrugging shoulders upward during RTO',
      'Rushing the lockout pause'
    ],
    primaryMuscles: ['Pectoralis Major', 'Triceps Brachii', 'Biceps Brachii (Distal Tendon)'],
    secondaryMuscles: ['Serratus', 'Lower Traps', 'Forearms'],
    illustrationType: 'ring-dip-rto',
    tips: 'Start with small 30-degree turnouts before progressing to full 90-degree RTO lockouts.'
  },

  // HANDSTAND & HSPU
  'elevated-pike-push-ups': {
    id: 'elevated-pike-push-ups',
    skillTreeId: 'handstand-hspu',
    title: 'Feet-Elevated Pike Push-Ups',
    subtitle: 'Foundation 1 · Overhead Pressing Mechanics',
    level: 1,
    difficulty: 'Beginner',
    category: 'Handstand',
    equipment: ['Box / Chair', 'Floor'],
    metricType: 'reps',
    passCriteria: {
      targetReps: 12,
      targetSets: 3,
      restSeconds: 90,
      formStandard: 'Feet on box, hips stacked directly over shoulders. Head travels forward to create tripod shape with hands. Lock out into pike at top.',
      tempo: '2-0-1-1'
    },
    prerequisites: [],
    unlockedSkills: ['wall-handstand-chest-to-wall'],
    description: 'Translates horizontal push-up mechanics into vertical overhead pressing by elevating the hips and shifting load directly onto the shoulders.',
    formCues: [
      'Stack hips vertically over hands with straight legs',
      'Head descends forward forming the top point of a tripod with hands',
      'Push back up and press head through arms to complete overhead line'
    ],
    commonMistakes: [
      'Flaring elbows out laterally',
      'Head dropping straight down between hands instead of forward',
      'Hips shifting backward away from vertical'
    ],
    primaryMuscles: ['Anterior & Medial Deltoids', 'Triceps', 'Upper Trapezius'],
    secondaryMuscles: ['Serratus Anterior', 'Core', 'Hamstrings'],
    illustrationType: 'elevated-pike',
    tips: 'Look at your toes or shins at the top of the rep to ensure head pushes through the shoulder window.'
  },
  'wall-handstand-chest-to-wall': {
    id: 'wall-handstand-chest-to-wall',
    skillTreeId: 'handstand-hspu',
    title: 'Chest-to-Wall Handstand Hold',
    subtitle: 'Foundation 2 · Perfect Line & Overhead Stacking',
    level: 2,
    difficulty: 'Intermediate',
    category: 'Handstand',
    equipment: ['Wall'],
    metricType: 'seconds',
    passCriteria: {
      targetHoldSeconds: 60,
      targetSets: 3,
      restSeconds: 120,
      formStandard: 'Hands 4-6 inches from wall. Nose, chest, and toes touching wall. Completely straight hollow body without arching.',
      notes: 'No banana back; shoulders actively elevated into ears.'
    },
    prerequisites: ['elevated-pike-push-ups'],
    unlockedSkills: ['freestanding-handstand-hold', 'wall-handstand-push-ups'],
    description: 'Chest-to-wall enforces ideal hollow body gymnastics alignment, eliminating the lumbar arch common in back-to-wall handstands.',
    formCues: [
      'Walk feet up wall until hands are close (4-6 in)',
      'Push the floor away: elevate shoulders toward ears',
      'Squeeze glutes and tuck pelvis (posterior tilt)',
      'Grip floor actively with fingertips like clawing'
    ],
    commonMistakes: [
      'Back-to-wall arched banana alignment',
      'Relaxing shoulders and sinking into joints',
      'Holding breath'
    ],
    primaryMuscles: ['Deltoids (All Heads)', 'Upper Trapezius', 'Core (Transverse Abdominis)'],
    secondaryMuscles: ['Forearm Flexors', 'Serratus Anterior', 'Glutes'],
    illustrationType: 'wall-handstand',
    tips: 'Breathe smoothly in shallow rhythmic cycles while keeping the ribcage down.'
  },
  'freestanding-handstand-hold': {
    id: 'freestanding-handstand-hold',
    skillTreeId: 'handstand-hspu',
    title: 'Freestanding Handstand Hold',
    subtitle: 'Level 3 · Balance, Micro-Adjustments & Spatial Mastery',
    level: 3,
    difficulty: 'Intermediate',
    category: 'Handstand',
    equipment: ['Floor', 'Parallettes (optional)'],
    metricType: 'seconds',
    passCriteria: {
      targetHoldSeconds: 30,
      targetSets: 3,
      restSeconds: 120,
      formStandard: 'Freestanding without stepping or wall support. Straight line from wrists through shoulders, hips, and ankles for 30s.',
      notes: 'Balance controlled predominantly through fingertip pressure and heel of palm.'
    },
    prerequisites: ['wall-handstand-chest-to-wall'],
    unlockedSkills: ['freestanding-handstand-push-up'],
    description: 'The master balance skill. Involves constant micro-corrections using the "wrist camber" technique—fingertip pressing when falling over, palm pressure when under-balancing.',
    formCues: [
      'Kick up with control into stacked alignment',
      'Fingers splayed with knuckles slightly arched (clawing floor)',
      'Stack wrists, shoulders, hips, and ankles in one vertical plumb line',
      'Lock knees with toes pointed straight up'
    ],
    commonMistakes: [
      'Over-kicking and peeling out of control',
      'Arching lower back instead of opening shoulders',
      'Bending knees to counter balance'
    ],
    primaryMuscles: ['Deltoids', 'Trapezius', 'Wrist Flexors/Extensors', 'Core'],
    secondaryMuscles: ['Glutes', 'Serratus Anterior'],
    illustrationType: 'freestanding-handstand',
    tips: 'If you feel yourself falling forward, press hard into your fingertips. If falling back, push into the heel of your palms.'
  },
  'wall-handstand-push-ups': {
    id: 'wall-handstand-push-ups',
    skillTreeId: 'handstand-hspu',
    title: 'Wall Handstand Push-Ups (Chest-to-Wall / Full ROM)',
    subtitle: 'Level 4 · True Vertical Strength',
    level: 4,
    difficulty: 'Advanced',
    category: 'Handstand',
    equipment: ['Wall', 'Parallettes / Floor'],
    metricType: 'reps',
    passCriteria: {
      targetReps: 8,
      targetSets: 3,
      restSeconds: 150,
      formStandard: 'Head touches floor/mat forward of hands (tripod). Press up to complete shoulder elevation and elbow lockout at top against wall.',
      tempo: '2-1-1-1'
    },
    prerequisites: ['wall-handstand-chest-to-wall'],
    unlockedSkills: ['freestanding-handstand-push-up'],
    description: 'Develops pure raw overhead pressing power equivalent to pressing nearly 100% of bodyweight overhead in an inverted plane.',
    formCues: [
      'Set hands 6-10 inches from wall',
      'Descend with elbows tracking forward (not flared out)',
      'Head touches ground slightly in front of hand line',
      'Explode upward and push head through at top lockout'
    ],
    commonMistakes: [
      'Flaring elbows out sideways (causes shoulder impingement)',
      'Bouncing head off the floor',
      'Severe arching into the wall'
    ],
    primaryMuscles: ['Anterior Deltoids', 'Triceps Brachii', 'Upper Trapezius'],
    secondaryMuscles: ['Pectoralis Clavicular Head', 'Core', 'Serratus'],
    illustrationType: 'wall-hspu',
    tips: 'Use parallettes or elevated blocks to achieve a deficit for full range of motion past hand level.'
  },
  'freestanding-handstand-push-up': {
    id: 'freestanding-handstand-push-up',
    skillTreeId: 'handstand-hspu',
    title: 'Freestanding Handstand Push-Up',
    subtitle: 'Level 5 · Synthesis of Balance & Raw Power',
    level: 5,
    difficulty: 'Elite',
    category: 'Handstand',
    equipment: ['Floor', 'Parallettes'],
    metricType: 'reps',
    passCriteria: {
      targetReps: 5,
      targetSets: 3,
      restSeconds: 180,
      formStandard: 'Start in freestanding handstand. Lower under control to head touch (or shoulder depth on parallettes). Press back up to freestanding lockout without touching floor with feet.',
      tempo: 'Strict'
    },
    prerequisites: ['freestanding-handstand-hold', 'wall-handstand-push-ups'],
    unlockedSkills: ['90-degree-push-up'],
    description: 'Requires executing a full vertical bodyweight press while continuously maintaining rotational balance and dynamic center-of-mass corrections.',
    formCues: [
      'Kick up into stable handstand balance first',
      'Slow controlled descent while slightly shifting shoulders forward to counterbalance legs',
      'Press explosively through palms and snap hips back over hands at lockout',
      'Regain straight vertical stacked line at the top'
    ],
    commonMistakes: [
      'Rushing the descent and losing balance at the bottom',
      'Kicking legs out of alignment to generate momentum',
      'Flaring elbows'
    ],
    primaryMuscles: ['Anterior Deltoids', 'Triceps Brachii', 'Trapezius', 'Core Stabilizers'],
    secondaryMuscles: ['Forearms', 'Pectorals', 'Glutes'],
    illustrationType: 'freestanding-hspu',
    tips: 'Perform these on low parallettes to allow a more natural neutral wrist angle and greater tripod balance surface.'
  },
  '90-degree-push-up': {
    id: '90-degree-push-up',
    skillTreeId: 'handstand-hspu',
    title: '90-Degree Push-Up (Hollowback Press)',
    subtitle: 'Level 6 · The Ultimate Calisthenics Pushing Feat',
    level: 6,
    difficulty: 'Elite',
    category: 'Handstand',
    equipment: ['Floor', 'Parallettes'],
    metricType: 'reps',
    passCriteria: {
      targetReps: 2,
      targetSets: 3,
      restSeconds: 240,
      formStandard: 'From handstand, lower body horizontally into bent-arm planche (shoulders 90 degrees), then press back up into freestanding handstand with locked arms.',
      tempo: 'Strict'
    },
    prerequisites: ['freestanding-handstand-push-up'],
    unlockedSkills: [],
    description: 'A mind-bending combination of handstand push-up, bent-arm planche, and horizontal-to-vertical lever press.',
    formCues: [
      'From handstand, hinge shoulders forward as body lowers into horizontal plane',
      'Hold bent-arm planche momentarily with straight legs',
      'Press diagonally backward and upward while elevating hips into handstand',
      'Finish in clean vertical lockout'
    ],
    commonMistakes: [
      'Dropping feet below horizontal',
      'Kipping or arching uncontrollably',
      'Incomplete ascent to handstand'
    ],
    primaryMuscles: ['Anterior Deltoids', 'Triceps', 'Pectorals', 'Posterior Chain'],
    secondaryMuscles: ['Core', 'Upper/Lower Back', 'Wrists'],
    illustrationType: 'ninety-degree-pushup',
    tips: 'Break down the movement into eccentric lowers from handstand to bent planche before attempting the concentric press.'
  },

  // FRONT LEVER
  'active-hang-dragon-flag': {
    id: 'active-hang-dragon-flag',
    skillTreeId: 'front-lever-progression',
    title: 'Dragon Flags & Active Hang',
    subtitle: 'Foundation 1 · Core Lever Tension & Lat Engagement',
    level: 1,
    difficulty: 'Beginner',
    category: 'Static Hold',
    equipment: ['Bench / Bar'],
    metricType: 'reps',
    passCriteria: {
      targetReps: 8,
      targetSets: 3,
      restSeconds: 90,
      formStandard: 'Body rigid from shoulders to toes. Lower to 2 inches off bench and raise back up purely pivoting on upper back/shoulders.',
      tempo: '3-1-1-1'
    },
    prerequisites: [],
    unlockedSkills: ['tuck-front-lever-hold'],
    description: ' popularized by Bruce Lee, the dragon flag builds the intense straight-body abdominal lever strength and lat engagement required for levers.',
    formCues: [
      'Grip bench firmly behind head',
      'Pivot strictly from upper traps/scapulae',
      'Maintain continuous straight line from chest to toes',
      'Do not bend at the hips'
    ],
    commonMistakes: [
      'Bending at hips (hip flexion)',
      'Resting hips on bench during movement',
      'Using neck to pull'
    ],
    primaryMuscles: ['Rectus Abdominis', 'Latissimus Dorsi', 'Hip Flexors'],
    secondaryMuscles: ['Glutes', 'Triceps Long Head', 'Spinal Erectors'],
    illustrationType: 'dragon-flag',
    tips: 'Think about pushing the bench away from you with your hands while keeping your glutes squeezed.'
  },
  'tuck-front-lever-hold': {
    id: 'tuck-front-lever-hold',
    skillTreeId: 'front-lever-progression',
    title: 'Tuck Front Lever Static Hold',
    subtitle: 'Foundation 2 · Straight-Arm Horizontal Pulling',
    level: 2,
    difficulty: 'Intermediate',
    category: 'Static Hold',
    equipment: ['Pull-up Bar', 'Gymnastic Rings'],
    metricType: 'seconds',
    passCriteria: {
      targetHoldSeconds: 25,
      targetSets: 4,
      restSeconds: 120,
      formStandard: 'Arms locked straight. Scapulae retracted and depressed. Back completely horizontal parallel to ground with knees tucked to chest.',
      notes: 'No bending at elbows; torso must be horizontal, not angled.'
    },
    prerequisites: ['active-hang-dragon-flag'],
    unlockedSkills: ['advanced-tuck-front-lever'],
    description: 'First straight-arm horizontal lever progression. Teaches full lat engagement, straight elbow stability, and scapular retraction under horizontal load.',
    formCues: [
      'Lock elbows 100% straight',
      'Pull down on the bar as if performing a straight-arm pulldown',
      'Retract and depress shoulder blades',
      'Bring torso completely horizontal to the floor'
    ],
    commonMistakes: [
      'Bending elbows to compensate for lat weakness',
      'Hips sinking below shoulder level',
      'Protracted rounded upper back'
    ],
    primaryMuscles: ['Latissimus Dorsi', 'Teres Major', 'Rhomboids', 'Rear Deltoids'],
    secondaryMuscles: ['Rectus Abdominis', 'Triceps Long Head', 'Forearms'],
    illustrationType: 'tuck-front-lever',
    tips: 'Think about pushing the bar down to your thighs rather than lifting your body up.'
  },
  'advanced-tuck-front-lever': {
    id: 'advanced-tuck-front-lever',
    skillTreeId: 'front-lever-progression',
    title: 'Advanced Tuck Front Lever',
    subtitle: 'Level 3 · 90-Degree Hip Angle Flat Back',
    level: 3,
    difficulty: 'Advanced',
    category: 'Static Hold',
    equipment: ['Pull-up Bar', 'Gymnastic Rings'],
    metricType: 'seconds',
    passCriteria: {
      targetHoldSeconds: 20,
      targetSets: 4,
      restSeconds: 150,
      formStandard: 'Thighs at 90 degrees to torso. Back completely flat and horizontal to floor. Locked elbows, strong scapular retraction.',
      notes: 'Torso and back must form a flat table parallel to the ground.'
    },
    prerequisites: ['tuck-front-lever-hold'],
    unlockedSkills: ['single-leg-front-lever', 'straddle-front-lever'],
    description: 'Opening the hips to 90 degrees increases the lever length significantly, placing high demands on the latissimus dorsi and posterior core.',
    formCues: [
      'Un-tuck knees until thighs form 90 degrees with flat spine',
      'Lock elbows and squeeze lats hard',
      'Keep shoulders and hips in the exact same horizontal plane',
      'Breathe into upper chest'
    ],
    commonMistakes: [
      'Back rounding upward into compact tuck',
      'Sagging hips',
      'Elbows bending slightly'
    ],
    primaryMuscles: ['Latissimus Dorsi', 'Rhomboids', 'Teres Major', 'Posterior Deltoids'],
    secondaryMuscles: ['Abdominals', 'Glutes', 'Biceps/Forearms'],
    illustrationType: 'adv-tuck-front-lever',
    tips: 'Use resistance bands around the hips to groove the flat back position if you find your spine rounding.'
  },
  'single-leg-front-lever': {
    id: 'single-leg-front-lever',
    skillTreeId: 'front-lever-progression',
    title: 'Single-Leg Front Lever Hold',
    subtitle: 'Level 4 · Asymmetric Long Lever Overload',
    level: 4,
    difficulty: 'Advanced',
    category: 'Static Hold',
    equipment: ['Pull-up Bar', 'Gymnastic Rings'],
    metricType: 'seconds',
    passCriteria: {
      targetHoldSeconds: 15,
      targetSets: 4,
      restSeconds: 150,
      formStandard: 'One leg extended straight in line with torso; other leg tucked. Complete horizontal alignment. Perform on both sides.',
      notes: 'Hips must remain square without twisting sideways.'
    },
    prerequisites: ['advanced-tuck-front-lever'],
    unlockedSkills: ['straddle-front-lever'],
    description: 'Extending one leg lengthens the lever arm to ~80% of full front lever difficulty while allowing manageable incremental progression.',
    formCues: [
      'Extend one leg completely with pointed toe',
      'Keep other knee tucked at 90 degrees',
      'Keep hips square and level to the floor',
      'Maintain aggressive lat pull down on the bar'
    ],
    commonMistakes: [
      'Twisting the pelvis toward the tucked side',
      'Dropping the extended leg below horizontal',
      'Bent arms'
    ],
    primaryMuscles: ['Latissimus Dorsi', 'Posterior Chain', 'Obliques'],
    secondaryMuscles: ['Rear Delts', 'Rhomboids', 'Forearms'],
    illustrationType: 'single-leg-front-lever',
    tips: 'Switch leading legs every set to ensure balanced bilateral development.'
  },
  'straddle-front-lever': {
    id: 'straddle-front-lever',
    skillTreeId: 'front-lever-progression',
    title: 'Straddle Front Lever Hold',
    subtitle: 'Level 5 · Wide-Leg Horizontal Suspension',
    level: 5,
    difficulty: 'Advanced',
    category: 'Static Hold',
    equipment: ['Pull-up Bar', 'Gymnastic Rings'],
    metricType: 'seconds',
    passCriteria: {
      targetHoldSeconds: 12,
      targetSets: 4,
      restSeconds: 180,
      formStandard: 'Legs locked straight in wide straddle, body in single horizontal line from shoulders to toes. Locked elbows.',
      notes: 'No piking at hips.'
    },
    prerequisites: ['single-leg-front-lever'],
    unlockedSkills: ['full-front-lever-hold'],
    description: 'The wide straddle brings the center of mass closer to the shoulders while keeping both knees locked straight, serving as the final stepping stone.',
    formCues: [
      'Wide straddle with locked knees and pointed toes',
      'Squeeze glutes to prevent hip sagging or piking',
      'Lock elbows and pull bar into hips with lats',
      'Head in neutral or slight chin tuck'
    ],
    commonMistakes: [
      'Piking at hips (hips bent forward)',
      'Hips dropping lower than shoulders',
      'Bent elbows'
    ],
    primaryMuscles: ['Latissimus Dorsi', 'Teres Major', 'Rhomboids', 'Posterior Chain'],
    secondaryMuscles: ['Abductors', 'Core', 'Forearms'],
    illustrationType: 'straddle-front-lever',
    tips: 'Active middle splits mobility allows a wider straddle, which mechanically makes the hold easier.'
  },
  'full-front-lever-hold': {
    id: 'full-front-lever-hold',
    skillTreeId: 'front-lever-progression',
    title: 'Full Front Lever Static Hold',
    subtitle: 'Level 6 · Complete Gravity Defiance',
    level: 6,
    difficulty: 'Elite',
    category: 'Static Hold',
    equipment: ['Pull-up Bar', 'Gymnastic Rings'],
    metricType: 'seconds',
    passCriteria: {
      targetHoldSeconds: 10,
      targetSets: 4,
      restSeconds: 180,
      formStandard: 'Body straight like a wooden board from shoulders to heels, completely horizontal to ground. Legs together, locked elbows.',
      notes: 'Zero sag, zero piking, zero elbow bend.'
    },
    prerequisites: ['straddle-front-lever'],
    unlockedSkills: ['front-lever-pull-ups'],
    description: 'The iconic calisthenics static pull. Demands maximum straight-arm lat power, scapular retraction, and posterior chain tension to suspend bodyweight horizontally.',
    formCues: [
      'Ankles pinned together with pointed toes',
      'Squeeze glutes, quads, and lower back to create rigid rod',
      'Pull bar down with straight arms with intense lat torque',
      'Hold horizontal plane precisely'
    ],
    commonMistakes: [
      'Piking at the hips',
      'Banana arch with drooping hips',
      'Micro-bent elbows'
    ],
    primaryMuscles: ['Latissimus Dorsi', 'Teres Major', 'Rhomboids', 'Posterior Chain'],
    secondaryMuscles: ['Full Abdominal Wall', 'Triceps Long Head', 'Forearms'],
    illustrationType: 'full-front-lever',
    tips: 'Focus on pulling your chest upward toward the ceiling while pressing your hands straight down.'
  },
  'front-lever-pull-ups': {
    id: 'front-lever-pull-ups',
    skillTreeId: 'front-lever-progression',
    title: 'Front Lever Pull-Ups (Row to Bar)',
    subtitle: 'Level 7 · Dynamic Horizontal Power',
    level: 7,
    difficulty: 'Elite',
    category: 'Static Hold',
    equipment: ['Pull-up Bar', 'Gymnastic Rings'],
    metricType: 'reps',
    passCriteria: {
      targetReps: 5,
      targetSets: 3,
      restSeconds: 210,
      formStandard: 'From full front lever, pull body up until bar/rings touch waist/navel while maintaining horizontal plane throughout.',
      tempo: 'Strict'
    },
    prerequisites: ['full-front-lever-hold'],
    unlockedSkills: [],
    description: 'Combines the maximum leverage of the full front lever with a dynamic horizontal rowing concentric contraction to touch the bar.',
    formCues: [
      'Start in solid horizontal full front lever',
      'Row elbows back and pull bar to touch waistline',
      'Do not allow hips to drop during the pull',
      'Control descent back into horizontal lever'
    ],
    commonMistakes: [
      'Hips dropping down into a diagonal angle during the pull',
      'Bending knees to shorten lever',
      'Kipping momentum'
    ],
    primaryMuscles: ['Latissimus Dorsi', 'Biceps', 'Rhomboids', 'Posterior Delts'],
    secondaryMuscles: ['Core', 'Glutes', 'Forearms'],
    illustrationType: 'front-lever-pullup',
    tips: 'Practice touch repetitions in advanced tuck before advancing to full straight-leg reps.'
  },

  // L-SIT, V-SIT, MANNA
  'seated-pike-leg-lifts': {
    id: 'seated-pike-leg-lifts',
    skillTreeId: 'l-sit-v-sit-manna',
    title: 'Seated Pike Compression Leg Lifts',
    subtitle: 'Foundation 1 · Active Hip Flexor Compression',
    level: 1,
    difficulty: 'Beginner',
    category: 'Core',
    equipment: ['Floor'],
    metricType: 'reps',
    passCriteria: {
      targetReps: 15,
      targetSets: 3,
      restSeconds: 60,
      formStandard: 'Sit with legs straight out front. Hands placed forward past knees. Lift both legs off floor together without leaning backward.',
      tempo: '1-1-1-1'
    },
    prerequisites: [],
    unlockedSkills: ['tuck-l-sit-support'],
    description: 'Builds the crucial active flexibility and hip flexor compression strength necessary to hold your legs up without cramping.',
    formCues: [
      'Sit tall with knees locked and toes pointed',
      'Place hands on floor as far forward past knees as possible',
      'Lean chest forward and lift heels off floor',
      'Pause 1s at top of each repetition'
    ],
    commonMistakes: [
      'Leaning torso backward to cheat leg height',
      'Bending knees',
      'Hands placed behind hips'
    ],
    primaryMuscles: ['Iliopsoas', 'Rectus Femoris', 'Lower Abdominals'],
    secondaryMuscles: ['Quadriceps', 'Serratus Anterior'],
    illustrationType: 'pike-lifts',
    tips: 'Moving your hands further toward your ankles exponentially increases the compression load.'
  },
  'tuck-l-sit-support': {
    id: 'tuck-l-sit-support',
    skillTreeId: 'l-sit-v-sit-manna',
    title: 'Tuck L-Sit Support Hold',
    subtitle: 'Foundation 2 · Scapular Depression & Tuck Support',
    level: 2,
    difficulty: 'Beginner',
    category: 'Core',
    equipment: ['Parallettes', 'Floor'],
    metricType: 'seconds',
    passCriteria: {
      targetHoldSeconds: 30,
      targetSets: 3,
      restSeconds: 90,
      formStandard: 'Hands on floor/parallettes. Arms straight, shoulders depressed down. Knees tucked to chest with hips elevated off floor.',
      notes: 'No feet touching ground.'
    },
    prerequisites: ['seated-pike-leg-lifts'],
    unlockedSkills: ['full-l-sit-hold'],
    description: 'Combines straight-arm scapular depression with abdominal tuck compression to suspend the entire body off the floor.',
    formCues: [
      'Push floor away with locked elbows to create height',
      'Tuck knees tight to chest',
      'Lift hips slightly forward between hands',
      'Keep shoulders depressed away from ears'
    ],
    commonMistakes: [
      'Shrugging shoulders into neck',
      'Bending elbows',
      'Feet scraping floor'
    ],
    primaryMuscles: ['Lower Trapezius', 'Rectus Abdominis', 'Iliopsoas'],
    secondaryMuscles: ['Triceps', 'Forearms', 'Pectoralis Minor'],
    illustrationType: 'tuck-l-sit',
    tips: 'Perform on floor once you can hold 30s on parallettes to master pure ground clearance.'
  },
  'full-l-sit-hold': {
    id: 'full-l-sit-hold',
    skillTreeId: 'l-sit-v-sit-manna',
    title: 'Full L-Sit Static Hold (Floor / Parallettes)',
    subtitle: 'Level 3 · The 90-Degree Benchmark',
    level: 3,
    difficulty: 'Intermediate',
    category: 'Core',
    equipment: ['Floor', 'Parallettes'],
    metricType: 'seconds',
    passCriteria: {
      targetHoldSeconds: 20,
      targetSets: 3,
      restSeconds: 90,
      formStandard: 'On flat floor. Palms flat, elbows locked. Legs locked straight parallel to ground at 90 degrees with toes pointed.',
      notes: 'Zero butt or heel touching floor.'
    },
    prerequisites: ['tuck-l-sit-support'],
    unlockedSkills: ['straddle-l-sit-hold', 'v-sit-hold'],
    description: 'The golden standard of calisthenics core strength. Requires scapular depression, tricep lockout, active hamstring flexibility, and quadriceps clamping.',
    formCues: [
      'Push palms flat through floor to elevate hips and shoulders',
      'Extend legs straight out with quad lock and pointed toes',
      'Maintain crisp 90-degree angle between torso and legs',
      'Keep neck long and gaze forward'
    ],
    commonMistakes: [
      'Heels drooping below horizontal level',
      'Bent knees due to tight hamstrings',
      'Hips sinking behind hand line'
    ],
    primaryMuscles: ['Rectus Abdominis', 'Iliopsoas', 'Triceps Brachii', 'Lower Traps'],
    secondaryMuscles: ['Quadriceps', 'Serratus', 'Forearms'],
    illustrationType: 'full-l-sit',
    tips: 'Push your hips slightly forward past your hands to increase ground clearance on flat floor.'
  },
  'straddle-l-sit-hold': {
    id: 'straddle-l-sit-hold',
    skillTreeId: 'l-sit-v-sit-manna',
    title: 'Straddle L-Sit Hold',
    subtitle: 'Level 4 · Abductor Compression & Hip Flexion',
    level: 4,
    difficulty: 'Intermediate',
    category: 'Core',
    equipment: ['Floor', 'Parallettes'],
    metricType: 'seconds',
    passCriteria: {
      targetHoldSeconds: 15,
      targetSets: 3,
      restSeconds: 90,
      formStandard: 'Hands placed between wide straddled legs on floor. Push up with locked arms, straddled legs elevated parallel to floor.',
      notes: 'Hips pushed forward through hands.'
    },
    prerequisites: ['full-l-sit-hold'],
    unlockedSkills: ['v-sit-hold'],
    description: 'Spreading the legs into a straddle shifts the hip flexor load onto the tensor fasciae latae and adductors, prepping the hip hinge for high V-Sits.',
    formCues: [
      'Wide straddle with locked knees and pointed toes',
      'Place hands on floor between thighs slightly forward',
      'Push floor away and compress legs upward',
      'Keep spine upright'
    ],
    commonMistakes: [
      'Slumping upper back excessively',
      'Bending knees',
      'Heels touching floor'
    ],
    primaryMuscles: ['Hip Flexors', 'Abdominals', 'Lower Trapezius', 'Adductors'],
    secondaryMuscles: ['Triceps', 'Serratus', 'Quadriceps'],
    illustrationType: 'straddle-l-sit',
    tips: 'Warm up pancake mobility to allow deeper forward hand placement.'
  },
  'v-sit-hold': {
    id: 'v-sit-hold',
    skillTreeId: 'l-sit-v-sit-manna',
    title: 'V-Sit Static Hold (45°+ Elevation)',
    subtitle: 'Level 5 · Extreme Compression & Shoulder Extension',
    level: 5,
    difficulty: 'Advanced',
    category: 'Core',
    equipment: ['Floor', 'Parallettes'],
    metricType: 'seconds',
    passCriteria: {
      targetHoldSeconds: 10,
      targetSets: 4,
      restSeconds: 120,
      formStandard: 'Legs elevated at 45 to 60 degrees above horizontal. Hips pushed forward ahead of hands, shoulders extended backward.',
      notes: 'Knees locked straight with toes above eye level.'
    },
    prerequisites: ['full-l-sit-hold'],
    unlockedSkills: ['manna-hold'],
    description: 'Elevating the legs above 45 degrees transforms the L-sit into a V-sit, demanding extreme active pike compression, tricep extension, and posterior shoulder flexibility.',
    formCues: [
      'Push hips forward past hands',
      'Lean shoulders backward to open shoulder extension',
      'Clamp legs up toward face with intense quad/ab squeeze',
      'Keep knees 100% locked'
    ],
    commonMistakes: [
      'Legs dropping into standard L-sit angle',
      'Bending knees',
      'Hips staying behind hands'
    ],
    primaryMuscles: ['Rectus Abdominis', 'Iliopsoas', 'Triceps Long Head', 'Rear Deltoids'],
    secondaryMuscles: ['Upper Traps', 'Hamstring Flexibility', 'Quadriceps'],
    illustrationType: 'v-sit',
    tips: 'Focus on driving your hips forward and upward while leaning your shoulders back.'
  },
  'manna-hold': {
    id: 'manna-hold',
    skillTreeId: 'l-sit-v-sit-manna',
    title: 'Manna Static Hold',
    subtitle: 'Level 6 · The Zenith of Gymnastic Compression',
    level: 6,
    difficulty: 'Elite',
    category: 'Core',
    equipment: ['Floor', 'Parallettes'],
    metricType: 'seconds',
    passCriteria: {
      targetHoldSeconds: 5,
      targetSets: 4,
      restSeconds: 180,
      formStandard: 'Hips elevated above shoulder level, legs completely horizontal overhead parallel to ground with locked knees.',
      notes: 'Maximum active shoulder extension and compression.'
    },
    prerequisites: ['v-sit-hold'],
    unlockedSkills: [],
    description: 'One of the rarest and most demanding bodyweight holds in gymnastics. Hips are driven completely forward and upward with legs overhead parallel to the floor.',
    formCues: [
      'Drive hips high past shoulder line',
      'Maximum active shoulder extension',
      'Keep legs locked horizontal overhead',
      'Maintain powerful tricep and lat lockout'
    ],
    commonMistakes: [
      'Inability to achieve sufficient shoulder extension',
      'Bent knees',
      'Hips sagging below shoulder height'
    ],
    primaryMuscles: ['Triceps Long Head', 'Rear Deltoids', 'Latissimus Dorsi', 'Abdominals'],
    secondaryMuscles: ['Spinal Erectors', 'Trapezius', 'Hip Flexors'],
    illustrationType: 'manna',
    tips: 'Work consistently on passive and active German hang and shoulder extension mobility.'
  },

  // PISTOL SQUAT & LEGS
  'deep-bodyweight-squat': {
    id: 'deep-bodyweight-squat',
    skillTreeId: 'pistol-squat-tree',
    title: 'Deep Bodyweight Squat (ATG)',
    subtitle: 'Foundation 1 · Full Hip & Ankle Dorsiflexion Range',
    level: 1,
    difficulty: 'Beginner',
    category: 'Legs',
    equipment: ['Bodyweight'],
    metricType: 'reps',
    passCriteria: {
      targetReps: 30,
      targetSets: 3,
      restSeconds: 60,
      formStandard: 'Ass-to-grass depth (hips below knees, hamstrings touching calves). Heels flat on floor, chest upright throughout.',
      tempo: '2-1-1-0'
    },
    prerequisites: [],
    unlockedSkills: ['cossack-squat'],
    description: 'Restores full human resting squat depth, builds tendon resilience in patellar ligaments, and tests baseline ankle dorsiflexion mobility.',
    formCues: [
      'Feet shoulder-width apart, toes angled slightly out',
      'Descend all the way down until calves touch hamstrings',
      'Keep entire foot firmly planted with heels down',
      'Maintain proud chest and neutral spine'
    ],
    commonMistakes: [
      'Heels lifting off floor (tight ankles)',
      'Rounding lower back into butt wink at bottom',
      'Knees caving inward'
    ],
    primaryMuscles: ['Quadriceps', 'Gluteus Maximus', 'Soleus/Gastrocnemius'],
    secondaryMuscles: ['Adductors', 'Core Stabilizers'],
    illustrationType: 'deep-squat',
    tips: 'Spend 2-3 minutes holding a resting deep squat daily to loosen tight calves and hips.'
  },
  'cossack-squat': {
    id: 'cossack-squat',
    skillTreeId: 'pistol-squat-tree',
    title: 'Cossack Squat (Lateral Squat)',
    subtitle: 'Foundation 2 · Unilateral Adductor & Ankle Mobility',
    level: 2,
    difficulty: 'Beginner',
    category: 'Legs',
    equipment: ['Bodyweight'],
    metricType: 'reps',
    passCriteria: {
      targetReps: 16,
      targetSets: 3,
      restSeconds: 60,
      formStandard: 'Wide stance. Squat deep onto one leg with heel down while other leg remains straight with toes pointing up. Alternate sides (8 reps per side).',
      tempo: '2-1-1-1'
    },
    prerequisites: ['deep-bodyweight-squat'],
    unlockedSkills: ['box-step-downs'],
    description: 'Develops lateral hip strength, adductor flexibility, and unilateral ankle mobility crucial for the bottom position of a pistol squat.',
    formCues: [
      'Take wide straddle stance',
      'Shift weight and descend deep into one heel',
      'Opposite leg stays locked straight with toes pointing to ceiling',
      'Keep working heel glued to floor'
    ],
    commonMistakes: [
      'Working heel popping off ground',
      'Collapsing chest forward',
      'Bending the non-working knee'
    ],
    primaryMuscles: ['Quadriceps', 'Adductor Magnus', 'Gluteus Medius'],
    secondaryMuscles: ['Hamstrings', 'Calves', 'Core'],
    illustrationType: 'cossack-squat',
    tips: 'Hold onto a light post or counter if needed until adductor flexibility improves.'
  },
  'box-step-downs': {
    id: 'box-step-downs',
    skillTreeId: 'pistol-squat-tree',
    title: 'Elevated Box Step-Downs',
    subtitle: 'Level 3 · Unilateral Eccentric Quad Strength',
    level: 3,
    difficulty: 'Intermediate',
    category: 'Legs',
    equipment: ['Box / Plyo Platform (12-18 in)'],
    metricType: 'reps',
    passCriteria: {
      targetReps: 10,
      targetSets: 3,
      restSeconds: 90,
      formStandard: 'Stand on edge of box on one leg. Lower heel of free leg slowly to tap floor over 3 seconds without pushing off floor. 10 reps each leg.',
      tempo: '3-1-1-0'
    },
    prerequisites: ['cossack-squat'],
    unlockedSkills: ['assisted-pistol-squat'],
    description: 'Isolates the single-leg eccentric loading without needing full hip flexor compression for the free leg, targeting the VMO (vastus medialis).',
    formCues: [
      'Stand on box on single leg',
      'Hips hinge back slightly while knee tracks over second toe',
      'Lightly touch heel to ground with zero bounce',
      'Drive through midfoot/heel to return to standing lockout'
    ],
    commonMistakes: [
      'Bouncing or pushing off the ground with the bottom foot',
      'Knee collapsing inward (valgus collapse)',
      'Freefalling through the bottom range'
    ],
    primaryMuscles: ['Quadriceps (Vastus Medialis)', 'Gluteus Maximus'],
    secondaryMuscles: ['Gluteus Medius', 'Calves', 'Hamstrings'],
    illustrationType: 'box-step-down',
    tips: 'Gradually increase box height to deepen the single-leg knee flexion angle.'
  },
  'assisted-pistol-squat': {
    id: 'assisted-pistol-squat',
    skillTreeId: 'pistol-squat-tree',
    title: 'Assisted Pistol Squat (Ring / Band / Pole)',
    subtitle: 'Level 4 · Patterning the Full Bottom Lever',
    level: 4,
    difficulty: 'Intermediate',
    category: 'Legs',
    equipment: ['Pole / Rings / Band'],
    metricType: 'reps',
    passCriteria: {
      targetReps: 8,
      targetSets: 3,
      restSeconds: 90,
      formStandard: 'Single leg squat to full bottom depth (butt to calf) with light finger assist for balance. Free leg straight in front. 8 reps each leg.',
      tempo: '2-1-1-1'
    },
    prerequisites: ['box-step-downs'],
    unlockedSkills: ['strict-pistol-squat'],
    description: 'Teaches the full bottom balance point and hip flexor compression while providing just enough hand support to navigate sticky points.',
    formCues: [
      'Hold light ring or pole assist with fingers',
      'Extend free leg straight out in front with pointed toe',
      'Lower all the way down until hamstring touches calf',
      'Drive through heel and midfoot with minimal hand pulling'
    ],
    commonMistakes: [
      'Pulling aggressively with arms rather than pushing with leg',
      'Dropping free foot on floor',
      'Heel peeling off floor'
    ],
    primaryMuscles: ['Quadriceps', 'Gluteus Maximus', 'Hip Flexors'],
    secondaryMuscles: ['Calves', 'Core', 'Gluteus Medius'],
    illustrationType: 'assisted-pistol',
    tips: 'Use fewer fingers (from 4 fingers to 2 fingers to 1 finger) as strength improves.'
  },
  'strict-pistol-squat': {
    id: 'strict-pistol-squat',
    skillTreeId: 'pistol-squat-tree',
    title: 'Strict Freestanding Pistol Squat',
    subtitle: 'Level 5 · The Single-Leg Gold Standard',
    level: 5,
    difficulty: 'Advanced',
    category: 'Legs',
    equipment: ['Bodyweight'],
    metricType: 'reps',
    passCriteria: {
      targetReps: 10,
      targetSets: 3,
      restSeconds: 120,
      formStandard: 'Freestanding on flat ground. Full depth (hamstring touches calf), free leg elevated straight off floor. Stand up smoothly without pause. 10 reps each leg.',
      tempo: '2-1-1-0'
    },
    prerequisites: ['assisted-pistol-squat'],
    unlockedSkills: ['shrimp-squat', 'weighted-pistol-squat'],
    description: 'The definitive bodyweight leg benchmark. Combines massive unilateral quad and glute strength with balance, ankle dorsiflexion, and active hip flexor compression.',
    formCues: [
      'Extend arms and free leg forward to counterbalance hips',
      'Descend smoothly with full control into bottom pocket',
      'Heel stays firmly glued to ground',
      'Drive floor away to stand tall and lockout knee and hip'
    ],
    commonMistakes: [
      'Bouncing out of the bottom position with jerky momentum',
      'Free leg touching floor',
      'Heel lifting up onto toes'
    ],
    primaryMuscles: ['Quadriceps', 'Gluteus Maximus', 'Iliopsoas (Free Leg)'],
    secondaryMuscles: ['Soleus', 'Tibialis Anterior', 'Abdominals'],
    illustrationType: 'strict-pistol',
    tips: 'Hold a tiny 2kg counterweight in front of your chest to immediately improve balance and counterweight.'
  },
  'shrimp-squat': {
    id: 'shrimp-squat',
    skillTreeId: 'pistol-squat-tree',
    title: 'Shrimp Squat (Elevated King Squat)',
    subtitle: 'Level 6 · Quad Dominant Posterior Hinge',
    level: 6,
    difficulty: 'Advanced',
    category: 'Legs',
    equipment: ['Bodyweight'],
    metricType: 'reps',
    passCriteria: {
      targetReps: 6,
      targetSets: 3,
      restSeconds: 120,
      formStandard: 'Hold rear foot behind back with one or both hands. Lower until back knee softly touches floor. Stand up without back foot touching ground. 6 reps per leg.',
      tempo: '2-1-1-0'
    },
    prerequisites: ['strict-pistol-squat'],
    unlockedSkills: ['weighted-pistol-squat'],
    description: 'Forces extraordinary quad isolation and knee flexion torque by removing the forward counterbalance of the free leg.',
    formCues: [
      'Grip top of back foot behind glutes',
      'Descend with upright torso until back knee kisses the ground',
      'Do not rest weight on back knee',
      'Press through standing foot to full lockout'
    ],
    commonMistakes: [
      'Slamming back knee hard into ground',
      'Using back foot to push off',
      'Excessive torso forward lean'
    ],
    primaryMuscles: ['Quadriceps (Rectus Femoris)', 'Gluteus Maximus'],
    secondaryMuscles: ['Ankle Stabilizers', 'Core'],
    illustrationType: 'shrimp-squat',
    tips: 'Place a soft yoga block or cushion under the back knee for safe depth calibration.'
  },
  'weighted-pistol-squat': {
    id: 'weighted-pistol-squat',
    skillTreeId: 'pistol-squat-tree',
    title: 'Weighted Pistol Squat (+30% BW / Kettlebell)',
    subtitle: 'Level 7 · Elite Unilateral Power & Mass',
    level: 7,
    difficulty: 'Elite',
    category: 'Legs',
    equipment: ['Kettlebell / Weight Vest / Dumbbell'],
    metricType: 'reps_weighted',
    passCriteria: {
      targetReps: 5,
      targetSets: 3,
      restSeconds: 150,
      formStandard: 'Hold kettlebell/dumbbell (+16kg to +24kg) in goblet position. Perform 5 strict full-depth pistol squats per leg with zero assistance.',
      tempo: '2-1-1-0'
    },
    prerequisites: ['strict-pistol-squat'],
    unlockedSkills: [],
    description: 'Elevates pistol squats to high-intensity hypertrophy and strength work by adding significant external resistance to unilateral loading.',
    formCues: [
      'Hold weight tight in goblet position at chest',
      'Brace core deeply before descending',
      'Hit rock-bottom depth with flat heel',
      'Powerfully drive back to top lockout'
    ],
    commonMistakes: [
      'Rounding thoracic spine under weight load',
      'Knee valgus collapse inward',
      'Partial depth'
    ],
    primaryMuscles: ['Quadriceps', 'Gluteus Maximus', 'Erector Spinae'],
    secondaryMuscles: ['Upper Back', 'Core', 'Ankle Flexors'],
    illustrationType: 'weighted-pistol',
    tips: 'Use a weight vest for distributed loading if kettlebell grip fatigues.'
  }
};

// Initial Realistic Sample PB Logs to make the app interactive and graph-rich from the first load
export const INITIAL_LOGS: WorkoutLogEntry[] = [
  // Pull-ups history (showing real progression over 8 weeks)
  {
    id: 'log-1',
    exerciseId: 'strict-pull-ups',
    date: '2026-07-01',
    timestamp: new Date('2026-07-01').getTime(),
    metricValue: 4,
    sets: 3,
    rpe: 8,
    notes: 'First time doing clean dead hang reps',
    isPB: true,
    passedCriteria: false
  },
  {
    id: 'log-2',
    exerciseId: 'strict-pull-ups',
    date: '2026-07-12',
    timestamp: new Date('2026-07-12').getTime(),
    metricValue: 6,
    sets: 3,
    rpe: 8.5,
    notes: 'Felt smoother in scapular depression',
    isPB: true,
    passedCriteria: false
  },
  {
    id: 'log-3',
    exerciseId: 'strict-pull-ups',
    date: '2026-07-25',
    timestamp: new Date('2026-07-25').getTime(),
    metricValue: 8,
    sets: 3,
    rpe: 9,
    notes: 'Getting closer to double digits',
    isPB: true,
    passedCriteria: false
  },
  {
    id: 'log-4',
    exerciseId: 'strict-pull-ups',
    date: '2026-08-08',
    timestamp: new Date('2026-08-08').getTime(),
    metricValue: 9,
    sets: 3,
    rpe: 9.5,
    notes: 'Last rep was a grinder',
    isPB: true,
    passedCriteria: false
  },
  {
    id: 'log-5',
    exerciseId: 'strict-pull-ups',
    date: '2026-08-22',
    timestamp: new Date('2026-08-22').getTime(),
    metricValue: 10,
    sets: 3,
    rpe: 9,
    notes: 'Passed the 10-rep milestone test with strict pause!',
    isPB: true,
    passedCriteria: true
  },
  {
    id: 'log-6',
    exerciseId: 'strict-pull-ups',
    date: '2026-08-28',
    timestamp: new Date('2026-08-28').getTime(),
    metricValue: 12,
    sets: 3,
    rpe: 9,
    notes: 'New PR! Chin comfortably cleared on all 12.',
    isPB: true,
    passedCriteria: true
  },

  // Incline Push-ups (Passed)
  {
    id: 'log-7',
    exerciseId: 'incline-push-ups',
    date: '2026-06-15',
    timestamp: new Date('2026-06-15').getTime(),
    metricValue: 18,
    sets: 3,
    rpe: 6,
    notes: 'Easy warmup set',
    isPB: true,
    passedCriteria: true
  },
  // Strict Floor Push-ups (Passed)
  {
    id: 'log-8',
    exerciseId: 'strict-floor-push-ups',
    date: '2026-07-10',
    timestamp: new Date('2026-07-10').getTime(),
    metricValue: 24,
    sets: 3,
    rpe: 8,
    notes: 'Hit 24 clean reps with full protraction at top',
    isPB: true,
    passedCriteria: true
  },
  // Diamond Push-ups (Passed)
  {
    id: 'log-9',
    exerciseId: 'diamond-push-ups',
    date: '2026-07-28',
    timestamp: new Date('2026-07-28').getTime(),
    metricValue: 16,
    sets: 3,
    rpe: 8.5,
    notes: 'Passed criteria (15 reps)',
    isPB: true,
    passedCriteria: true
  },
  // PPPU
  {
    id: 'log-10',
    exerciseId: 'pseudo-planche-push-ups',
    date: '2026-08-05',
    timestamp: new Date('2026-08-05').getTime(),
    metricValue: 6,
    sets: 3,
    rpe: 8,
    notes: 'Working on deep lean',
    isPB: true,
    passedCriteria: false
  },
  {
    id: 'log-11',
    exerciseId: 'pseudo-planche-push-ups',
    date: '2026-08-18',
    timestamp: new Date('2026-08-18').getTime(),
    metricValue: 8,
    sets: 3,
    rpe: 9,
    notes: 'Hands at waist height',
    isPB: true,
    passedCriteria: false
  },
  {
    id: 'log-12',
    exerciseId: 'pseudo-planche-push-ups',
    date: '2026-08-27',
    timestamp: new Date('2026-08-27').getTime(),
    metricValue: 11,
    sets: 3,
    rpe: 9.5,
    notes: 'Passed 10 reps criteria! Moving to Tuck Planche holds.',
    isPB: true,
    passedCriteria: true
  },

  // Tuck Planche Hold
  {
    id: 'log-13',
    exerciseId: 'tuck-planche-hold',
    date: '2026-08-10',
    timestamp: new Date('2026-08-10').getTime(),
    metricValue: 8,
    sets: 4,
    rpe: 9,
    notes: 'First real tuck hold on parallettes',
    isPB: true,
    passedCriteria: false
  },
  {
    id: 'log-14',
    exerciseId: 'tuck-planche-hold',
    date: '2026-08-20',
    timestamp: new Date('2026-08-20').getTime(),
    metricValue: 14,
    sets: 4,
    rpe: 9,
    notes: 'Hips stayed level with shoulders',
    isPB: true,
    passedCriteria: false
  },
  {
    id: 'log-15',
    exerciseId: 'tuck-planche-hold',
    date: '2026-08-29',
    timestamp: new Date('2026-08-29').getTime(),
    metricValue: 18,
    sets: 4,
    rpe: 9.5,
    notes: '2 seconds away from 20s pass criteria!',
    isPB: true,
    passedCriteria: false
  },

  // Dead Hang Scapular Pulls (Passed)
  {
    id: 'log-16',
    exerciseId: 'dead-hang-scapular-pulls',
    date: '2026-06-01',
    timestamp: new Date('2026-06-01').getTime(),
    metricValue: 15,
    sets: 3,
    rpe: 6,
    notes: 'Solid 2s holds at top',
    isPB: true,
    passedCriteria: true
  },
  // Australian Pull-Ups (Passed)
  {
    id: 'log-17',
    exerciseId: 'australian-pull-ups',
    date: '2026-06-20',
    timestamp: new Date('2026-06-20').getTime(),
    metricValue: 18,
    sets: 3,
    rpe: 7,
    notes: 'Chest touches bar',
    isPB: true,
    passedCriteria: true
  },
  // Negative Pull-Ups (Passed)
  {
    id: 'log-18',
    exerciseId: 'negative-pull-ups',
    date: '2026-06-30',
    timestamp: new Date('2026-06-30').getTime(),
    metricValue: 6,
    sets: 4,
    rpe: 8,
    notes: '8-second negatives recorded',
    isPB: true,
    passedCriteria: true
  },

  // Strict Dips (Passed)
  {
    id: 'log-19',
    exerciseId: 'bench-dips',
    date: '2026-06-10',
    timestamp: new Date('2026-06-10').getTime(),
    metricValue: 25,
    sets: 3,
    rpe: 6,
    notes: 'Passed benchmark',
    isPB: true,
    passedCriteria: true
  },
  {
    id: 'log-20',
    exerciseId: 'parallel-bar-support-hold',
    date: '2026-06-25',
    timestamp: new Date('2026-06-25').getTime(),
    metricValue: 55,
    sets: 3,
    rpe: 7,
    notes: 'Rock steady support hold',
    isPB: true,
    passedCriteria: true
  },
  {
    id: 'log-21',
    exerciseId: 'strict-parallel-dips',
    date: '2026-07-15',
    timestamp: new Date('2026-07-15').getTime(),
    metricValue: 12,
    sets: 3,
    rpe: 8.5,
    notes: 'Full depth below 90 deg',
    isPB: true,
    passedCriteria: false
  },
  {
    id: 'log-22',
    exerciseId: 'strict-parallel-dips',
    date: '2026-08-14',
    timestamp: new Date('2026-08-14').getTime(),
    metricValue: 16,
    sets: 3,
    rpe: 9,
    notes: 'Criteria passed (15 reps)',
    isPB: true,
    passedCriteria: true
  },

  // Handstand progression logs
  {
    id: 'log-23',
    exerciseId: 'elevated-pike-push-ups',
    date: '2026-07-02',
    timestamp: new Date('2026-07-02').getTime(),
    metricValue: 14,
    sets: 3,
    rpe: 8,
    notes: 'Tripod line passed',
    isPB: true,
    passedCriteria: true
  },
  {
    id: 'log-24',
    exerciseId: 'wall-handstand-chest-to-wall',
    date: '2026-07-20',
    timestamp: new Date('2026-07-20').getTime(),
    metricValue: 40,
    sets: 3,
    rpe: 8.5,
    notes: 'Nose to wall hollow line',
    isPB: true,
    passedCriteria: false
  },
  {
    id: 'log-25',
    exerciseId: 'wall-handstand-chest-to-wall',
    date: '2026-08-12',
    timestamp: new Date('2026-08-12').getTime(),
    metricValue: 65,
    sets: 3,
    rpe: 9,
    notes: 'Passed 60s hold criteria with zero arching!',
    isPB: true,
    passedCriteria: true
  },
  {
    id: 'log-26',
    exerciseId: 'freestanding-handstand-hold',
    date: '2026-08-01',
    timestamp: new Date('2026-08-01').getTime(),
    metricValue: 8,
    sets: 5,
    rpe: 9,
    notes: 'Controlled kickup and wrist correction',
    isPB: true,
    passedCriteria: false
  },
  {
    id: 'log-27',
    exerciseId: 'freestanding-handstand-hold',
    date: '2026-08-15',
    timestamp: new Date('2026-08-15').getTime(),
    metricValue: 16,
    sets: 5,
    rpe: 8.5,
    notes: 'Felt very balanced today',
    isPB: true,
    passedCriteria: false
  },
  {
    id: 'log-28',
    exerciseId: 'freestanding-handstand-hold',
    date: '2026-08-28',
    timestamp: new Date('2026-08-28').getTime(),
    metricValue: 24,
    sets: 4,
    rpe: 9,
    notes: '6 seconds away from 30s mastery standard!',
    isPB: true,
    passedCriteria: false
  },

  // Front Lever logs
  {
    id: 'log-29',
    exerciseId: 'active-hang-dragon-flag',
    date: '2026-07-08',
    timestamp: new Date('2026-07-08').getTime(),
    metricValue: 10,
    sets: 3,
    rpe: 8,
    notes: 'Straight body dragon flag',
    isPB: true,
    passedCriteria: true
  },
  {
    id: 'log-30',
    exerciseId: 'tuck-front-lever-hold',
    date: '2026-08-02',
    timestamp: new Date('2026-08-02').getTime(),
    metricValue: 18,
    sets: 4,
    rpe: 9,
    notes: 'Straight arm lat pull down',
    isPB: true,
    passedCriteria: false
  },
  {
    id: 'log-31',
    exerciseId: 'tuck-front-lever-hold',
    date: '2026-08-25',
    timestamp: new Date('2026-08-25').getTime(),
    metricValue: 27,
    sets: 4,
    rpe: 9,
    notes: 'Passed 25s criteria! Moving to Adv Tuck.',
    isPB: true,
    passedCriteria: true
  },

  // L-Sit logs
  {
    id: 'log-32',
    exerciseId: 'seated-pike-leg-lifts',
    date: '2026-06-28',
    timestamp: new Date('2026-06-28').getTime(),
    metricValue: 18,
    sets: 3,
    rpe: 7,
    notes: 'Passed criteria (15 reps)',
    isPB: true,
    passedCriteria: true
  },
  {
    id: 'log-33',
    exerciseId: 'tuck-l-sit-support',
    date: '2026-07-18',
    timestamp: new Date('2026-07-18').getTime(),
    metricValue: 35,
    sets: 3,
    rpe: 8,
    notes: 'Passed criteria (30s hold)',
    isPB: true,
    passedCriteria: true
  },
  {
    id: 'log-34',
    exerciseId: 'full-l-sit-hold',
    date: '2026-08-04',
    timestamp: new Date('2026-08-04').getTime(),
    metricValue: 12,
    sets: 3,
    rpe: 9,
    notes: 'On floor palms flat',
    isPB: true,
    passedCriteria: false
  },
  {
    id: 'log-35',
    exerciseId: 'full-l-sit-hold',
    date: '2026-08-26',
    timestamp: new Date('2026-08-26').getTime(),
    metricValue: 21,
    sets: 3,
    rpe: 9.5,
    notes: 'Passed 20s criteria on flat ground!',
    isPB: true,
    passedCriteria: true
  },

  // Pistol Squat logs
  {
    id: 'log-36',
    exerciseId: 'deep-bodyweight-squat',
    date: '2026-06-05',
    timestamp: new Date('2026-06-05').getTime(),
    metricValue: 35,
    sets: 3,
    rpe: 6,
    notes: 'Full ATG depth',
    isPB: true,
    passedCriteria: true
  },
  {
    id: 'log-37',
    exerciseId: 'cossack-squat',
    date: '2026-06-25',
    timestamp: new Date('2026-06-25').getTime(),
    metricValue: 18,
    sets: 3,
    rpe: 7,
    notes: 'Heels flat on ground',
    isPB: true,
    passedCriteria: true
  },
  {
    id: 'log-38',
    exerciseId: 'box-step-downs',
    date: '2026-07-14',
    timestamp: new Date('2026-07-14').getTime(),
    metricValue: 12,
    sets: 3,
    rpe: 8,
    notes: 'Smooth slow descent',
    isPB: true,
    passedCriteria: true
  },
  {
    id: 'log-39',
    exerciseId: 'assisted-pistol-squat',
    date: '2026-08-01',
    timestamp: new Date('2026-08-01').getTime(),
    metricValue: 10,
    sets: 3,
    rpe: 8,
    notes: 'Passed criteria (8 reps with 1 finger assist)',
    isPB: true,
    passedCriteria: true
  },
  {
    id: 'log-40',
    exerciseId: 'strict-pistol-squat',
    date: '2026-08-16',
    timestamp: new Date('2026-08-16').getTime(),
    metricValue: 5,
    sets: 3,
    rpe: 9,
    notes: 'First strict unassisted pistols on both legs',
    isPB: true,
    passedCriteria: false
  },
  {
    id: 'log-41',
    exerciseId: 'strict-pistol-squat',
    date: '2026-08-29',
    timestamp: new Date('2026-08-29').getTime(),
    metricValue: 8,
    sets: 3,
    rpe: 9,
    notes: '2 reps away from 10 reps mastery standard!',
    isPB: true,
    passedCriteria: false
  }
];

// Helper to compute initial PB records from logs
export function deriveInitialPBRecords(logs: WorkoutLogEntry[]): Record<string, PBRecord> {
  const records: Record<string, PBRecord> = {};

  for (const log of logs) {
    const existing = records[log.exerciseId];
    if (!existing || log.metricValue > existing.bestValue) {
      records[log.exerciseId] = {
        exerciseId: log.exerciseId,
        bestValue: log.metricValue,
        bestWeightKg: log.weightAddedKg,
        bestSets: log.sets,
        dateAchieved: log.date,
        isPassed: log.passedCriteria || (existing ? existing.isPassed : false),
        datePassed: log.passedCriteria ? log.date : (existing ? existing.datePassed : undefined)
      };
    } else if (log.passedCriteria && !existing.isPassed) {
      existing.isPassed = true;
      existing.datePassed = log.date;
    }
  }

  return records;
}
