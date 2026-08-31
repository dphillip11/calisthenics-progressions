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

    case 'russian-push-up':
      return (
        <g id="russian-pushup-svg">
          {/* Floor */}
          <line x1="30" y1="155" x2="250" y2="155" stroke={apparatus} strokeWidth="4" strokeLinecap="round" />
          {/* Forearms flat on floor */}
          <path d="M 70 155 L 110 155" stroke={apparatus} strokeWidth="6" strokeLinecap="round" />
          {/* Elbow to shoulder transfer */}
          <path d="M 110 155 L 90 120" stroke={primary} strokeWidth="5.5" strokeLinecap="round" />
          {/* Head */}
          <circle cx="70" cy="115" r="10" fill="none" stroke={primary} strokeWidth="4" />
          {/* Plank torso */}
          <path d="M 90 120 L 215 145" stroke={primary} strokeWidth="9" strokeLinecap="round" />
          {/* Feet */}
          <circle cx="215" cy="153" r="3.5" fill={apparatus} />
          {/* Dynamic rock trajectory arc */}
          <path d="M 80 145 Q 95 125 110 135" stroke={highlight} strokeWidth="3" strokeDasharray="2 2" fill="none" />
          {showHighlight && (
            <>
              <line x1="92" y1="126" x2="108" y2="150" stroke={highlight} strokeWidth="4" strokeLinecap="round" filter={`url(#${glowId})`} />
              <text x="55" y="90" fill={highlight} fontSize="8" fontFamily="monospace" fontWeight="bold">FOREARM TO PALM ROCK</text>
            </>
          )}
        </g>
      );

    case 'russian-dip':
      return (
        <g id="russian-dip-svg">
          {/* Parallel Bars */}
          <line x1="40" y1="110" x2="240" y2="110" stroke={apparatus} strokeWidth="6" strokeLinecap="round" />
          <line x1="60" y1="110" x2="60" y2="175" stroke={apparatus} strokeWidth="4" />
          <line x1="220" y1="110" x2="220" y2="175" stroke={apparatus} strokeWidth="4" />
          {/* Forearms resting on bar */}
          <path d="M 105 110 L 140 110" stroke={apparatus} strokeWidth="8" strokeLinecap="round" />
          {/* Elbows flexed with torso lowered */}
          <circle cx="120" cy="45" r="11" fill="none" stroke={primary} strokeWidth="4" />
          <path d="M 120 60 L 122 105" stroke={primary} strokeWidth="10" strokeLinecap="round" />
          {/* Arms popping from forearms to palms */}
          <path d="M 105 110 L 115 80" stroke={primary} strokeWidth="5.5" strokeLinecap="round" />
          {/* Legs tucked */}
          <path d="M 122 105 L 126 145 L 142 165" stroke={primary} strokeWidth="5" strokeLinecap="round" />
          {/* Transition rock arrow */}
          <path d="M 95 100 Q 115 70 135 90" stroke={highlight} strokeWidth="2.5" strokeDasharray="3 3" fill="none" />
          {showHighlight && (
            <>
              <circle cx="110" cy="95" r="7" fill={highlight} filter={`url(#${glowId})`} />
              <text x="65" y="35" fill={highlight} fontSize="8" fontFamily="monospace" fontWeight="bold">ELBOW TURNOVER</text>
            </>
          )}
        </g>
      );

    case 'jumping-transition':
      return (
        <g id="jumping-transition-svg">
          {/* Low Bar at chest height */}
          <line x1="30" y1="95" x2="250" y2="95" stroke={apparatus} strokeWidth="6" strokeLinecap="round" />
          <circle cx="105" cy="95" r="4" fill={apparatus} />
          <circle cx="155" cy="95" r="4" fill={apparatus} />
          {/* Locked-out arms with hands gripping bar */}
          <path d="M 105 95 L 85 92 M 155 95 L 135 92" stroke={primary} strokeWidth="5.5" strokeLinecap="round" />
          {/* Chest pushed forward in front of the bar, head proud */}
          <circle cx="65" cy="72" r="10" fill="none" stroke={primary} strokeWidth="4" />
          <path d="M 75 78 L 105 110" stroke={primary} strokeWidth="9.5" strokeLinecap="round" />
          {/* Bent knees under/behind the body prepared to assist rotation */}
          <path d="M 105 110 L 95 140 L 80 148" stroke={primary} strokeWidth="5" strokeLinecap="round" />
          {/* Feet on floor */}
          <line x1="40" y1="170" x2="240" y2="170" stroke={apparatus} strokeWidth="3" strokeDasharray="3 3" />
          <circle cx="80" cy="170" r="3.5" fill={apparatus} />
          <path d="M 80 148 L 80 170" stroke={primary} strokeWidth="4" strokeLinecap="round" />
          {/* Dynamic rotational path around bar over the top */}
          <path d="M 70 65 Q 110 35 155 60 Q 170 80 160 95" stroke={highlight} strokeWidth="3" strokeDasharray="3 3" fill="none" />
          <path d="M 152 95 L 160 95 L 163 87" stroke={highlight} strokeWidth="2.5" strokeLinecap="round" fill="none" />
          {showHighlight && (
            <>
              <circle cx="115" cy="50" r="8" fill={highlight} filter={`url(#${glowId})`} />
              <text x="50" y="30" fill={highlight} fontSize="8" fontFamily="monospace" fontWeight="bold">CHEST FORWARD &rarr; BAR ROTATION</text>
            </>
          )}
        </g>
      );

    case 'pull-back':
      return (
        <g id="pull-back-svg">
          {/* Pull-Up Bar positioned low on torso at peak */}
          <line x1="30" y1="75" x2="250" y2="75" stroke={apparatus} strokeWidth="6" strokeLinecap="round" />
          <circle cx="115" cy="75" r="4.5" fill={apparatus} />
          <circle cx="165" cy="75" r="4.5" fill={apparatus} />
          {/* Head proud and upright above bar */}
          <circle cx="140" cy="22" r="10.5" fill="none" stroke={primary} strokeWidth="4" />
          {/* Vertical upright torso at peak */}
          <path d="M 140 34 L 140 98" stroke={primary} strokeWidth="10" strokeLinecap="round" />
          {/* Deep flexed arms pulling bar down to lower ribs/torso */}
          <path d="M 115 75 L 102 65 L 130 48 M 165 75 L 178 65 L 150 48" stroke={primary} strokeWidth="5.5" strokeLinecap="round" />
          {/* Knees tucked tightly up toward chest */}
          <path d="M 140 98 L 108 85 L 122 118" stroke={primary} strokeWidth="6" strokeLinecap="round" />
          <circle cx="122" cy="118" r="3.5" fill={primary} />
          {/* Upward knee tuck momentum arrow */}
          <path d="M 110 148 Q 92 120 105 92" stroke={highlight} strokeWidth="2.5" strokeDasharray="3 3" fill="none" />
          <path d="M 100 98 L 105 92 L 110 97" stroke={highlight} strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* Low bar clearance contact vector */}
          {showHighlight && (
            <>
              <line x1="115" y1="75" x2="165" y2="75" stroke={highlight} strokeWidth="3" filter={`url(#${glowId})`} />
              <circle cx="140" cy="75" r="6" fill={highlight} filter={`url(#${glowId})`} />
              <text x="35" y="15" fill={highlight} fontSize="8" fontFamily="monospace" fontWeight="bold">VERTICAL TORSO &middot; BAR LOW ON TORSO</text>
            </>
          )}
        </g>
      );

    case 'banded-muscle-up':
      return (
        <g id="banded-muscleup-svg">
          {/* Bar */}
          <line x1="40" y1="65" x2="240" y2="65" stroke={apparatus} strokeWidth="6" strokeLinecap="round" />
          <circle cx="110" cy="65" r="4" fill={apparatus} />
          <circle cx="170" cy="65" r="4" fill={apparatus} />
          {/* Bright Green Elastic Band from bar around feet */}
          <path d="M 140 65 Q 115 125 138 178 Q 165 125 140 65" stroke="#10B981" strokeWidth="3.5" strokeDasharray="3 3" fill="none" />
          {/* Torso cresting above bar */}
          <circle cx="140" cy="22" r="11" fill="none" stroke={primary} strokeWidth="4" />
          <path d="M 140 36 L 140 85" stroke={primary} strokeWidth="10" strokeLinecap="round" />
          {/* Arms completing turnover */}
          <path d="M 110 65 L 126 45 M 170 65 L 154 45" stroke={primary} strokeWidth="5" strokeLinecap="round" />
          {/* Legs guided inside band */}
          <path d="M 140 85 L 138 135 L 140 175" stroke={primary} strokeWidth="4.5" strokeLinecap="round" />
          {showHighlight && (
            <>
              <path d="M 105 60 Q 140 35 175 60" stroke={highlight} strokeWidth="3" strokeDasharray="2 2" fill="none" filter={`url(#${glowId})`} />
              <text x="65" y="165" fill="#10B981" fontSize="8" fontFamily="monospace" fontWeight="bold">BAND ASSIST TRAJECTORY</text>
            </>
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
    case 'frog-stand':
    case 'frog-stand-hold':
      return (
        <g id="frog-stand-svg">
          <line x1="30" y1="165" x2="250" y2="165" stroke={apparatus} strokeWidth="3" strokeLinecap="round" />
          {/* Hands flat on floor */}
          <circle cx="110" cy="165" r="4" fill={apparatus} />
          {/* Arms bent slightly in crow/frog shelf */}
          <path d="M 110 165 L 115 130" stroke={primary} strokeWidth="5" strokeLinecap="round" />
          {/* Head looking slightly forward */}
          <circle cx="85" cy="120" r="10" fill="none" stroke={primary} strokeWidth="4" />
          {/* Compact torso angled forward over hands */}
          <path d="M 100 125 L 140 115" stroke={primary} strokeWidth="8.5" strokeLinecap="round" />
          {/* Knees resting on triceps / back of elbows */}
          <path d="M 140 115 Q 120 120 115 130" stroke={primary} strokeWidth="7" strokeLinecap="round" />
          {/* Feet tucked off floor */}
          <path d="M 140 115 L 155 135" stroke={primary} strokeWidth="5.5" strokeLinecap="round" />
          {/* Forward lean center of gravity line */}
          <line x1="110" y1="165" x2="110" y2="105" stroke={highlight} strokeWidth="1.5" strokeDasharray="3 3" />
          {showHighlight && (
            <circle cx="115" cy="130" r="6" stroke={highlight} strokeWidth="2.5" fill="none" filter={`url(#${glowId})`} />
          )}
          <text x="135" y="95" fill={highlight} fontSize="9" fontWeight="bold" fontFamily="sans-serif">KNEE-TO-TRICEP SHELF</text>
        </g>
      );

    case 'frog-stand-press':
    case 'frog-stand-press-reps':
      return (
        <g id="frog-stand-press-svg">
          <line x1="30" y1="165" x2="250" y2="165" stroke={apparatus} strokeWidth="3" strokeLinecap="round" />
          <circle cx="110" cy="165" r="4" fill={apparatus} />
          {/* Arms pressing straight pushing floor away */}
          <path d="M 110 165 L 110 115" stroke={primary} strokeWidth="5.5" strokeLinecap="round" />
          <circle cx="85" cy="105" r="10" fill="none" stroke={primary} strokeWidth="4" />
          {/* Elevated rounded upper back & floating tucked knees */}
          <path d="M 100 110 L 140 95" stroke={primary} strokeWidth="8.5" strokeLinecap="round" />
          {/* Knees lifted completely off triceps */}
          <path d="M 140 95 Q 120 100 125 110" stroke={primary} strokeWidth="7" strokeLinecap="round" />
          <path d="M 140 95 L 150 118" stroke={primary} strokeWidth="5" strokeLinecap="round" />
          {/* Ghost position of knees resting on elbows */}
          <circle cx="110" cy="135" r="4" fill="none" stroke={secondary} strokeWidth="1.5" strokeDasharray="2 2" />
          {/* Elevation press arrow */}
          <path d="M 115 135 Q 122 120 125 112" stroke={highlight} strokeWidth="2.5" strokeLinecap="round" />
          <polygon points="122,110 129,112 124,117" fill={highlight} />
          {showHighlight && (
            <path d="M 105 160 L 105 120" stroke={highlight} strokeWidth="3" filter={`url(#${glowId})`} />
          )}
          <text x="125" y="80" fill={highlight} fontSize="9" fontWeight="bold" fontFamily="sans-serif">STRAIGHT-ARM PRESS</text>
        </g>
      );

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
    case 'fl-scapular-pull':
    case 'front-lever-scapular':
      return (
        <g id="fl-scapular-svg">
          {/* Pull-Up Bar */}
          <line x1="40" y1="35" x2="240" y2="35" stroke={apparatus} strokeWidth="6" strokeLinecap="round" />
          <circle cx="140" cy="35" r="4" fill={apparatus} />
          {/* Straight arms angled ~60 deg */}
          <path d="M 140 35 L 125 80" stroke={primary} strokeWidth="5.5" strokeLinecap="round" />
          {/* Head */}
          <circle cx="95" cy="85" r="11" fill="none" stroke={primary} strokeWidth="4" />
          {/* Torso angled 35-45 degrees from horizontal */}
          <path d="M 115 85 L 175 115" stroke={primary} strokeWidth="8.5" strokeLinecap="round" />
          {/* Legs straight aligned with torso */}
          <path d="M 175 115 L 230 145" stroke={primary} strokeWidth="6.5" strokeLinecap="round" />
          {/* Scapular retraction & depression highlight */}
          {showHighlight && (
            <path d="M 118 78 L 140 88" stroke={highlight} strokeWidth="3.5" filter={`url(#${glowId})`} />
          )}
          <path d="M 115 110 Q 130 95 145 90" stroke={highlight} strokeWidth="2" strokeDasharray="3 3" />
          <text x="110" y="65" fill={highlight} fontSize="9" fontWeight="bold" fontFamily="sans-serif">SCAPULAR PULL</text>
        </g>
      );

    case 'tuck-fl-reps':
    case 'tuck-front-lever-reps':
      return (
        <g id="tuck-fl-reps-svg">
          <line x1="40" y1="35" x2="240" y2="35" stroke={apparatus} strokeWidth="6" strokeLinecap="round" />
          <circle cx="130" cy="35" r="4" fill={apparatus} />
          {/* Straight arm angled with horizontal lift */}
          <path d="M 130 35 L 130 85" stroke={primary} strokeWidth="5.5" strokeLinecap="round" />
          <circle cx="95" cy="85" r="11" fill="none" stroke={primary} strokeWidth="4" />
          {/* Horizontal tuck body */}
          <path d="M 110 85 L 170 85" stroke={primary} strokeWidth="8.5" strokeLinecap="round" />
          <path d="M 170 85 Q 150 115 135 95" stroke={primary} strokeWidth="6.5" strokeLinecap="round" />
          {/* Ghost hanging tuck position */}
          <path d="M 130 85 L 130 140" stroke={secondary} strokeWidth="4" strokeDasharray="3 3" strokeLinecap="round" />
          <circle cx="130" cy="145" r="7" fill="none" stroke={secondary} strokeWidth="2" strokeDasharray="2 2" />
          {/* Dynamic raise arc */}
          <path d="M 145 135 Q 185 125 170 95" stroke={highlight} strokeWidth="2.5" strokeDasharray="3 3" />
          <polygon points="168,90 176,96 166,102" fill={highlight} />
          {showHighlight && (
            <path d="M 115 78 L 155 78" stroke={highlight} strokeWidth="3" filter={`url(#${glowId})`} />
          )}
          <text x="100" y="65" fill={highlight} fontSize="9" fontWeight="bold" fontFamily="sans-serif">CONCENTRIC REPS</text>
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

    // ----------------- DRAGON FLAG PROGRESSION -----------------
    case 'df-hollow-hold':
      return (
        <g id="df-hollow-hold-svg">
          {/* Floor baseline */}
          <line x1="30" y1="150" x2="250" y2="150" stroke={apparatus} strokeWidth="3" />
          {/* Hollow curve: lower back pressed to floor, head/legs hovering */}
          <path d="M 55 120 Q 90 148 140 148 Q 190 148 230 122" stroke={primary} strokeWidth="7" strokeLinecap="round" />
          {/* Arms extended overhead */}
          <path d="M 70 125 L 45 110" stroke={primary} strokeWidth="4.5" strokeLinecap="round" />
          {/* Head */}
          <circle cx="80" cy="120" r="9" fill="none" stroke={primary} strokeWidth="3.5" />
          {/* Core compression highlight */}
          {showHighlight && (
            <path d="M 115 140 Q 140 144 165 140" stroke={highlight} strokeWidth="4" filter={`url(#${glowId})`} />
          )}
          <text x="95" y="95" fill={highlight} fontSize="9" fontWeight="bold" fontFamily="sans-serif">POSTERIOR PELVIC TILT</text>
        </g>
      );

    case 'df-candlestick':
      return (
        <g id="df-candlestick-svg">
          {/* Bench */}
          <rect x="35" y="140" width="180" height="16" fill={apparatus} rx="3" />
          {/* Hands holding behind head */}
          <circle cx="55" cy="135" r="4" fill={apparatus} />
          {/* Upper back pivot point */}
          <circle cx="70" cy="135" r="9" fill="none" stroke={primary} strokeWidth="3.5" />
          {/* Torso and legs vertical up (90 deg to bench) */}
          <path d="M 75 135 L 75 45" stroke={primary} strokeWidth="8" strokeLinecap="round" />
          {/* Vertical alignment dotted line */}
          <line x1="75" y1="135" x2="75" y2="30" stroke={highlight} strokeWidth="1.5" strokeDasharray="3 3" />
          {showHighlight && (
            <line x1="78" y1="120" x2="78" y2="60" stroke={highlight} strokeWidth="3" filter={`url(#${glowId})`} />
          )}
          <text x="90" y="55" fill={highlight} fontSize="9" fontWeight="bold" fontFamily="sans-serif">VERTICAL LINE</text>
        </g>
      );

    case 'df-tuck':
      return (
        <g id="df-tuck-svg">
          {/* Bench */}
          <rect x="35" y="135" width="180" height="16" fill={apparatus} rx="3" />
          <circle cx="55" cy="130" r="4" fill={apparatus} />
          <circle cx="70" cy="130" r="9" fill="none" stroke={primary} strokeWidth="3.5" />
          {/* Angled torso at ~35 deg with tucked knees */}
          <path d="M 75 130 L 140 85" stroke={primary} strokeWidth="8" strokeLinecap="round" />
          {/* Knees tucked tightly */}
          <path d="M 140 85 Q 125 105 110 90" stroke={primary} strokeWidth="7" strokeLinecap="round" />
          {showHighlight && (
            <path d="M 85 125 L 130 92" stroke={highlight} strokeWidth="3" filter={`url(#${glowId})`} />
          )}
          <text x="120" y="65" fill={highlight} fontSize="9" fontWeight="bold" fontFamily="sans-serif">TUCK LEVER</text>
        </g>
      );

    case 'df-adv-tuck':
      return (
        <g id="df-adv-tuck-svg">
          {/* Bench */}
          <rect x="35" y="135" width="180" height="16" fill={apparatus} rx="3" />
          <circle cx="55" cy="130" r="4" fill={apparatus} />
          <circle cx="70" cy="130" r="9" fill="none" stroke={primary} strokeWidth="3.5" />
          {/* Torso elevated ~30 deg */}
          <path d="M 75 130 L 145 90" stroke={primary} strokeWidth="8" strokeLinecap="round" />
          {/* 90 deg thighs and bent knees */}
          <path d="M 145 90 L 170 120 L 155 125" stroke={primary} strokeWidth="6.5" strokeLinecap="round" />
          {showHighlight && (
            <path d="M 85 125 L 135 95" stroke={highlight} strokeWidth="3" filter={`url(#${glowId})`} />
          )}
          <text x="125" y="70" fill={highlight} fontSize="9" fontWeight="bold" fontFamily="sans-serif">90° HIP LEVER</text>
        </g>
      );

    case 'df-single-leg':
      return (
        <g id="df-single-leg-svg">
          {/* Bench */}
          <rect x="35" y="135" width="180" height="16" fill={apparatus} rx="3" />
          <circle cx="55" cy="130" r="4" fill={apparatus} />
          <circle cx="70" cy="130" r="9" fill="none" stroke={primary} strokeWidth="3.5" />
          {/* Torso elevated ~25 deg */}
          <path d="M 75 130 L 135 95" stroke={primary} strokeWidth="8" strokeLinecap="round" />
          {/* One leg straight, one tucked */}
          <path d="M 135 95 L 205 60" stroke={primary} strokeWidth="7" strokeLinecap="round" />
          <path d="M 135 95 Q 120 115 110 100" stroke={primary} strokeWidth="5.5" strokeLinecap="round" />
          {showHighlight && (
            <path d="M 85 125 L 130 98" stroke={highlight} strokeWidth="3" filter={`url(#${glowId})`} />
          )}
          <text x="135" y="45" fill={highlight} fontSize="9" fontWeight="bold" fontFamily="sans-serif">ASYMMETRIC</text>
        </g>
      );

    case 'df-straddle':
      return (
        <g id="df-straddle-svg">
          {/* Bench */}
          <rect x="35" y="135" width="180" height="16" fill={apparatus} rx="3" />
          <circle cx="55" cy="130" r="4" fill={apparatus} />
          <circle cx="70" cy="130" r="9" fill="none" stroke={primary} strokeWidth="3.5" />
          {/* Torso straight line elevated ~25 deg with straddled legs */}
          <path d="M 75 130 L 195 70" stroke={primary} strokeWidth="8" strokeLinecap="round" />
          <path d="M 135 100 L 180 85" stroke={primary} strokeWidth="5" strokeLinecap="round" />
          {showHighlight && (
            <path d="M 85 125 L 155 90" stroke={highlight} strokeWidth="3" filter={`url(#${glowId})`} />
          )}
          <text x="130" y="50" fill={highlight} fontSize="9" fontWeight="bold" fontFamily="sans-serif">STRADDLE LEVER</text>
        </g>
      );

    case 'df-eccentric':
    case 'df-concentric':
    case 'dragon-flag':
    case 'full-dragon-flag':
      return (
        <g id="dragon-flag-svg">
          <rect x="35" y="135" width="190" height="16" fill={apparatus} rx="3" />
          {/* Hand holding edge behind head */}
          <circle cx="55" cy="130" r="4" fill={apparatus} />
          {/* Pivot on upper back/traps */}
          <circle cx="70" cy="130" r="10" fill="none" stroke={primary} strokeWidth="4" />
          {/* Body lever low hover 20-30 degrees off bench */}
          <path d="M 75 130 L 210 75" stroke={primary} strokeWidth="8.5" strokeLinecap="round" />
          {/* Hover reference guideline */}
          <line x1="75" y1="130" x2="215" y2="130" stroke={secondary} strokeWidth="1" strokeDasharray="3 3" />
          {/* Range arrow */}
          <path d="M 175 118 Q 185 100 178 85" stroke={highlight} strokeWidth="2" strokeDasharray="2 2" />
          {showHighlight && (
            <path d="M 85 125 L 165 92" stroke={highlight} strokeWidth="3.5" filter={`url(#${glowId})`} />
          )}
          <text x="130" y="55" fill={highlight} fontSize="10" fontWeight="bold" fontFamily="sans-serif">RIGID PLANK LINE</text>
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
      return (
        <g id="tuck-l-sit-svg">
          <line x1="30" y1="160" x2="250" y2="160" stroke={apparatus} strokeWidth="3" strokeLinecap="round" />
          {/* Hands flat on floor or parallettes */}
          <circle cx="110" cy="160" r="4" fill={apparatus} />
          {/* Straight arm pushing down with scapular depression */}
          <path d="M 110 160 L 110 115" stroke={primary} strokeWidth="5" strokeLinecap="round" />
          <circle cx="110" cy="85" r="10" fill="none" stroke={primary} strokeWidth="4" />
          <path d="M 110 100 L 110 135" stroke={primary} strokeWidth="9" strokeLinecap="round" />
          {/* Knees tucked tightly into chest */}
          <path d="M 110 135 Q 145 120 135 105" stroke={primary} strokeWidth="7.5" strokeLinecap="round" />
          <path d="M 135 105 L 118 128" stroke={primary} strokeWidth="6" strokeLinecap="round" />
          {showHighlight && (
            <path d="M 105 110 L 105 130" stroke={highlight} strokeWidth="3" filter={`url(#${glowId})`} />
          )}
          <text x="135" y="115" fill={highlight} fontSize="9" fontWeight="bold" fontFamily="sans-serif">TUCK SUPPORT</text>
        </g>
      );

    case 'single-leg-l-sit':
    case 'one-leg-l-sit':
      return (
        <g id="single-leg-l-sit-svg">
          <line x1="30" y1="160" x2="250" y2="160" stroke={apparatus} strokeWidth="3" strokeLinecap="round" />
          <circle cx="110" cy="160" r="4" fill={apparatus} />
          <path d="M 110 160 L 110 115" stroke={primary} strokeWidth="5" strokeLinecap="round" />
          <circle cx="110" cy="85" r="10" fill="none" stroke={primary} strokeWidth="4" />
          <path d="M 110 100 L 110 135" stroke={primary} strokeWidth="9" strokeLinecap="round" />
          {/* One leg straight out at 90 degrees */}
          <path d="M 110 135 L 195 135" stroke={primary} strokeWidth="7.5" strokeLinecap="round" />
          {/* Other leg tucked into chest */}
          <path d="M 110 135 Q 138 122 130 110" stroke={secondary} strokeWidth="5.5" strokeDasharray="3 2" strokeLinecap="round" />
          <path d="M 130 110 L 118 130" stroke={secondary} strokeWidth="5" strokeDasharray="3 2" strokeLinecap="round" />
          {showHighlight && (
            <line x1="125" y1="130" x2="175" y2="130" stroke={highlight} strokeWidth="3" filter={`url(#${glowId})`} />
          )}
          <text x="130" y="100" fill={highlight} fontSize="9" fontWeight="bold" fontFamily="sans-serif">ASYMMETRIC L-SIT</text>
        </g>
      );

    case 'full-l-sit':
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
          {showHighlight && (
            <line x1="120" y1="130" x2="185" y2="130" stroke={highlight} strokeWidth="3" filter={`url(#${glowId})`} />
          )}
          <text x="135" y="120" fill={highlight} fontSize="9" fontWeight="bold" fontFamily="sans-serif">90° SUSPENSION</text>
        </g>
      );

    case 'straddle-l-sit':
      return (
        <g id="straddle-l-sit-svg">
          <line x1="30" y1="160" x2="250" y2="160" stroke={apparatus} strokeWidth="3" strokeLinecap="round" />
          <circle cx="110" cy="160" r="4" fill={apparatus} />
          <path d="M 110 160 L 110 115" stroke={primary} strokeWidth="5" strokeLinecap="round" />
          <circle cx="110" cy="85" r="10" fill="none" stroke={primary} strokeWidth="4" />
          <path d="M 110 100 L 110 135" stroke={primary} strokeWidth="9" strokeLinecap="round" />
          {/* Straddled legs */}
          <path d="M 110 135 L 185 125" stroke={primary} strokeWidth="7" strokeLinecap="round" />
          <path d="M 110 135 L 185 145" stroke={primary} strokeWidth="5.5" strokeLinecap="round" />
          {showHighlight && (
            <path d="M 120 132 L 175 124" stroke={highlight} strokeWidth="3" filter={`url(#${glowId})`} />
          )}
          <text x="135" y="105" fill={highlight} fontSize="9" fontWeight="bold" fontFamily="sans-serif">STRADDLE COMPRESSION</text>
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

    // ----------------- WARMUP & STRETCHING ILLUSTRATIONS -----------------
    case 'dead-hang':
    case 'scapular-pullup':
      return (
        <g id="dead-hang-svg">
          <line x1="40" y1="25" x2="240" y2="25" stroke={apparatus} strokeWidth="6" strokeLinecap="round" />
          <circle cx="110" cy="25" r="4" fill={apparatus} />
          <circle cx="170" cy="25" r="4" fill={apparatus} />
          <path d="M 110 25 L 126 55" stroke={primary} strokeWidth="5" strokeLinecap="round" />
          <path d="M 170 25 L 154 55" stroke={primary} strokeWidth="5" strokeLinecap="round" />
          <circle cx="140" cy="40" r="10" fill="none" stroke={primary} strokeWidth="4" />
          <path d="M 126 55 L 132 120 M 154 55 L 148 120" stroke={primary} strokeWidth="5" strokeLinecap="round" />
          {showHighlight && (
            <path d="M 128 62 L 132 110 M 152 62 L 148 110" stroke={highlight} strokeWidth="4" strokeLinecap="round" filter={`url(#${glowId})`} />
          )}
          <path d="M 132 120 L 135 180 M 148 120 L 145 180" stroke={primary} strokeWidth="5" strokeLinecap="round" />
          <text x="100" y="195" fill={highlight} fontSize="8" fontFamily="sans-serif">DECOMPRESS</text>
        </g>
      );

    case 'wrist-rocks':
    case 'wrist-flexor':
    case 'wrist-extensor':
    case 'finger-waves':
      return (
        <g id="wrist-prep-svg">
          <line x1="40" y1="160" x2="240" y2="160" stroke={apparatus} strokeWidth="4" />
          <circle cx="180" cy="70" r="10" fill="none" stroke={primary} strokeWidth="4" />
          <path d="M 175 82 L 135 110" stroke={primary} strokeWidth="8" strokeLinecap="round" />
          <path d="M 135 110 L 100 155 L 75 158" stroke={primary} strokeWidth="6" strokeLinecap="round" />
          <circle cx="100" cy="155" r="4" fill={highlight} />
          {showHighlight && (
            <path d="M 115 130 L 100 155 L 85 158" stroke={highlight} strokeWidth="3" filter={`url(#${glowId})`} />
          )}
          <path d="M 135 110 L 155 160" stroke={secondary} strokeWidth="6" strokeLinecap="round" />
          <text x="70" y="145" fill={highlight} fontSize="8" fontFamily="sans-serif">WRIST ANGLE</text>
        </g>
      );

    case 'chest-stretch':
    case 'shoulder-dislocates':
    case 'arm-swings':
      return (
        <g id="chest-shoulder-stretch-svg">
          <line x1="40" y1="20" x2="40" y2="180" stroke={apparatus} strokeWidth="5" strokeLinecap="round" />
          <circle cx="130" cy="55" r="10" fill="none" stroke={primary} strokeWidth="4" />
          <path d="M 130 68 L 130 120" stroke={primary} strokeWidth="8" strokeLinecap="round" />
          <path d="M 40 70 L 85 70 L 126 72" stroke={primary} strokeWidth="5" strokeLinecap="round" />
          <path d="M 130 72 L 165 95" stroke={primary} strokeWidth="5" strokeLinecap="round" />
          {showHighlight && (
            <path d="M 90 70 L 128 72" stroke={highlight} strokeWidth="4" filter={`url(#${glowId})`} />
          )}
          <path d="M 130 120 L 110 165 M 130 120 L 150 165" stroke={primary} strokeWidth="5" strokeLinecap="round" />
          <text x="75" y="60" fill={highlight} fontSize="8" fontFamily="sans-serif">PECTORAL / BICEPS</text>
        </g>
      );

    case 'puppy-pose':
    case 'tricep-stretch':
      return (
        <g id="puppy-pose-svg">
          <line x1="30" y1="160" x2="250" y2="160" stroke={apparatus} strokeWidth="4" />
          <circle cx="95" cy="140" r="9" fill="none" stroke={primary} strokeWidth="3.5" />
          {/* Arms stretched far out */}
          <path d="M 95 145 L 45 158" stroke={primary} strokeWidth="5" strokeLinecap="round" />
          {/* Angled torso melting to floor */}
          <path d="M 98 142 L 160 115" stroke={primary} strokeWidth="7" strokeLinecap="round" />
          {/* Knees stacked under hips */}
          <path d="M 160 115 L 160 158 L 190 158" stroke={primary} strokeWidth="6" strokeLinecap="round" />
          {showHighlight && (
            <path d="M 90 145 L 135 125" stroke={highlight} strokeWidth="4" filter={`url(#${glowId})`} />
          )}
          <text x="90" y="115" fill={highlight} fontSize="8" fontFamily="sans-serif">THORACIC / LATS</text>
        </g>
      );

    case 'cat-cow':
    case 'thoracic-rotations':
    case 'scapular-pushup':
      return (
        <g id="quadruped-mobility-svg">
          <line x1="30" y1="160" x2="250" y2="160" stroke={apparatus} strokeWidth="4" />
          <circle cx="80" cy="105" r="9" fill="none" stroke={primary} strokeWidth="3.5" />
          {/* Front arms */}
          <path d="M 90 115 L 90 158" stroke={primary} strokeWidth="5" strokeLinecap="round" />
          {/* Curved spine */}
          <path d="M 90 115 Q 135 85 175 115" stroke={primary} strokeWidth="7" fill="none" />
          {/* Rear hips & thighs */}
          <path d="M 175 115 L 175 158" stroke={primary} strokeWidth="6" strokeLinecap="round" />
          {showHighlight && (
            <path d="M 100 110 Q 135 88 165 110" stroke={highlight} strokeWidth="3.5" fill="none" filter={`url(#${glowId})`} />
          )}
          <text x="110" y="80" fill={highlight} fontSize="8" fontFamily="sans-serif">SPINAL ARTICULATION</text>
        </g>
      );

    case 'cobra-stretch':
      return (
        <g id="cobra-stretch-svg">
          <line x1="30" y1="160" x2="250" y2="160" stroke={apparatus} strokeWidth="4" />
          <circle cx="90" cy="75" r="10" fill="none" stroke={primary} strokeWidth="4" />
          {/* Arms pressing up */}
          <path d="M 95 90 L 95 158" stroke={primary} strokeWidth="5" strokeLinecap="round" />
          {/* Arching chest and hips grounded */}
          <path d="M 95 90 Q 135 125 170 155" stroke={primary} strokeWidth="7" fill="none" />
          <path d="M 170 155 L 235 158" stroke={primary} strokeWidth="6" strokeLinecap="round" />
          {showHighlight && (
            <path d="M 100 100 Q 135 130 160 150" stroke={highlight} strokeWidth="4" fill="none" filter={`url(#${glowId})`} />
          )}
          <text x="105" y="85" fill={highlight} fontSize="8" fontFamily="sans-serif">ANTERIOR CORE</text>
        </g>
      );

    case 'couch-stretch':
    case 'pigeon-pose':
      return (
        <g id="hip-flexor-stretch-svg">
          <line x1="30" y1="160" x2="250" y2="160" stroke={apparatus} strokeWidth="4" />
          <circle cx="120" cy="75" r="10" fill="none" stroke={primary} strokeWidth="4" />
          <path d="M 120 88 L 120 128" stroke={primary} strokeWidth="8" strokeLinecap="round" />
          {/* Front lunging leg */}
          <path d="M 120 128 L 80 135 L 80 158" stroke={primary} strokeWidth="6" strokeLinecap="round" />
          {/* Back knee on ground, foot up */}
          <path d="M 120 128 L 165 158 L 195 125" stroke={primary} strokeWidth="5.5" strokeLinecap="round" />
          {showHighlight && (
            <path d="M 125 125 L 155 150" stroke={highlight} strokeWidth="4" filter={`url(#${glowId})`} />
          )}
          <text x="135" y="115" fill={highlight} fontSize="8" fontFamily="sans-serif">HIP FLEXOR / PSOAS</text>
        </g>
      );

    case 'pike-fold':
    case 'straddle-pancake':
      return (
        <g id="pike-fold-svg">
          <line x1="30" y1="160" x2="250" y2="160" stroke={apparatus} strokeWidth="4" />
          <circle cx="155" cy="120" r="9" fill="none" stroke={primary} strokeWidth="3.5" />
          {/* Hips seated */}
          <circle cx="210" cy="155" r="5" fill={primary} />
          {/* Legs flat on floor */}
          <path d="M 210 155 L 75 155" stroke={primary} strokeWidth="6.5" strokeLinecap="round" />
          {/* Torso folded forward */}
          <path d="M 205 150 L 135 125" stroke={primary} strokeWidth="6.5" strokeLinecap="round" />
          {/* Arms reaching for toes */}
          <path d="M 140 128 L 80 152" stroke={primary} strokeWidth="4.5" strokeLinecap="round" />
          {showHighlight && (
            <path d="M 200 155 L 85 155" stroke={highlight} strokeWidth="4" filter={`url(#${glowId})`} />
          )}
          <text x="110" y="105" fill={highlight} fontSize="8" fontFamily="sans-serif">POSTERIOR CHAIN</text>
        </g>
      );

    case 'boxer-bounce':
    case 'jumping-jacks':
    case 'leg-swings':
    case 'calf-stretch':
      return (
        <g id="dynamic-standing-svg">
          <line x1="40" y1="170" x2="240" y2="170" stroke={apparatus} strokeWidth="4" />
          <circle cx="140" cy="50" r="10" fill="none" stroke={primary} strokeWidth="4" />
          <path d="M 140 63 L 140 115" stroke={primary} strokeWidth="8" strokeLinecap="round" />
          {/* Dynamic arms */}
          <path d="M 140 75 L 105 50 M 140 75 L 175 50" stroke={primary} strokeWidth="4.5" strokeLinecap="round" />
          {/* Dynamic legs */}
          <path d="M 140 115 L 115 168 M 140 115 L 165 168" stroke={primary} strokeWidth="5.5" strokeLinecap="round" />
          {showHighlight && (
            <circle cx="140" cy="90" r="12" stroke={highlight} strokeWidth="2" strokeDasharray="3 3" filter={`url(#${glowId})`} />
          )}
          <text x="100" y="185" fill={highlight} fontSize="8" fontFamily="sans-serif">DYNAMIC ACTIVATION</text>
        </g>
      );

    // ----------------- BEGINNER PULL PROGRESSION SPECIFIC ILLUSTRATIONS -----------------
    case 'incline-bodyweight-row':
      return (
        <g id="incline-bodyweight-row-svg">
          {/* Higher bar apparatus at 50 degrees */}
          <line x1="50" y1="45" x2="230" y2="45" stroke={apparatus} strokeWidth="6" strokeLinecap="round" />
          <circle cx="120" cy="45" r="4" fill={apparatus} />
          {/* Arms */}
          <path d="M 120 45 L 130 75" stroke={primary} strokeWidth="5" strokeLinecap="round" />
          {/* Head */}
          <circle cx="105" cy="65" r="11" fill="none" stroke={primary} strokeWidth="4" />
          {/* Angled torso at ~50 degrees */}
          <path d="M 115 75 L 160 125" stroke={primary} strokeWidth="11" strokeLinecap="round" />
          {/* Legs straight to floor */}
          <path d="M 160 125 L 205 165" stroke={primary} strokeWidth="7.5" strokeLinecap="round" />
          <line x1="30" y1="168" x2="250" y2="168" stroke={secondary} strokeWidth="2" strokeDasharray="4 4" />
          {showHighlight && (
            <line x1="120" y1="80" x2="155" y2="120" stroke={highlight} strokeWidth="4" strokeLinecap="round" filter={`url(#${glowId})`} />
          )}
          <text x="50" y="38" fill={highlight} fontSize="8" fontFamily="sans-serif">HIGH VOLUME ANGLE</text>
        </g>
      );

    case 'jackknife-pullup':
      return (
        <g id="jackknife-pullup-svg">
          {/* Bar */}
          <line x1="40" y1="35" x2="240" y2="35" stroke={apparatus} strokeWidth="6" strokeLinecap="round" />
          <circle cx="110" cy="35" r="4" fill={apparatus} />
          <circle cx="170" cy="35" r="4" fill={apparatus} />
          {/* Arms pulling */}
          <path d="M 110 35 L 125 68 M 170 35 L 155 68" stroke={primary} strokeWidth="5" strokeLinecap="round" />
          <circle cx="140" cy="50" r="11" fill="none" stroke={primary} strokeWidth="4" />
          {/* Vertical torso */}
          <path d="M 125 68 L 132 120 M 155 68 L 148 120" stroke={primary} strokeWidth="5" strokeLinecap="round" />
          {/* Elevated box / floor support under feet in front */}
          <rect x="180" y="125" width="55" height="40" fill={apparatus} rx="4" />
          {/* Legs extended forward in 90 degree jackknife */}
          <path d="M 140 120 L 195 125" stroke={primary} strokeWidth="6" strokeLinecap="round" />
          {showHighlight && (
            <path d="M 126 75 L 132 115 M 154 75 L 148 115" stroke={highlight} strokeWidth="4" strokeLinecap="round" filter={`url(#${glowId})`} />
          )}
          <text x="60" y="105" fill={highlight} fontSize="8" fontFamily="sans-serif">FOOT ASSISTED</text>
        </g>
      );

    case 'band-assisted-pullup':
      return (
        <g id="band-assisted-pullup-svg">
          {/* Bar */}
          <line x1="40" y1="30" x2="240" y2="30" stroke={apparatus} strokeWidth="6" strokeLinecap="round" />
          <circle cx="110" cy="30" r="4" fill={apparatus} />
          <circle cx="170" cy="30" r="4" fill={apparatus} />
          {/* Elastic loop band from bar around feet */}
          <path d="M 140 30 Q 115 110 138 175 Q 165 110 140 30" stroke="#10B981" strokeWidth="3" strokeDasharray="3 3" fill="none" />
          {/* Arms pulling */}
          <path d="M 110 30 L 124 65 M 170 30 L 156 65" stroke={primary} strokeWidth="5" strokeLinecap="round" />
          <circle cx="140" cy="45" r="11" fill="none" stroke={primary} strokeWidth="4" />
          {/* Torso */}
          <path d="M 124 65 L 132 118 M 156 65 L 148 118" stroke={primary} strokeWidth="5" strokeLinecap="round" />
          {/* Straight legs in band */}
          <path d="M 132 118 L 136 172 M 148 118 L 144 172" stroke={primary} strokeWidth="4.5" strokeLinecap="round" />
          {showHighlight && (
            <path d="M 125 72 L 131 112 M 155 72 L 149 112" stroke={highlight} strokeWidth="4" strokeLinecap="round" filter={`url(#${glowId})`} />
          )}
          <text x="65" y="150" fill="#10B981" fontSize="8" fontFamily="sans-serif">BAND ASSISTANCE</text>
        </g>
      );

    case 'flexed-arm-hang':
      return (
        <g id="flexed-arm-hang-svg">
          {/* Bar */}
          <line x1="40" y1="40" x2="240" y2="40" stroke={apparatus} strokeWidth="6" strokeLinecap="round" />
          {/* Head well above bar */}
          <circle cx="140" cy="20" r="11" fill="none" stroke={primary} strokeWidth="4" />
          {/* Fully flexed elbows locked tight */}
          <path d="M 115 40 L 122 32 L 128 55" stroke={primary} strokeWidth="5" strokeLinecap="round" />
          <path d="M 165 40 L 158 32 L 152 55" stroke={primary} strokeWidth="5" strokeLinecap="round" />
          {/* Body held static */}
          <path d="M 128 55 L 133 110 M 152 55 L 147 110" stroke={primary} strokeWidth="5" strokeLinecap="round" />
          <path d="M 133 110 L 136 165 M 147 110 L 144 165" stroke={primary} strokeWidth="4.5" strokeLinecap="round" />
          {showHighlight && (
            <>
              <circle cx="120" cy="36" r="6" fill={highlight} filter={`url(#${glowId})`} />
              <circle cx="160" cy="36" r="6" fill={highlight} filter={`url(#${glowId})`} />
              <path d="M 128 62 L 133 105 M 152 62 L 147 105" stroke={highlight} strokeWidth="3.5" filter={`url(#${glowId})`} />
            </>
          )}
          <text x="65" y="60" fill={highlight} fontSize="8" fontFamily="sans-serif">ISOMETRIC LOCKOFF</text>
        </g>
      );

    case 'chin-up':
      return (
        <g id="chin-up-svg">
          {/* Bar */}
          <line x1="40" y1="32" x2="240" y2="32" stroke={apparatus} strokeWidth="6" strokeLinecap="round" />
          {/* Supinated Hands close grip */}
          <circle cx="125" cy="32" r="4" fill={apparatus} />
          <circle cx="155" cy="32" r="4" fill={apparatus} />
          {/* Arms pulling supinated */}
          <path d="M 125 32 L 130 60 M 155 32 L 150 60" stroke={primary} strokeWidth="5" strokeLinecap="round" />
          {/* Head */}
          <circle cx="140" cy="38" r="11" fill="none" stroke={primary} strokeWidth="4" />
          {/* Torso */}
          <path d="M 130 60 L 134 115 M 150 60 L 146 115" stroke={primary} strokeWidth="5" strokeLinecap="round" />
          {/* Legs */}
          <path d="M 134 115 L 136 170 M 146 115 L 144 170" stroke={primary} strokeWidth="4.5" strokeLinecap="round" />
          {showHighlight && (
            <>
              {/* Highlight Biceps & Lats */}
              <line x1="126" y1="42" x2="130" y2="58" stroke={highlight} strokeWidth="4.5" strokeLinecap="round" filter={`url(#${glowId})`} />
              <line x1="154" y1="42" x2="150" y2="58" stroke={highlight} strokeWidth="4.5" strokeLinecap="round" filter={`url(#${glowId})`} />
              <path d="M 130 68 L 134 105 M 150 68 L 146 105" stroke={highlight} strokeWidth="3" filter={`url(#${glowId})`} />
            </>
          )}
          <text x="60" y="55" fill={highlight} fontSize="8" fontFamily="sans-serif">SUPINATED BICEP</text>
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
