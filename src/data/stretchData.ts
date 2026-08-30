import { StretchExercise } from '../types';

export const STRETCH_EXERCISES: StretchExercise[] = [
  // 1. Upper Body Decompression & Recovery
  {
    id: 'str-passive-bar-hang',
    name: 'Full Dead Hang Spinal Decompression',
    category: 'upper_body',
    categoryLabel: 'Upper Body',
    target: '30 - 60 seconds',
    focusArea: ['Spine Decompression', 'Lats', 'Shoulder Capsule', 'Forearm Flexors'],
    purpose: 'Decompresses the vertebral discs, opens the subacromial space in the shoulder, and resets grip tension after pulling/pushing sessions.',
    cues: [
      'Grip the pull-up bar with hands shoulder-width apart using an overhand grip',
      'Completely relax shoulders up to ears and let gravity pull hips towards the floor',
      'Take deep belly breaths to let lower back and intercostal muscles release'
    ],
    intensity: 'Gentle Decompression',
    illustrationType: 'dead-hang',
    demoVideoUrl: 'https://www.youtube.com/results?search_query=passive+dead+hang+spinal+decompression+calisthenics'
  },
  {
    id: 'str-doorway-chest-stretch',
    name: 'Doorway / Corner Pectoral & Biceps Stretch',
    category: 'upper_body',
    categoryLabel: 'Upper Body',
    target: '30s hold per angle (high/mid)',
    focusArea: ['Pectoralis Major', 'Pectoralis Minor', 'Biceps Tendon', 'Anterior Deltoid'],
    purpose: 'Counteracts chest tightening and internal rotation caused by heavy dips, push-ups, and planche training.',
    cues: [
      'Place forearm against a door frame with elbow bent at 90 degrees',
      'Gently step forward with the same side leg until a deep stretch is felt across the chest',
      'Keep core braced without arching lower back; breathe smoothly into the stretch'
    ],
    intensity: 'Moderate Lengthening',
    illustrationType: 'chest-stretch',
    demoVideoUrl: 'https://www.youtube.com/results?search_query=doorway+chest+stretch+calisthenics+recovery'
  },
  {
    id: 'str-puppy-pose-lat-reach',
    name: 'Puppy Pose (Uttana Shishosana) Lat Opener',
    category: 'upper_body',
    categoryLabel: 'Upper Body',
    target: '45 - 60 seconds hold',
    focusArea: ['Latissimus Dorsi', 'Thoracic Extension', 'Posterior Shoulders'],
    purpose: 'Opens overhead shoulder flexion angle and thoracic extension required for handstands and straight-arm levers.',
    cues: [
      'Start on hands and knees, keeping hips stacked directly over knees',
      'Walk hands forward and melt your chest towards the floor with arms straight',
      'Press palms flat or use fingertips to emphasize lat length'
    ],
    intensity: 'Moderate Lengthening',
    illustrationType: 'puppy-pose',
    demoVideoUrl: 'https://www.youtube.com/results?search_query=puppy+pose+thoracic+lat+stretch+handstand+mobility'
  },
  {
    id: 'str-overhead-tricep-side-bend',
    name: 'Overhead Triceps & Lat Side Bend Stretch',
    category: 'upper_body',
    categoryLabel: 'Upper Body',
    target: '30s each side',
    focusArea: ['Triceps Long Head', 'Lats', 'Serratus', 'Intercostals'],
    purpose: 'Lengthens the long head of the triceps which crosses both shoulder and elbow joints, reducing elbow tendon strain.',
    cues: [
      'Reach one arm overhead and bend elbow so hand drops behind neck',
      'Use opposite hand to gently guide elbow back and slightly across',
      'Add a gentle torso lean away from the stretched side to deepen the lat stretch'
    ],
    intensity: 'Gentle Decompression',
    illustrationType: 'tricep-stretch',
    demoVideoUrl: 'https://www.youtube.com/results?search_query=overhead+tricep+lat+stretch'
  },

  // 2. Wrists, Forearms & Elbow Care
  {
    id: 'str-kneeling-wrist-flexor-stretch',
    name: 'Kneeling Reverse Palm Wrist Flexor Stretch',
    category: 'wrist_forearm',
    categoryLabel: 'Wrists & Forearms',
    target: '30 - 45 seconds',
    focusArea: ['Forearm Flexors', 'Carpal Tunnel', 'Finger Tendons'],
    purpose: 'Releases high isometric forearm pump and tendon strain from heavy bar gripping and false grip training.',
    cues: [
      'Kneel on floor and place palms flat with fingers pointed back toward your knees',
      'Keep elbows locked and heels of hands grounded',
      'Gently shift weight back onto your heels until tension is felt through the inner forearm'
    ],
    intensity: 'Moderate Lengthening',
    illustrationType: 'wrist-flexor',
    demoVideoUrl: 'https://www.youtube.com/results?search_query=wrist+flexor+stretch+calisthenics+rehab'
  },
  {
    id: 'str-reverse-wrist-extensor-stretch',
    name: 'Back-of-Hand Flexion Decompression Stretch',
    category: 'wrist_forearm',
    categoryLabel: 'Wrists & Forearms',
    target: '30 seconds',
    focusArea: ['Forearm Extensors', 'Dorsal Wrist Ligaments'],
    purpose: 'Balancing stretch for wrist extensors and posterior joint capsule after heavy compression loads.',
    cues: [
      'Place the tops of your hands on the mat with fingers pointing toward your knees',
      'Keep arms straight and softly curl fingers into a partial fist to increase stretch',
      'Apply light pressure only; never force into sharp joint pinching'
    ],
    intensity: 'Gentle Decompression',
    illustrationType: 'wrist-extensor',
    demoVideoUrl: 'https://www.youtube.com/results?search_query=wrist+extensor+stretch+calisthenics'
  },

  // 3. Spine, Core & Hip Flexors
  {
    id: 'str-cobra-upward-dog',
    name: 'Cobra / Upward Dog Spinal Extension Stretch',
    category: 'spine_hips',
    categoryLabel: 'Spine & Hips',
    target: '30 - 45 seconds',
    focusArea: ['Rectus Abdominis', 'Hip Flexors', 'Lumbar Articulation'],
    purpose: 'Releases intense abdominal contraction from hollow body holds, L-sits, and dragon flags.',
    cues: [
      'Lie face down, place hands beneath shoulders, and press palms down to lift chest',
      'Keep shoulders drawn down away from ears and lengthen through the crown of your head',
      'Squeeze glutes lightly to protect the lower spine while lengthening the anterior core'
    ],
    intensity: 'Moderate Lengthening',
    illustrationType: 'cobra-stretch',
    demoVideoUrl: 'https://www.youtube.com/results?search_query=cobra+stretch+abdominal+calisthenics'
  },
  {
    id: 'str-couch-stretch-hip-flexor',
    name: 'Couch / Wall Quad & Psoas Stretch',
    category: 'spine_hips',
    categoryLabel: 'Spine & Hips',
    target: '45 - 60s per leg',
    focusArea: ['Psoas', 'Rectus Femoris', 'Hip Capsule'],
    purpose: 'Deep release for chronically tight hip flexors to restore neutral pelvic alignment for handstands.',
    cues: [
      'Place back knee against wall with shin vertical and foot pointing up',
      'Step other foot forward into a lunge and bring torso upright',
      'Squeeze the glute of the rear leg to push hips forward into posterior tilt'
    ],
    intensity: 'Deep Mobility',
    illustrationType: 'couch-stretch',
    demoVideoUrl: 'https://www.youtube.com/results?search_query=couch+stretch+hip+flexor+mobility'
  },
  {
    id: 'str-pigeon-pose',
    name: 'Pigeon Pose (Glute & Piriformis Stretch)',
    category: 'spine_hips',
    categoryLabel: 'Spine & Hips',
    target: '45 - 60s per side',
    focusArea: ['Gluteus Medius', 'Piriformis', 'IT Band', 'Deep Rotators'],
    purpose: 'Releases deep hip rotators and glutes loaded during squats, pistols, and core stabilization.',
    cues: [
      'Bring one knee forward behind wrist and angle shin across the mat',
      'Extend opposite leg straight back with hips square to the floor',
      'Fold upper body forward over the front shin as comfortable'
    ],
    intensity: 'Moderate Lengthening',
    illustrationType: 'pigeon-pose',
    demoVideoUrl: 'https://www.youtube.com/results?search_query=pigeon+pose+glute+stretch+calisthenics'
  },

  // 4. Lower Body, Hamstrings & Ankles
  {
    id: 'str-seated-pike-hamstring',
    name: 'Seated Pike & Hamstring Fold',
    category: 'lower_body',
    categoryLabel: 'Lower Body',
    target: '45 - 60 seconds',
    focusArea: ['Hamstrings', 'Calves', 'Thoracolumbar Fascia'],
    purpose: 'Crucial for pike presses, toe-to-bar compression, L-sits, and manna progression flexibility.',
    cues: [
      'Sit tall with legs straight together out in front and feet flexed or pointed',
      'Hinge at hips to reach hands toward toes while keeping spine long',
      'Relax neck and breathe deeply into the posterior chain tension on each exhale'
    ],
    intensity: 'Deep Mobility',
    illustrationType: 'pike-fold',
    demoVideoUrl: 'https://www.youtube.com/results?search_query=seated+pike+stretch+calisthenics+compression'
  },
  {
    id: 'str-straddle-pancake',
    name: 'Seated Straddle Pancake Stretch',
    category: 'lower_body',
    categoryLabel: 'Lower Body',
    target: '45 - 60 seconds',
    focusArea: ['Adductors / Groin', 'Hamstrings', 'Pelvic Mobility'],
    purpose: 'Foundational mobility for straddle planche, straddle front lever, and stalder press.',
    cues: [
      'Open legs wide in a comfortable V-straddle with knees and toes pointing up',
      'Rotate pelvis forward and walk hands out along the floor between legs',
      'Keep quads engaged to encourage reciprocal inhibition of the inner thighs'
    ],
    intensity: 'Deep Mobility',
    illustrationType: 'straddle-pancake',
    demoVideoUrl: 'https://www.youtube.com/results?search_query=straddle+pancake+stretch+calisthenics+mobility'
  },
  {
    id: 'str-wall-calf-ankle-dorsiflexion',
    name: 'Wall Calf & Ankle Dorsiflexion Stretch',
    category: 'lower_body',
    categoryLabel: 'Lower Body',
    target: '30s straight leg + 30s bent knee per side',
    focusArea: ['Gastrocnemius', 'Soleus', 'Achilles Tendon', 'Ankle Capsule'],
    purpose: 'Restores ankle range of motion required for deep pistols, lunges, and jump landings.',
    cues: [
      'Step back leg straight behind with heel planted flat on the floor (gastrocnemius)',
      'Bend both knees slightly while keeping heel down to target deeper soleus and Achilles',
      'Keep hips square and press chest toward the wall'
    ],
    intensity: 'Gentle Decompression',
    illustrationType: 'calf-stretch',
    demoVideoUrl: 'https://www.youtube.com/results?search_query=calf+achilles+stretch+ankle+mobility'
  }
];
