import React, { useState, useEffect, useRef } from 'react';
import { soundFX } from '../utils/sound';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Timer, Flame, Check, ChevronDown, ChevronUp } from 'lucide-react';

interface RestTimerProps {
  onTransferHoldTime?: (seconds: number) => void;
  defaultRestSeconds?: number;
}

export const RestTimer: React.FC<RestTimerProps> = ({
  onTransferHoldTime,
  defaultRestSeconds = 90
}) => {
  const [mode, setMode] = useState<'rest' | 'hold'>('rest');
  const [restDuration, setRestDuration] = useState<number>(defaultRestSeconds);
  const [timeLeft, setTimeLeft] = useState<number>(defaultRestSeconds);
  const [stopwatchSeconds, setStopwatchSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(soundFX.getMuted());
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync default rest if prop updates and timer is reset
  useEffect(() => {
    if (!isRunning && mode === 'rest') {
      setRestDuration(defaultRestSeconds);
      setTimeLeft(defaultRestSeconds);
    }
  }, [defaultRestSeconds]);

  // Main tick loop
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        if (mode === 'rest') {
          setTimeLeft(prev => {
            if (prev <= 1) {
              soundFX.playTimerComplete();
              setIsRunning(false);
              return 0;
            }
            if (prev <= 4) {
              soundFX.playTick();
            }
            return prev - 1;
          });
        } else {
          setStopwatchSeconds(prev => prev + 1);
        }
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, mode]);

  const toggleRunning = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    if (mode === 'rest') {
      setTimeLeft(restDuration);
    } else {
      setStopwatchSeconds(0);
    }
  };

  const handleSelectPreset = (secs: number) => {
    setIsRunning(false);
    setRestDuration(secs);
    setTimeLeft(secs);
  };

  const toggleSound = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundFX.setMuted(next);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  const progressPercent = mode === 'rest'
    ? restDuration > 0 ? ((restDuration - timeLeft) / restDuration) * 100 : 0
    : 100;

  return (
    <div className="bg-[#141414] border border-[#222222] rounded-lg p-3.5 shadow-sm">
      {/* Header Bar with Toggle & Sound */}
      <div className="flex items-center justify-between gap-3 pb-2.5 border-b border-[#222222]">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-md bg-[#0A0A0A] border border-[#222222] text-[#D1FF00]">
            <Timer className="w-3.5 h-3.5" />
          </div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-300">
            CHRONO &amp; REST TIMER
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={toggleSound}
            className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-[#222222] transition cursor-pointer"
            title={isMuted ? 'Unmute Audio Chimes' : 'Mute Audio Chimes'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-zinc-600" /> : <Volume2 className="w-3.5 h-3.5 text-[#D1FF00]" />}
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-[#222222] transition cursor-pointer"
          >
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="pt-3 space-y-3">
          {/* Mode Switcher */}
          <div className="grid grid-cols-2 gap-1 bg-[#0A0A0A] p-1 rounded-lg border border-[#222222] text-xs font-mono">
            <button
              onClick={() => {
                setIsRunning(false);
                setMode('rest');
              }}
              className={`py-1 rounded-md text-[11px] font-bold uppercase tracking-wider transition cursor-pointer ${
                mode === 'rest'
                  ? 'bg-[#D1FF00] text-black shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Rest Countdown
            </button>
            <button
              onClick={() => {
                setIsRunning(false);
                setMode('hold');
              }}
              className={`py-1 rounded-md text-[11px] font-bold uppercase tracking-wider transition cursor-pointer ${
                mode === 'hold'
                  ? 'bg-[#D1FF00] text-black shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Static Hold Timer
            </button>
          </div>

          {/* Digital Time Display */}
          <div className="relative flex flex-col items-center justify-center py-2.5 bg-[#0A0A0A] border border-[#222222] rounded-lg overflow-hidden font-mono">
            {/* Progress bar background on rest */}
            {mode === 'rest' && (
              <div
                className="absolute inset-0 bg-[#D1FF00]/10 pointer-events-none transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            )}

            <div className="text-3xl sm:text-4xl font-black tracking-widest text-white z-10 font-mono">
              {formatTime(mode === 'rest' ? timeLeft : stopwatchSeconds)}
            </div>
            <div className="text-[9px] font-bold text-zinc-500 z-10 mt-0.5 uppercase tracking-widest">
              {mode === 'rest' ? 'Rest Time Remaining' : 'Active Hold Duration'}
            </div>
          </div>

          {/* Preset Buttons for Rest Mode */}
          {mode === 'rest' && (
            <div className="flex items-center justify-center gap-1.5 font-mono">
              {[30, 60, 90, 120, 180].map(secs => (
                <button
                  key={secs}
                  onClick={() => handleSelectPreset(secs)}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition cursor-pointer ${
                    restDuration === secs
                      ? 'bg-[#D1FF00] text-black border border-[#D1FF00]'
                      : 'bg-[#0A0A0A] text-zinc-400 border border-[#222222] hover:text-white hover:border-zinc-700'
                  }`}
                >
                  {secs}s
                </button>
              ))}
            </div>
          )}

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleRunning}
              className={`flex-1 py-2 rounded-lg font-mono font-extrabold text-xs uppercase tracking-wider transition flex items-center justify-center gap-1.5 cursor-pointer shadow-sm active:scale-95 ${
                isRunning
                  ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700'
                  : 'bg-[#D1FF00] hover:bg-[#b8e600] text-black'
              }`}
            >
              {isRunning ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" /> Pause
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" /> Start
                </>
              )}
            </button>

            <button
              onClick={resetTimer}
              className="p-2 rounded-lg bg-[#0A0A0A] hover:bg-[#1f1f1f] text-zinc-400 hover:text-white border border-[#222222] transition cursor-pointer active:scale-95"
              title="Reset Timer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            {mode === 'hold' && stopwatchSeconds > 0 && onTransferHoldTime && (
              <button
                onClick={() => onTransferHoldTime(stopwatchSeconds)}
                className="py-2 px-2.5 rounded-lg bg-[#0A0A0A] hover:bg-[#1a1a1a] text-[#D1FF00] border border-[#D1FF00]/40 font-mono font-bold text-xs uppercase tracking-wider transition flex items-center gap-1 cursor-pointer"
                title="Transfer recorded hold seconds to log modal"
              >
                <Flame className="w-3.5 h-3.5" /> Log {stopwatchSeconds}s
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
