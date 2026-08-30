import React from 'react';

interface IllustrationProps {
  type: string;
  className?: string;
  accentColor?: string;
  showMuscleHighlight?: boolean;
}

export const BiomechanicalIllustration: React.FC<IllustrationProps> = ({
  type,
  className = 'w-full h-48',
  accentColor = '#D1FF00',
  showMuscleHighlight = true,
}) => {
  // Common theme colors
  const primaryStroke = '#F4F4F5'; // zinc-100
  const secondaryStroke = '#71717A'; // zinc-500
  const apparatusColor = '#27272A'; // zinc-800
  const highlightGlow = accentColor;

  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-lg bg-[#0A0A0A] border border-[#222222] p-3 ${className}`}>
      {/* Background geometric grid markings */}
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={`grid-${type}`} width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#27272A" strokeWidth="0.75" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${type})`} />
      </svg>

      {/* SVG Canvas */}
      <svg
        viewBox="0 0 280 200"
        className="w-full h-full max-h-56 select-none relative z-10 filter drop-shadow-sm"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`grad-body-${type}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#A1A1AA" />
          </linearGradient>
          <linearGradient id={`grad-highlight-${type}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={highlightGlow} stopOpacity="0.9" />
            <stop offset="100%" stopColor="#D1FF00" stopOpacity="0.7" />
          </linearGradient>
          <filter id={`glow-${type}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {renderFigureContent(type, primaryStroke, secondaryStroke, apparatusColor, highlightGlow, showMuscleHighlight, `glow-${type}`)}
      </svg>
    </div>
  );
};

function renderFigureContent(
  type: string,
  primary: string,
  secondary: string,
  apparatus: string,
  highlight: string,
  showHighlight: boolean,
  glowId: string
) {
  switch (type) {
    // ----------------- PULL MOVEMENTS -----------------
    case 'scapular-pull':
    case 'strict-pull-up':
      return (
        <g id="strict-pullup-svg">
          {/* Pull-Up Bar */}
          <line x1="40" y1="30" x2="240" y2="30" stroke={apparatus} strokeWidth="6" strokeLinecap="round" />
          <circle cx="110" cy="30" r="4" fill={apparatus} />
          <circle cx="170" cy="30" r="4" fill={apparatus} />

          {/* Arms */}
          <path d="M 110 30 L 122 65" stroke={primary} strokeWidth="5" strokeLinecap="round" />
          <path d="M 170 30 L 158 65" stroke={primary} strokeWidth="5" strokeLinecap="round" />

          {/* Head & Neck */}
          <circle cx="140" cy="42" r="12" fill="none" stroke={primary} strokeWidth="4" />
          
          {/* Torso */}
          <path d="M 122 65 Q 140 68 158 65 L 150 115 Q 140 118 130 115 Z" fill="none" stroke={primary} strokeWidth="4" />
          
          {/* Muscle Engagement Highlight (Lats) */}
          {showHighlight && (
            <path
              d="M 124 72 Q 133 90 131 108 M 156 72 Q 147 90 149 108"
              stroke={highlight}
              strokeWidth="4.5"
              strokeLinecap="round"
              filter={`url(#${glowId})`}
            />
          )}

          {/* Legs in slight hollow */}
          <path d="M 133 116 L 136 160 L 138 185" stroke={primary} strokeWidth="4.5" strokeLinecap="round" />
          <path d="M 147 116 L 144 160 L 142 185" stroke={primary} strokeWidth="4.5" strokeLinecap="round" />
          
          {/* Range Arrow */}
          <path d="M 90 75 L 90 45 M 86 52 L 90 44 L 94 52" stroke={highlight} strokeWidth="2.5" strokeLinecap="round" />
          <text x="50" y="62" fill={secondary} fontSize="9" fontFamily="sans-serif">CHIN OVER</text>
        </g>
      );

    case 'inverted-row':
      return (
        <g id="inverted-row-svg">
          {/* Low Bar */}
          <line x1="60" y1="60" x2="220" y2="60" stroke={apparatus} strokeWidth="6" strokeLinecap="round" />
          
          {/* Hands gripping bar */}
          <circle cx="130" cy="60" r="4" fill={apparatus} />
          
          {/* Arms pulling up */}
          <path d="M 130 60 L 135 85" stroke={primary} strokeWidth="5" strokeLinecap="round" />
          
          {/* Head */}
          <circle cx="105" cy="80" r="11" fill="none" stroke={primary} strokeWidth="4" />
          
          {/* Torso angled plank */}
          <path d="M 118 84 L 175 125" stroke={primary} strokeWidth="12" strokeLinecap="round" />
          
          {/* Legs angled to floor */}
          <path d="M 175 125 L 225 155" stroke={primary} strokeWidth="8" strokeLinecap="round" />
          <path d="M 225 155 L 235 155" stroke={secondary} strokeWidth="5" strokeLinecap="round" />
          
          {/* Floor */}
          <line x1="30" y1="160" x2="250" y2="160" stroke={secondary} strokeWidth="2" strokeDasharray="4 4" />
          
          {/* Highlight (Rhomboids/Lats) */}
          {showHighlight && (
            <line x1="125" y1="88" x2="165" y2="118" stroke={highlight} strokeWidth="4" strokeLinecap="round" filter={`url(#${glowId})`} />
          )}
        </g>
      );

    case 'negative-pull-up':
    case 'chest-to-bar':
      return (
        <g id="chest-to-bar-svg">
          {/* Bar */}
          <line x1="40" y1="45" x2="240" y2="45" stroke={apparatus} strokeWidth="6" strokeLinecap="round" />
          
          {/* Head ABOVE Bar */}
          <circle cx="140" cy="22" r="12" fill="none" stroke={primary} strokeWidth="4" />
          
          {/* Arms deep pull */}
          <path d="M 105 45 L 120 40 L 125 58" stroke={primary} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 175 45 L 160 40 L 155 58" stroke={primary} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          
          {/* Chest touching bar */}
          <path d="M 125 58 Q 140 52 155 58 L 148 108 L 132 108 Z" fill="none" stroke={primary} strokeWidth="4" />
          
          {/* Lower body */}
          <path d="M 134 108 L 136 155 L 138 185" stroke={primary} strokeWidth="4.5" strokeLinecap="round" />
          <path d="M 146 108 L 144 155 L 142 185" stroke={primary} strokeWidth="4.5" strokeLinecap="round" />

          {/* Highlight (Explosive Lats & Upper Back) */}
          {showHighlight && (
            <circle cx="140" cy="50" r="14" stroke={highlight} strokeWidth="2.5" strokeDasharray="3 3" filter={`url(#${glowId})`} />
          )}
        </g>
      );

    case 'l-sit-pull-up':
      return (
        <g id="l-sit-pullup-svg">
          {/* Bar */}
          <line x1="40" y1="28" x2="240" y2="28" stroke={apparatus} strokeWidth="6" strokeLinecap="round" />
          {/* Head & Arms */}
          <circle cx="115" cy="42" r="11" fill="none" stroke={primary} strokeWidth="4" />
          <path d="M 100 28 L 105 60" stroke={primary} strokeWidth="5" strokeLinecap="round" />
          <path d="M 130 28 L 125 60" stroke={primary} strokeWidth="5" strokeLinecap="round" />
          {/* Torso */}
          <path d="M 115 58 L 115 110" stroke={primary} strokeWidth="10" strokeLinecap="round" />
          {/* Legs extended 90 degrees */}
          <path d="M 115 110 L 180 110" stroke={primary} strokeWidth="8" strokeLinecap="round" />
          {/* 90 deg angle arc */}
          <path d="M 130 110 A 15 15 0 0 1 115 125" stroke={highlight} strokeWidth="2" fill="none" />
          <text x="130" y="130" fill={highlight} fontSize="10" fontFamily="sans-serif">90°</text>
        </g>
      );

    case 'muscle-up-transition':
    case 'strict-muscle-up':
      return (
        <g id="muscle-up-svg">
          {/* Bar */}
          <line x1="30" y1="80" x2="250" y2="80" stroke={apparatus} strokeWidth="6" strokeLinecap="round" />
          {/* Torso above bar */}
          <circle cx="140" cy="30" r="12" fill="none" stroke={primary} strokeWidth="4" />
          <path d="M 140 45 L 140 95" stroke={primary} strokeWidth="11" strokeLinecap="round" />
          {/* Arms in straight bar dip lockout */}
          <path d="M 110 80 L 125 55" stroke={primary} strokeWidth="5" strokeLinecap="round" />
          <path d="M 170 80 L 155 55" stroke={primary} strokeWidth="5" strokeLinecap="round" />
          {/* Legs hanging slightly forward */}
          <path d="M 140 95 L 145 140 L 150 180" stroke={primary} strokeWidth="5" strokeLinecap="round" />
          {/* Dynamic power aura */}
          {showHighlight && (
            <path d="M 100 80 Q 140 60 180 80" stroke={highlight} strokeWidth="3" strokeDasharray="3 3" filter={`url(#${glowId})`} />
          )}
        </g>
      );

    // ----------------- PUSH MOVEMENTS & PLANCHE -----------------
    case 'incline-pushup':
      return (
        <g id="incline-pushup-svg">
          {/* Bench */}
          <path d="M 50 110 L 110 110 L 110 160 M 50 110 L 50 160" stroke={apparatus} strokeWidth="5" strokeLinecap="round" />
          {/* Hands on bench */}
          <circle cx="95" cy="110" r="4" fill={apparatus} />
          {/* Arms */}
          <path d="M 95 110 L 110 95" stroke={primary} strokeWidth="4.5" strokeLinecap="round" />
          {/* Head & Body */}
          <circle cx="100" cy="78" r="10" fill="none" stroke={primary} strokeWidth="4" />
          <path d="M 110 95 L 205 145" stroke={primary} strokeWidth="10" strokeLinecap="round" />
          <line x1="30" y1="160" x2="250" y2="160" stroke={secondary} strokeWidth="2" />
        </g>
      );

    case 'strict-pushup':
    case 'diamond-pushup':
      return (
        <g id="strict-pushup-svg">
          {/* Floor */}
          <line x1="30" y1="150" x2="250" y2="150" stroke={apparatus} strokeWidth="4" strokeLinecap="round" />
          {/* Hands */}
          <circle cx="85" cy="150" r="4" fill={apparatus} />
          {/* Vertical arms (lockout) */}
          <path d="M 85 150 L 85 105" stroke={primary} strokeWidth="5" strokeLinecap="round" />
          {/* Head */}
          <circle cx="68" cy="100" r="10" fill="none" stroke={primary} strokeWidth="4" />
          {/* Rigid horizontal plank */}
          <path d="M 85 105 L 210 135" stroke={primary} strokeWidth="10" strokeLinecap="round" />
          {/* Feet on floor */}
          <circle cx="210" cy="148" r="3" fill={apparatus} />
          {/* Protraction dome highlight */}
          {showHighlight && (
            <path d="M 75 98 Q 90 90 110 102" stroke={highlight} strokeWidth="3" fill="none" filter={`url(#${glowId})`} />
          )}
        </g>
      );

    case 'pppu':
      return (
        <g id="pppu-svg">
          {/* Floor */}
          <line x1="30" y1="150" x2="250" y2="150" stroke={apparatus} strokeWidth="4" strokeLinecap="round" />
          {/* Hands at hip level */}
          <circle cx="115" cy="150" r="4" fill={apparatus} />
          {/* Deep forward lean arm */}
          <path d="M 115 150 L 75 105" stroke={primary} strokeWidth="5" strokeLinecap="round" />
          {/* Head forward of hands */}
          <circle cx="55" cy="100" r="10" fill="none" stroke={primary} strokeWidth="4" />
          {/* Body plank */}
          <path d="M 75 105 L 215 138" stroke={primary} strokeWidth="9" strokeLinecap="round" />
          {/* Lean angle indicator */}
          <line x1="115" y1="150" x2="115" y2="105" stroke={secondary} strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M 115 125 A 25 25 0 0 0 95 125" stroke={highlight} strokeWidth="2" fill="none" />
          <text x="122" y="125" fill={highlight} fontSize="9" fontFamily="sans-serif">DEEP LEAN</text>
        </g>
      );

    case 'tuck-planche':
      return (
        <g id="tuck-planche-svg">
          {/* Parallettes / Floor */}
          <line x1="50" y1="155" x2="230" y2="155" stroke={apparatus} strokeWidth="4" strokeLinecap="round" />
          {/* Hands on blocks */}
          <rect x="110" y="145" width="16" height="10" rx="3" fill={apparatus} />
          {/* Straight arm with forward shoulder lean */}
          <path d="M 118 145 L 90 95" stroke={primary} strokeWidth="5.5" strokeLinecap="round" />
          {/* Head */}
          <circle cx="70" cy="90" r="11" fill="none" stroke={primary} strokeWidth="4" />
          {/* Rounded tucked torso */}
          <path d="M 90 95 Q 130 75 145 95" stroke={primary} strokeWidth="9" strokeLinecap="round" />
          {/* Knees tucked tight to chest */}
          <path d="M 145 95 Q 120 120 105 105" stroke={primary} strokeWidth="7" strokeLinecap="round" />
          {/* Scapular protraction highlight */}
          {showHighlight && (
            <path d="M 80 88 Q 110 70 140 85" stroke={highlight} strokeWidth="3" fill="none" filter={`url(#${glowId})`} />
          )}
          <text x="160" y="140" fill={secondary} fontSize="9" fontFamily="sans-serif">FEET OFF FLOOR</text>
        </g>
      );

    case 'adv-tuck-planche':
      return (
        <g id="adv-tuck-planche-svg">
          <line x1="40" y1="155" x2="240" y2="155" stroke={apparatus} strokeWidth="4" strokeLinecap="round" />
          <rect x="105" y="145" width="16" height="10" rx="3" fill={apparatus} />
          {/* Arm straight */}
          <path d="M 113 145 L 80 95" stroke={primary} strokeWidth="5.5" strokeLinecap="round" />
          <circle cx="60" cy="90" r="11" fill="none" stroke={primary} strokeWidth="4" />
          {/* Flat horizontal back */}
          <path d="M 80 95 L 155 95" stroke={primary} strokeWidth="10" strokeLinecap="round" />
          {/* Thighs at 90 degrees */}
          <path d="M 155 95 L 155 130 L 135 130" stroke={primary} strokeWidth="6.5" strokeLinecap="round" />
          {/* 90 deg hip guide */}
          <text x="165" y="115" fill={highlight} fontSize="9" fontFamily="sans-serif">90° FLAT BACK</text>
        </g>
      );

    case 'straddle-planche':
    case 'full-planche':
      return (
        <g id="full-planche-svg">
          {/* Floor baseline */}
          <line x1="30" y1="160" x2="250" y2="160" stroke={apparatus} strokeWidth="4" strokeLinecap="round" />
          <rect x="95" y="150" width="16" height="10" rx="3" fill={apparatus} />
          {/* Arms with intense forward lean */}
          <path d="M 103 150 L 65 95" stroke={primary} strokeWidth="5.5" strokeLinecap="round" />
          {/* Head looking forward */}
          <circle cx="45" cy="90" r="11" fill="none" stroke={primary} strokeWidth="4" />
          {/* Straight horizontal arrow-straight body */}
          <path d="M 65 95 L 215 95" stroke={primary} strokeWidth="9" strokeLinecap="round" />
          {/* Feet floating parallel to ground */}
          <line x1="65" y1="95" x2="230" y2="95" stroke={highlight} strokeWidth="1.5" strokeDasharray="3 3" />
          <text x="130" y="80" fill={highlight} fontSize="10" fontWeight="bold" fontFamily="sans-serif">180° HORIZONTAL</text>
        </g>
      );

    // ----------------- DIPS -----------------
    case 'bench-dip':
      return (
        <g id="bench-dip-svg">
          {/* Bench */}
          <rect x="50" y="100" width="40" height="60" fill={apparatus} rx="3" />
          <circle cx="75" cy="100" r="4" fill={primary} />
          {/* Bent 90 deg arms */}
          <path d="M 75 100 L 75 120 L 95 110" stroke={primary} strokeWidth="4.5" strokeLinecap="round" />
          {/* Head & Torso */}
          <circle cx="95" cy="85" r="10" fill="none" stroke={primary} strokeWidth="4" />
          <path d="M 95 110 L 95 140" stroke={primary} strokeWidth="9" strokeLinecap="round" />
          {/* Legs extended to floor */}
          <path d="M 95 140 L 175 160" stroke={primary} strokeWidth="6" strokeLinecap="round" />
          <line x1="30" y1="160" x2="250" y2="160" stroke={secondary} strokeWidth="2" />
        </g>
      );

    case 'pbar-support':
    case 'negative-dip':
    case 'strict-dip':
      return (
        <g id="strict-dip-svg">
          {/* Parallel Bars */}
          <line x1="80" y1="110" x2="200" y2="110" stroke={apparatus} strokeWidth="6" strokeLinecap="round" />
          <line x1="100" y1="110" x2="100" y2="175" stroke={apparatus} strokeWidth="4" />
          <line x1="180" y1="110" x2="180" y2="175" stroke={apparatus} strokeWidth="4" />
          
          {/* Hands */}
          <circle cx="130" cy="110" r="4" fill={apparatus} />
          {/* Bent elbows 90 degrees */}
          <path d="M 130 110 L 115 130 L 140 100" stroke={primary} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Head & Torso with slight forward lean */}
          <circle cx="150" cy="75" r="11" fill="none" stroke={primary} strokeWidth="4" />
          <path d="M 140 100 L 130 145" stroke={primary} strokeWidth="9" strokeLinecap="round" />
          {/* Legs folded or hollow */}
          <path d="M 130 145 L 125 175" stroke={primary} strokeWidth="6" strokeLinecap="round" />
          {/* Depth angle badge */}
          {showHighlight && (
            <path d="M 115 130 A 15 15 0 0 0 130 110" stroke={highlight} strokeWidth="2" fill="none" />
          )}
          <text x="60" y="135" fill={highlight} fontSize="9" fontFamily="sans-serif">&gt;90° DEPTH</text>
        </g>
      );

    case 'straight-bar-dip':
      return (
        <g id="straight-bar-dip-svg">
          <line x1="40" y1="100" x2="240" y2="100" stroke={apparatus} strokeWidth="6" strokeLinecap="round" />
          <circle cx="140" cy="70" r="11" fill="none" stroke={primary} strokeWidth="4" />
          <path d="M 140 85 L 135 125" stroke={primary} strokeWidth="9" strokeLinecap="round" />
          <path d="M 115 100 L 130 85" stroke={primary} strokeWidth="5" strokeLinecap="round" />
          <path d="M 165 100 L 150 85" stroke={primary} strokeWidth="5" strokeLinecap="round" />
          <path d="M 135 125 L 150 165" stroke={primary} strokeWidth="6" strokeLinecap="round" />
        </g>
      );

    case 'ring-dip':
    case 'ring-dip-rto':
      return (
        <g id="ring-dip-svg">
          {/* Ring Straps & Rings */}
          <line x1="110" y1="20" x2="110" y2="85" stroke={apparatus} strokeWidth="2.5" />
          <line x1="170" y1="20" x2="170" y2="85" stroke={apparatus} strokeWidth="2.5" />
          <circle cx="110" cy="95" r="10" stroke={apparatus} strokeWidth="4" fill="none" />
          <circle cx="170" cy="95" r="10" stroke={apparatus} strokeWidth="4" fill="none" />

          {/* Athlete in locked support with rings turned out */}
          <circle cx="140" cy="55" r="11" fill="none" stroke={primary} strokeWidth="4" />
          <path d="M 110 95 L 125 70" stroke={primary} strokeWidth="5" strokeLinecap="round" />
          <path d="M 170 95 L 155 70" stroke={primary} strokeWidth="5" strokeLinecap="round" />
          <path d="M 140 75 L 140 130" stroke={primary} strokeWidth="9" strokeLinecap="round" />
          <path d="M 140 130 L 140 175" stroke={primary} strokeWidth="6" strokeLinecap="round" />

          {showHighlight && (
            <text x="125" y="190" fill={highlight} fontSize="9" fontFamily="sans-serif">RTO 45°</text>
          )}
        </g>
      );

    // ----------------- HANDSTAND & HSPU -----------------
    case 'elevated-pike':
      return (
        <g id="elevated-pike-svg">
          {/* Elevated Box */}
          <rect x="180" y="110" width="50" height="50" fill={apparatus} rx="3" />
          <line x1="30" y1="160" x2="250" y2="160" stroke={secondary} strokeWidth="2" />
          {/* Hands on floor */}
          <circle cx="90" cy="160" r="4" fill={apparatus} />
          {/* Arms stacked */}
          <path d="M 90 160 L 90 110" stroke={primary} strokeWidth="5" strokeLinecap="round" />
          {/* Head & Vertical Torso */}
          <circle cx="80" cy="115" r="10" fill="none" stroke={primary} strokeWidth="4" />
          <path d="M 90 110 L 105 75" stroke={primary} strokeWidth="8" strokeLinecap="round" />
          {/* Legs straight to box */}
          <path d="M 105 75 L 195 110" stroke={primary} strokeWidth="7" strokeLinecap="round" />
          {/* Stacked indicator */}
          <line x1="90" y1="160" x2="105" y2="75" stroke={highlight} strokeWidth="1.5" strokeDasharray="3 3" />
        </g>
      );

    case 'wall-handstand':
    case 'wall-hspu':
      return (
        <g id="wall-handstand-svg">
          {/* Floor & Wall */}
          <line x1="40" y1="170" x2="240" y2="170" stroke={apparatus} strokeWidth="4" />
          <line x1="160" y1="20" x2="160" y2="170" stroke={apparatus} strokeWidth="5" />
          {/* Hands close to wall */}
          <circle cx="140" cy="170" r="4" fill={apparatus} />
          {/* Arms */}
          <path d="M 140 170 L 142 125" stroke={primary} strokeWidth="5" strokeLinecap="round" />
          {/* Head facing wall */}
          <circle cx="150" cy="125" r="9" fill="none" stroke={primary} strokeWidth="3.5" />
          {/* Straight body touching wall at toes/chest */}
          <path d="M 142 125 L 148 70 L 152 35" stroke={primary} strokeWidth="7" strokeLinecap="round" />
          <text x="70" y="80" fill={highlight} fontSize="9" fontFamily="sans-serif">CHEST TO WALL</text>
        </g>
      );

    case 'freestanding-handstand':
    case 'freestanding-hspu':
      return (
        <g id="freestanding-handstand-svg">
          {/* Floor */}
          <line x1="40" y1="175" x2="240" y2="175" stroke={apparatus} strokeWidth="4" strokeLinecap="round" />
          {/* Hands */}
          <circle cx="130" cy="175" r="4" fill={apparatus} />
          <circle cx="150" cy="175" r="4" fill={apparatus} />
          {/* Straight Arms */}
          <path d="M 130 175 L 135 135" stroke={primary} strokeWidth="4.5" strokeLinecap="round" />
          <path d="M 150 175 L 145 135" stroke={primary} strokeWidth="4.5" strokeLinecap="round" />
          {/* Head neutral */}
          <circle cx="140" cy="130" r="10" fill="none" stroke={primary} strokeWidth="4" />
          {/* Perfectly stacked vertical line */}
          <path d="M 140 120 L 140 75 L 140 30" stroke={primary} strokeWidth="8" strokeLinecap="round" />
          {/* Plumb alignment guideline */}
          <line x1="140" y1="20" x2="140" y2="175" stroke={highlight} strokeWidth="1.5" strokeDasharray="3 3" />
          <text x="155" y="50" fill={highlight} fontSize="9" fontFamily="sans-serif">STACKED LINE</text>
        </g>
      );

    case 'ninety-degree-pushup':
      return (
        <g id="ninety-degree-svg">
          <line x1="40" y1="160" x2="240" y2="160" stroke={apparatus} strokeWidth="4" strokeLinecap="round" />
          <rect x="110" y="150" width="16" height="10" rx="3" fill={apparatus} />
          {/* 90 deg bent elbow with body horizontal */}
          <path d="M 118 150 L 118 120 L 138 120" stroke={primary} strokeWidth="5" strokeLinecap="round" />
          <circle cx="100" cy="120" r="10" fill="none" stroke={primary} strokeWidth="4" />
          <path d="M 138 120 L 210 120" stroke={primary} strokeWidth="8" strokeLinecap="round" />
          <path d="M 118 120 L 140 60" stroke={highlight} strokeWidth="2" strokeDasharray="3 3" />
        </g>
      );

    // ----------------- FRONT LEVER -----------------
    case 'dragon-flag':
      return (
        <g id="dragon-flag-svg">
          <rect x="40" y="130" width="160" height="20" fill={apparatus} rx="3" />
          {/* Hand holding edge behind head */}
          <circle cx="60" cy="125" r="4" fill={apparatus} />
          {/* Pivot on upper back/traps */}
          <circle cx="75" cy="125" r="10" fill="none" stroke={primary} strokeWidth="4" />
          {/* Body lever elevated 30-40 degrees */}
          <path d="M 80 125 L 180 75" stroke={primary} strokeWidth="9" strokeLinecap="round" />
          {showHighlight && (
            <path d="M 95 120 L 155 88" stroke={highlight} strokeWidth="3.5" filter={`url(#${glowId})`} />
          )}
        </g>
      );

    case 'tuck-front-lever':
      return (
        <g id="tuck-front-lever-svg">
          <line x1="40" y1="35" x2="240" y2="35" stroke={apparatus} strokeWidth="6" strokeLinecap="round" />
          <circle cx="140" cy="35" r="4" fill={apparatus} />
          {/* Vertical straight arms pulling down */}
          <path d="M 140 35 L 140 85" stroke={primary} strokeWidth="5.5" strokeLinecap="round" />
          {/* Head */}
          <circle cx="105" cy="85" r="11" fill="none" stroke={primary} strokeWidth="4" />
          {/* Horizontal torso */}
          <path d="M 120 85 L 180 85" stroke={primary} strokeWidth="9" strokeLinecap="round" />
          {/* Knees tucked under */}
          <path d="M 180 85 Q 160 115 145 95" stroke={primary} strokeWidth="7" strokeLinecap="round" />
          {showHighlight && (
            <line x1="125" y1="78" x2="165" y2="78" stroke={highlight} strokeWidth="3" filter={`url(#${glowId})`} />
          )}
        </g>
      );

    case 'adv-tuck-front-lever':
    case 'single-leg-front-lever':
      return (
        <g id="adv-tuck-fl-svg">
          <line x1="40" y1="35" x2="240" y2="35" stroke={apparatus} strokeWidth="6" strokeLinecap="round" />
          <path d="M 135 35 L 135 85" stroke={primary} strokeWidth="5.5" strokeLinecap="round" />
          <circle cx="100" cy="85" r="11" fill="none" stroke={primary} strokeWidth="4" />
          {/* Flat horizontal back */}
          <path d="M 115 85 L 185 85" stroke={primary} strokeWidth="9" strokeLinecap="round" />
          {/* 90 deg thighs */}
          <path d="M 185 85 L 185 125 L 165 125" stroke={primary} strokeWidth="6.5" strokeLinecap="round" />
          <text x="110" y="70" fill={highlight} fontSize="9" fontFamily="sans-serif">LATS LOCKED</text>
        </g>
      );

    case 'straddle-front-lever':
    case 'full-front-lever':
    case 'front-lever-pullup':
      return (
        <g id="full-fl-svg">
          <line x1="30" y1="35" x2="250" y2="35" stroke={apparatus} strokeWidth="6" strokeLinecap="round" />
          <circle cx="115" cy="35" r="4" fill={apparatus} />
          {/* Straight arm */}
          <path d="M 115 35 L 115 90" stroke={primary} strokeWidth="5.5" strokeLinecap="round" />
          {/* Head */}
          <circle cx="80" cy="90" r="11" fill="none" stroke={primary} strokeWidth="4" />
          {/* Perfect 180 horizontal board */}
          <path d="M 95 90 L 235 90" stroke={primary} strokeWidth="9" strokeLinecap="round" />
          {/* Parallel level guide */}
          <line x1="60" y1="90" x2="240" y2="90" stroke={highlight} strokeWidth="1.5" strokeDasharray="3 3" />
          <text x="140" y="75" fill={highlight} fontSize="10" fontWeight="bold" fontFamily="sans-serif">HORIZONTAL PLANE</text>
        </g>
      );

    // ----------------- L-SIT, V-SIT, MANNA -----------------
    case 'pike-lifts':
      return (
        <g id="pike-lifts-svg">
          <line x1="30" y1="150" x2="250" y2="150" stroke={secondary} strokeWidth="2" />
          <circle cx="100" cy="95" r="10" fill="none" stroke={primary} strokeWidth="4" />
          <path d="M 100 110 L 105 150" stroke={primary} strokeWidth="9" strokeLinecap="round" />
          <path d="M 105 150 L 180 135" stroke={primary} strokeWidth="7" strokeLinecap="round" />
          {/* Hands forward past knees */}
          <path d="M 100 120 L 135 150" stroke={primary} strokeWidth="4" strokeLinecap="round" />
          <circle cx="135" cy="150" r="4" fill={apparatus} />
        </g>
      );

    case 'tuck-l-sit':
    case 'full-l-sit':
    case 'straddle-l-sit':
      return (
        <g id="full-l-sit-svg">
          <line x1="30" y1="160" x2="250" y2="160" stroke={apparatus} strokeWidth="3" strokeLinecap="round" />
          {/* Hands flat on floor */}
          <circle cx="110" cy="160" r="4" fill={apparatus} />
          {/* Straight arm pushing up */}
          <path d="M 110 160 L 110 115" stroke={primary} strokeWidth="5" strokeLinecap="round" />
          {/* Head & Torso */}
          <circle cx="110" cy="85" r="10" fill="none" stroke={primary} strokeWidth="4" />
          <path d="M 110 100 L 110 135" stroke={primary} strokeWidth="9" strokeLinecap="round" />
          {/* Legs locked straight at 90 deg floating above floor */}
          <path d="M 110 135 L 195 135" stroke={primary} strokeWidth="7.5" strokeLinecap="round" />
          {/* Clearance gap arrow */}
          <line x1="150" y1="160" x2="150" y2="140" stroke={highlight} strokeWidth="2" strokeLinecap="round" />
          <text x="135" y="125" fill={highlight} fontSize="9" fontFamily="sans-serif">90° SUSPENSION</text>
        </g>
      );

    case 'v-sit':
      return (
        <g id="v-sit-svg">
          <line x1="30" y1="165" x2="250" y2="165" stroke={apparatus} strokeWidth="3" />
          <circle cx="110" cy="165" r="4" fill={apparatus} />
          <path d="M 110 165 L 105 125" stroke={primary} strokeWidth="5" strokeLinecap="round" />
          <circle cx="95" cy="98" r="10" fill="none" stroke={primary} strokeWidth="4" />
          {/* Torso leaning back slightly */}
          <path d="M 100 112 L 115 140" stroke={primary} strokeWidth="8" strokeLinecap="round" />
          {/* Legs clamped up at 50 degrees */}
          <path d="M 115 140 L 175 90" stroke={primary} strokeWidth="7.5" strokeLinecap="round" />
          <text x="145" y="75" fill={highlight} fontSize="10" fontWeight="bold" fontFamily="sans-serif">50° V-SHAPE</text>
        </g>
      );

    case 'manna':
      return (
        <g id="manna-svg">
          <line x1="30" y1="165" x2="250" y2="165" stroke={apparatus} strokeWidth="3" />
          <circle cx="130" cy="165" r="4" fill={apparatus} />
          {/* Deep shoulder extension behind body */}
          <path d="M 130 165 L 145 110" stroke={primary} strokeWidth="5" strokeLinecap="round" />
          <circle cx="155" cy="90" r="10" fill="none" stroke={primary} strokeWidth="4" />
          {/* Hips forward and elevated above shoulders */}
          <path d="M 145 110 L 120 90" stroke={primary} strokeWidth="8" strokeLinecap="round" />
          {/* Legs horizontal overhead */}
          <path d="M 120 90 L 50 90" stroke={primary} strokeWidth="7.5" strokeLinecap="round" />
          <text x="50" y="75" fill={highlight} fontSize="9" fontFamily="sans-serif">LEGS OVERHEAD</text>
        </g>
      );

    // ----------------- LEGS & PISTOL SQUAT -----------------
    case 'deep-squat':
      return (
        <g id="deep-squat-svg">
          <line x1="40" y1="165" x2="240" y2="165" stroke={apparatus} strokeWidth="4" />
          <circle cx="140" cy="80" r="10" fill="none" stroke={primary} strokeWidth="4" />
          <path d="M 140 95 L 140 130" stroke={primary} strokeWidth="8" strokeLinecap="round" />
          {/* Deep ATG folded legs */}
          <path d="M 140 130 L 120 155 L 135 165" stroke={primary} strokeWidth="6.5" strokeLinecap="round" />
          <path d="M 140 130 L 160 155 L 145 165" stroke={primary} strokeWidth="6.5" strokeLinecap="round" />
          <text x="100" y="65" fill={highlight} fontSize="9" fontFamily="sans-serif">ATG DEPTH</text>
        </g>
      );

    case 'cossack-squat':
      return (
        <g id="cossack-squat-svg">
          <line x1="30" y1="165" x2="250" y2="165" stroke={apparatus} strokeWidth="4" />
          <circle cx="95" cy="95" r="10" fill="none" stroke={primary} strokeWidth="4" />
          <path d="M 95 110 L 95 135" stroke={primary} strokeWidth="8" strokeLinecap="round" />
          {/* Working leg bent deep */}
          <path d="M 95 135 L 80 155 L 90 165" stroke={primary} strokeWidth="6.5" strokeLinecap="round" />
          {/* Other leg extended out straight with toes up */}
          <path d="M 95 135 L 180 165 L 185 155" stroke={primary} strokeWidth="6" strokeLinecap="round" />
        </g>
      );

    case 'box-step-down':
    case 'assisted-pistol':
    case 'strict-pistol':
    case 'weighted-pistol':
      return (
        <g id="strict-pistol-svg">
          {/* Floor */}
          <line x1="40" y1="165" x2="240" y2="165" stroke={apparatus} strokeWidth="4" />
          {/* Head & upright torso */}
          <circle cx="105" cy="85" r="10" fill="none" stroke={primary} strokeWidth="4" />
          {/* Arms extended forward for balance */}
          <path d="M 105 100 L 145 100" stroke={primary} strokeWidth="4.5" strokeLinecap="round" />
          <path d="M 105 100 L 100 135" stroke={primary} strokeWidth="8" strokeLinecap="round" />
          {/* Working single leg in rock bottom squat */}
          <path d="M 100 135 L 80 155 L 95 165" stroke={primary} strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Free leg pointing straight out in front */}
          <path d="M 100 135 L 180 135" stroke={primary} strokeWidth="6.5" strokeLinecap="round" />
          {/* Free leg parallel guide */}
          <line x1="100" y1="135" x2="190" y2="135" stroke={highlight} strokeWidth="1.5" strokeDasharray="3 3" />
          <text x="145" y="125" fill={highlight} fontSize="9" fontWeight="bold" fontFamily="sans-serif">FREE LEG ELEVATED</text>
        </g>
      );

    case 'shrimp-squat':
      return (
        <g id="shrimp-squat-svg">
          <line x1="40" y1="165" x2="240" y2="165" stroke={apparatus} strokeWidth="4" />
          <circle cx="110" cy="85" r="10" fill="none" stroke={primary} strokeWidth="4" />
          <path d="M 110 100 L 105 130" stroke={primary} strokeWidth="8" strokeLinecap="round" />
          {/* Working single leg */}
          <path d="M 105 130 L 95 155 L 105 165" stroke={primary} strokeWidth="6.5" strokeLinecap="round" />
          {/* Rear foot held behind touching knee to floor */}
          <path d="M 105 130 L 140 160 L 145 125 L 115 105" stroke={primary} strokeWidth="5" strokeLinecap="round" />
        </g>
      );

    default:
      return (
        <g id="generic-calisthenics-svg">
          <circle cx="140" cy="70" r="12" fill="none" stroke={primary} strokeWidth="4" />
          <path d="M 140 85 L 140 140" stroke={primary} strokeWidth="8" strokeLinecap="round" />
          <path d="M 140 100 L 110 115 M 140 100 L 170 115" stroke={primary} strokeWidth="5" strokeLinecap="round" />
          <path d="M 140 140 L 120 180 M 140 140 L 160 180" stroke={primary} strokeWidth="6" strokeLinecap="round" />
        </g>
      );
  }
}
