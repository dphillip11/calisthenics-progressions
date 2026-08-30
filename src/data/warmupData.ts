import { WarmupExercise } from '../types';

export const WARMUP_EXERCISES: WarmupExercise[] = [
  // 1. General Pulse & Temperature
  {
    id: 'wu-boxer-bounce',
    name: 'Boxer Bounce & Light Arm Shakes',
    category: 'cardio_pulse',
    categoryLabel: 'Pulse & Heat',
    target: '45 - 60 seconds',
    focusArea: ['Full Body', 'Circulation', 'Calves'],
    purpose: 'Raises core body temperature, lubricates connective tissues, and releases upper body tension.',
    cues: [
      'Stay light on the balls of your feet with a soft knee bend',
      'Shake out hands, wrists, and shoulders to release resting tension',
      'Breathe deeply in through the nose and out through the mouth'
    ],
    difficulty: 'Gentle',
    illustrationType: 'boxer-bounce',
    demoVideoUrl: 'https://www.youtube.com/results?search_query=boxer+bounce+warmup+movement'
  },
  {
    id: 'wu-jumping-jacks',
    name: 'Jumping Jacks / Seal Jacks',
    category: 'cardio_pulse',
    categoryLabel: 'Pulse & Heat',
    target: '30 - 45 seconds',
    focusArea: ['Cardiovascular', 'Shoulder Girdle', 'Ankles'],
    purpose: 'Elevates heart rate while mobilizing the glenohumeral joints across horizontal & frontal planes.',
    cues: [
      'Maintain steady rhythmic breathing',
      'Clap overhead or open arms wide across the chest',
      'Land softly with spring in the ankles'
    ],
    difficulty: 'Gentle',
    illustrationType: 'jumping-jacks',
    demoVideoUrl: 'https://www.youtube.com/results?search_query=jumping+jacks+calisthenics+warmup'
  },

  // 2. Wrist & Forearm Conditioning (Vital for Calisthenics)
  {
    id: 'wu-quadruped-wrist-rocks',
    name: 'Quadruped Palms-Down Wrist Rocks',
    category: 'joint_prep',
    categoryLabel: 'Wrists & Forearms',
    target: '10 - 15 gentle rocks',
    focusArea: ['Wrist Flexors', 'Forearms', 'Carpal Joint'],
    purpose: 'Prepares wrists for heavy compression in push-ups, handstands, planches, and parallette holds.',
    cues: [
      'Get on all fours with fingers pointing forward',
      'Keep elbows locked and gently rock shoulders past your fingertips',
      'Rotate hands outwards 90° and rock side-to-side, then fingers pointing back toward knees'
    ],
    difficulty: 'Gentle',
    illustrationType: 'wrist-rocks',
    demoVideoUrl: 'https://www.youtube.com/results?search_query=wrist+routine+for+calisthenics+and+handstands'
  },
  {
    id: 'wu-back-of-hand-press',
    name: 'Back-of-Wrist Decompression Rocks',
    category: 'joint_prep',
    categoryLabel: 'Wrists & Forearms',
    target: '10 - 12 slow pulses',
    focusArea: ['Wrist Extensors', 'Dorsal Ligaments'],
    purpose: 'Strengthens and decompresses wrist extensors to prevent overuse injuries from repetitive pushing.',
    cues: [
      'Place the backs of your hands on the ground with fingers pointing toward each other',
      'Start with little bodyweight loaded, gently straighten elbows as comfortable',
      'Make gentle fist squeezes while holding contact with the floor'
    ],
    difficulty: 'Gentle',
    illustrationType: 'wrist-extensor',
    demoVideoUrl: 'https://www.youtube.com/results?search_query=back+of+hand+wrist+prep+calisthenics'
  },
  {
    id: 'wu-finger-pulses',
    name: 'Interlocked Finger Circles & Wave Rolls',
    category: 'joint_prep',
    categoryLabel: 'Wrists & Forearms',
    target: '20 - 30 seconds',
    focusArea: ['Synovial Fluid', 'Finger Flexors'],
    purpose: 'Mobilizes finger tendons and stimulates synovial fluid flow through the entire wrist capsule.',
    cues: [
      'Interlace fingers together tightly',
      'Roll wrists in a fluid figure-8 wave pattern in both directions',
      'Extend arms forward and flex/extend wrists briskly'
    ],
    difficulty: 'Gentle',
    illustrationType: 'finger-waves',
    demoVideoUrl: 'https://www.youtube.com/results?search_query=wrist+circles+and+waves+mobility'
  },

  // 3. Scapula & Shoulders Mobilization
  {
    id: 'wu-shoulder-dislocates',
    name: 'Shoulder Dislocates (Band / PVC Stick)',
    category: 'scapular_shoulders',
    categoryLabel: 'Shoulders & Scapula',
    target: '10 - 15 smooth passes',
    focusArea: ['Rotator Cuff', 'Pectorals', 'Anterior Deltoids'],
    purpose: 'Expands active shoulder range of motion into full extension and flexion without compensation.',
    cues: [
      'Grip a band or light stick wider than shoulder-width with straight arms',
      'Maintain tight core and ribcage down (do not hyperextend lower back)',
      'Smoothly bring the band over and behind your back in a full arc'
    ],
    difficulty: 'Moderate',
    illustrationType: 'shoulder-dislocates',
    demoVideoUrl: 'https://www.youtube.com/results?search_query=shoulder+dislocates+with+band+tutorial'
  },
  {
    id: 'wu-arm-circles-swings',
    name: 'Arm Swings & Cross-Body Hugs',
    category: 'scapular_shoulders',
    categoryLabel: 'Shoulders & Scapula',
    target: '15 reps each direction',
    focusArea: ['Glenohumeral Joint', 'Upper Back', 'Chest'],
    purpose: 'Dynamic stretching of the chest and posterior deltoids with progressive amplitude.',
    cues: [
      'Alternate which arm crosses on top with each horizontal hug',
      'Perform small circles transitioning gradually into large full-range circles',
      'Keep shoulder blades gliding freely along the ribcage'
    ],
    difficulty: 'Gentle',
    illustrationType: 'arm-swings',
    demoVideoUrl: 'https://www.youtube.com/results?search_query=arm+swings+and+shoulder+circles+warmup'
  },
  {
    id: 'wu-scapular-pushups',
    name: 'Scapular Push-Ups (Protraction & Retraction)',
    category: 'scapular_shoulders',
    categoryLabel: 'Shoulders & Scapula',
    target: '10 - 12 controlled reps',
    focusArea: ['Serratus Anterior', 'Rhomboids', 'Trapezius'],
    purpose: 'Activates the serratus anterior for solid planche leans, push-up lockouts, and handstand elevation.',
    cues: [
      'Assume a solid high plank or quadruped position with locked elbows',
      'Pinch shoulder blades together in deep retraction without bending arms',
      'Press through palms to push the ground away into maximum protraction (dome your upper back)'
    ],
    difficulty: 'Moderate',
    illustrationType: 'scapular-pushup',
    demoVideoUrl: 'https://www.youtube.com/results?search_query=scapular+push+ups+form+tutorial+calisthenics'
  },
  {
    id: 'wu-dead-hang-scap-pulls',
    name: 'Passive to Active Hang (Scapular Pull-Ups)',
    category: 'scapular_shoulders',
    categoryLabel: 'Shoulders & Scapula',
    target: '6 - 10 reps or 20s hang',
    focusArea: ['Lats', 'Lower Traps', 'Grip Strength'],
    purpose: 'Decompresses the spine and activates lower trapezius depression required for clean pull-ups and levers.',
    cues: [
      'Hang from bar with overhand grip and relaxed shoulders (passive hang)',
      'Pull shoulder blades down and away from ears without bending elbows (active hang)',
      'Hold the active depressed state for 2 seconds at the peak of each rep'
    ],
    difficulty: 'Moderate',
    illustrationType: 'scapular-pullup',
    demoVideoUrl: 'https://www.youtube.com/results?search_query=scapular+pull+ups+dead+hang+tutorial'
  },

  // 4. Spine & Core Activation
  {
    id: 'wu-cat-cow',
    name: 'Cat-Cow Spinal Waves',
    category: 'spine_core',
    categoryLabel: 'Spine & Core',
    target: '8 - 10 slow wave reps',
    focusArea: ['Thoracic Spine', 'Lumbar Spine', 'Neck'],
    purpose: 'Segmental articulation of the entire vertebral column to prevent stiffness under load.',
    cues: [
      'Inhale: Drop belly, lift chest and tailbone, expand collarbones (Cow)',
      'Exhale: Tuck chin and tailbone, aggressively round spine toward ceiling (Cat)',
      'Move vertebra-by-vertebra with full breath coordination'
    ],
    difficulty: 'Gentle',
    illustrationType: 'cat-cow',
    demoVideoUrl: 'https://www.youtube.com/results?search_query=cat+cow+spinal+mobility+exercise'
  },
  {
    id: 'wu-thoracic-rotations',
    name: 'Quadruped Thoracic Rotations / Thread the Needle',
    category: 'spine_core',
    categoryLabel: 'Spine & Core',
    target: '8 reps per side',
    focusArea: ['Thoracic Spine', 'Obliques', 'Mid-Back'],
    purpose: 'Frees up thoracic rotational mobility essential for levers, human flag, and rotational stability.',
    cues: [
      'Place one hand behind your head on all fours',
      'Rotate elbow down toward the opposite wrist',
      'Unfurl and rotate chest toward the ceiling, following your elbow with your gaze'
    ],
    difficulty: 'Gentle',
    illustrationType: 'thoracic-rotations',
    demoVideoUrl: 'https://www.youtube.com/results?search_query=quadruped+thoracic+rotation+exercise'
  },
  {
    id: 'wu-hollow-arch-rocks',
    name: 'Hollow Body to Arch / Superman Activation',
    category: 'spine_core',
    categoryLabel: 'Spine & Core',
    target: '15 - 20s each or 8 rocks',
    focusArea: ['Transverse Abdominis', 'Erectors', 'Glutes'],
    purpose: 'Wakes up the fundamental gymnastics body tension shapes for levers, handstands, and push/pull work.',
    cues: [
      'Hollow: Press lower back firmly into floor, legs together, toes pointed, arms overhead',
      'Flip to stomach for Arch: Squeeze glutes and mid-back to hover chest and thighs off floor',
      'Maintain full-body continuous tension throughout'
    ],
    difficulty: 'Moderate',
    illustrationType: 'hollow-body-hold',
    demoVideoUrl: 'https://www.youtube.com/results?search_query=hollow+body+to+arch+rocks+gymnastics'
  },

  // 5. Hips, Pelvis & Lower Kinetic Chain
  {
    id: 'wu-deep-squat-pry',
    name: 'Deep Squat Pry & Thoracic Reach',
    category: 'hips_lower',
    categoryLabel: 'Hips & Lower Chain',
    target: '30 - 45 seconds',
    focusArea: ['Ankles', 'Hip Adductors', 'Pelvic Floor'],
    purpose: 'Opens deep hip flexion, ankle dorsiflexion, and upright posture for squatting and balance.',
    cues: [
      'Drop into a deep bodyweight squat with heels flat on the floor',
      'Use elbows to gently press knees outward and pry open the hips',
      'Place one hand on floor and reach opposite arm to ceiling with deep breath'
    ],
    difficulty: 'Gentle',
    illustrationType: 'deep-squat',
    demoVideoUrl: 'https://www.youtube.com/results?search_query=deep+squat+pry+hip+mobility'
  },
  {
    id: 'wu-leg-swings',
    name: 'Dynamic Leg Swings (Front/Back & Lateral)',
    category: 'hips_lower',
    categoryLabel: 'Hips & Lower Chain',
    target: '10 swings each leg / direction',
    focusArea: ['Hamstrings', 'Hip Flexors', 'Abductors'],
    purpose: 'Dynamic elongation of hamstrings and hip flexors for L-sits, straddle skills, and handstand kicks.',
    cues: [
      'Hold a wall or bar for support',
      'Swing leg forward and back with relaxed momentum, increasing height naturally',
      'Turn and swing leg across body laterally to open adductors/abductors'
    ],
    difficulty: 'Gentle',
    illustrationType: 'leg-swings',
    demoVideoUrl: 'https://www.youtube.com/results?search_query=dynamic+leg+swings+warmup'
  },
  {
    id: 'wu-glute-bridges',
    name: 'Glute Bridges / Hip Thrust Holds',
    category: 'hips_lower',
    categoryLabel: 'Hips & Lower Chain',
    target: '10 - 12 reps + 5s hold',
    focusArea: ['Gluteus Maximus', 'Hamstrings', 'Posterior Chain'],
    purpose: 'Fires glutes for posterior pelvic tilt and straight-line body control in planches and handstands.',
    cues: [
      'Lie on back with knees bent and feet flat on floor',
      'Drive through heels and squeeze glutes to lift hips into a straight line',
      'Avoid hyperextending through the lumbar spine'
    ],
    difficulty: 'Gentle',
    illustrationType: 'glute-bridge',
    demoVideoUrl: 'https://www.youtube.com/results?search_query=glute+bridge+activation+exercise'
  }
];
