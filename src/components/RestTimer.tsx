import React, { useState, useEffect, useRef } from 'react';
import { soundFX } from '../utils/sound';
import { ProgressionExercise } from '../types';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Timer,
  Flame,
  CheckCircle2,
  X,
  Minimize2,
  Maximize2,
  Sparkles,
  ArrowRight,
  Plus,
  Minus,
  Dumbbell
} from 'lucide-react';

export interface RestTimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeExercise?: ProgressionExercise | null;
  defaultRestSeconds?: number;
  initialMode?: 'rest' | 'hold';
  onLogCompletedSet?: (exercise: ProgressionExercise, metricValue: number) => void;
}

export const RestTimer: React.FC<RestTimerModalProps> = ({
  isOpen,
  onClose,
  activeExercise,
  defaultRestSeconds,
  initialMode = 'rest',
  onLogCompletedSet
}) => {
  const isSeconds = activeExercise?.metricType === 'seconds';
  const targetRest = defaultRestSeconds || activeExercise?.passCriteria.restSeconds || 90;
  const targetHold = activeExercise?.passCriteria.targetHoldSeconds || 15;

  const [mode, setMode] = useState<'rest' | 'hold'>(isSeconds ? 'hold' : initialMode);
  const [restDuration, setRestDuration] = useState<number>(targetRest);
  const [timeLeft, setTimeLeft] = useState<number>(targetRest);
  const [stopwatchSeconds, setStopwatchSeconds] = useState<number>(0);
  const [stopwatchMillis, setStopwatchMillis] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(soundFX.getMuted());
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  // Prepare Countdown for Static Hold: 3, 2, 1, GO!
  const [countdownPrepSeconds, setCountdownPrepSeconds] = useState<number | null>(null);
  const [prepDuration, setPrepDuration] = useState<3 | 5 | 0>(3);
  const [lastCompletedHold, setLastCompletedHold] = useState<number | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const prepTimerRef = useRef<NodeJS.Timeout | null>(null);
  const holdStartTimeRef = useRef<number>(0);

  // Sync mode and rest duration when activeExercise or defaultRest changes
  useEffect(() => {
    if (activeExercise) {
      const rest = defaultRestSeconds || activeExercise.passCriteria.restSeconds || 90;
      setRestDuration(rest);
      if (!isRunning) {
        setTimeLeft(rest);
        if (activeExercise.metricType === 'seconds') {
          setMode('hold');
        }
      }
    }
  }, [activeExercise, defaultRestSeconds]);

  // Handle Prepare Countdown before Iso Hold
  useEffect(() => {
    if (countdownPrepSeconds !== null) {
      if (countdownPrepSeconds > 0) {
        soundFX.playCountdownBeep(false);
        prepTimerRef.current = setTimeout(() => {
          setCountdownPrepSeconds(prev => (prev !== null ? prev - 1 : null));
        }, 1000);
      } else if (countdownPrepSeconds === 0) {
        // GO!
        soundFX.playGoChime();
        prepTimerRef.current = setTimeout(() => {
          setCountdownPrepSeconds(null);
          // Start actual hold stopwatch
          setIsRunning(true);
          holdStartTimeRef.current = Date.now();
        }, 600);
      }
    }

    return () => {
      if (prepTimerRef.current) clearTimeout(prepTimerRef.current);
    };
  }, [countdownPrepSeconds]);

  // Main tick loop
  useEffect(() => {
    if (isRunning && countdownPrepSeconds === null) {
      if (mode === 'rest') {
        timerRef.current = setInterval(() => {
          setTimeLeft(prev => {
            if (prev <= 1) {
              soundFX.playTimerComplete();
              setIsRunning(false);
              return 0;
            }
            if (prev <= 4) {
              soundFX.playCountdownBeep(prev === 1);
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        // Hold mode stopwatch with high accuracy
        timerRef.current = setInterval(() => {
          const elapsedSecs = Math.floor((Date.now() - holdStartTimeRef.current) / 1000);
          const elapsedDecis = Math.floor(((Date.now() - holdStartTimeRef.current) % 1000) / 100);
          setStopwatchSeconds(elapsedSecs);
          setStopwatchMillis(elapsedDecis);
        }, 100);
      }
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, mode, countdownPrepSeconds]);

  if (!isOpen) return null;

  const handleStart = () => {
    if (mode === 'hold') {
      if (prepDuration > 0) {
        // Trigger 3... 2... 1... countdown
        setIsRunning(false);
        setStopwatchSeconds(0);
        setStopwatchMillis(0);
        setLastCompletedHold(null);
        setCountdownPrepSeconds(prepDuration);
      } else {
        // Instant start
        soundFX.playGoChime();
        setIsRunning(true);
        holdStartTimeRef.current = Date.now();
      }
    } else {
      setIsRunning(true);
    }
  };

  const handlePause = () => {
    setIsRunning(false);
    if (countdownPrepSeconds !== null) {
      setCountdownPrepSeconds(null);
    }
    if (mode === 'hold' && stopwatchSeconds > 0) {
      setLastCompletedHold(stopwatchSeconds);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setCountdownPrepSeconds(null);
    if (mode === 'rest') {
      setTimeLeft(restDuration);
    } else {
      setStopwatchSeconds(0);
      setStopwatchMillis(0);
      setLastCompletedHold(null);
    }
  };

  const handleSelectPreset = (secs: number) => {
    setIsRunning(false);
    setRestDuration(secs);
    setTimeLeft(secs);
  };

  const handleAdjustRest = (delta: number) => {
    setTimeLeft(prev => Math.max(5, prev + delta));
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

  // 1-Tap Log Set and Auto-start Rest Timer
  const handleLogAndRest = () => {
    const valueToLog = mode === 'hold' ? (stopwatchSeconds || lastCompletedHold || 1) : (activeExercise?.passCriteria.targetReps || 10);
    if (activeExercise && onLogCompletedSet) {
      onLogCompletedSet(activeExercise, valueToLog);
    }
    // Switch to Rest Mode and start rest countdown
    setMode('rest');
    setTimeLeft(restDuration);
    setIsRunning(true);
    setLastCompletedHold(null);
    setStopwatchSeconds(0);
  };

  const progressPercent = mode === 'rest'
    ? restDuration > 0 ? ((restDuration - timeLeft) / restDuration) * 100 : 0
    : targetHold > 0 ? Math.min(100, (stopwatchSeconds / targetHold) * 100) : 100;

  // MINIMIZED FLOATING WIDGET (Pinned in corner, stays on top of any modal)
  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-[80] animate-in fade-in slide-in-from-bottom-3 duration-200">
        <div className="flex items-center gap-3 bg-[#141414]/95 border border-[#D1FF00]/50 rounded-2xl p-2.5 px-4 shadow-2xl backdrop-blur-xl font-mono">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-lg ${isRunning ? 'bg-[#D1FF00] text-black animate-pulse' : 'bg-[#0A0A0A] text-[#D1FF00]'}`}>
              <Timer className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest text-[9px]">
                {mode === 'rest' ? 'Rest Countdown' : 'Iso Hold'}
              </div>
              <div className="text-base font-black text-white">
                {mode === 'rest' ? formatTime(timeLeft) : `${stopwatchSeconds}.${stopwatchMillis}s`}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 border-l border-[#222222] pl-2">
            <button
              onClick={isRunning ? handlePause : handleStart}
              className="p-1.5 rounded-lg bg-[#D1FF00] text-black hover:bg-[#b8e600] transition cursor-pointer"
            >
              {isRunning ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            </button>
            <button
              onClick={() => setIsMinimized(false)}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-[#222222] transition cursor-pointer"
              title="Expand Timer Modal"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 transition cursor-pointer"
              title="Close Timer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // FULL FRONT-MOST MODAL (z-[70], guaranteed above exercise modal z-50)
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        id="frontmost-timer-modal"
        className="relative w-full max-w-md bg-[#141414] border border-[#222222] rounded-2xl shadow-2xl overflow-hidden font-mono"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#222222] bg-[#0A0A0A]">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-[#141414] border border-[#222222] text-[#D1FF00]">
              <Timer className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Workout Chrono &amp; Timer
              </h3>
              {activeExercise ? (
                <p className="text-[11px] text-[#D1FF00] font-sans truncate max-w-[200px]">
                  {activeExercise.title}
                </p>
              ) : (
                <p className="text-[11px] text-zinc-500 font-sans">
                  Universal Precision Chrono
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={toggleSound}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-[#222222] transition cursor-pointer"
              title={isMuted ? 'Unmute Audio Beeps' : 'Mute Audio Beeps'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-zinc-600" /> : <Volume2 className="w-4 h-4 text-[#D1FF00]" />}
            </button>
            <button
              onClick={() => setIsMinimized(true)}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-[#222222] transition cursor-pointer"
              title="Minimize to Floating Bar"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-[#222222] transition cursor-pointer"
              title="Close Timer Modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-1.5 bg-[#0A0A0A] p-1.5 rounded-xl border border-[#222222] text-xs font-mono">
            <button
              onClick={() => {
                setIsRunning(false);
                setCountdownPrepSeconds(null);
                setMode('rest');
              }}
              className={`py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-1.5 ${
                mode === 'rest'
                  ? 'bg-[#D1FF00] text-black shadow-md shadow-[#D1FF00]/15'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Timer className="w-3.5 h-3.5" />
              Rest Countdown
            </button>
            <button
              onClick={() => {
                setIsRunning(false);
                setCountdownPrepSeconds(null);
                setMode('hold');
              }}
              className={`py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-1.5 ${
                mode === 'hold'
                  ? 'bg-[#D1FF00] text-black shadow-md shadow-[#D1FF00]/15'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              Static Hold (Iso)
            </button>
          </div>

          {/* Iso Prepare Countdown Option */}
          {mode === 'hold' && (
            <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#0A0A0A] border border-[#222222] text-[11px] text-zinc-400 font-mono">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#D1FF00]" />
                Get Ready Countdown:
              </span>
              <div className="flex items-center gap-1">
                {([3, 5, 0] as const).map(sec => (
                  <button
                    key={sec}
                    onClick={() => setPrepDuration(sec)}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition cursor-pointer ${
                      prepDuration === sec
                        ? 'bg-[#D1FF00] text-black'
                        : 'bg-[#141414] text-zinc-400 hover:text-white border border-[#222222]'
                    }`}
                  >
                    {sec === 0 ? 'Off' : `${sec}s`}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Primary Digital Display with Countdown Overlay */}
          <div className="relative flex flex-col items-center justify-center py-8 px-4 bg-[#0A0A0A] border border-[#222222] rounded-2xl overflow-hidden select-none">
            {/* Background Progress Glow */}
            <div
              className="absolute inset-0 bg-[#D1FF00]/10 pointer-events-none transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />

            {/* PREPARE COUNTDOWN OVERLAY (3... 2... 1... GO!) */}
            {countdownPrepSeconds !== null ? (
              <div className="relative z-20 flex flex-col items-center justify-center space-y-1 animate-in zoom-in-90 duration-150">
                <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-[#D1FF00]">
                  Get In Position &middot; Ready
                </span>
                <div className="text-6xl sm:text-7xl font-black tracking-widest text-[#D1FF00] drop-shadow-[0_0_25px_rgba(209,255,0,0.6)]">
                  {countdownPrepSeconds === 0 ? 'GO!' : countdownPrepSeconds}
                </div>
                <span className="text-[10px] text-zinc-400">
                  Hold starts immediately
                </span>
              </div>
            ) : (
              <div className="relative z-10 flex flex-col items-center justify-center">
                <div className="text-5xl sm:text-6xl font-black tracking-widest text-white font-mono flex items-baseline">
                  {mode === 'rest' ? (
                    formatTime(timeLeft)
                  ) : (
                    <>
                      <span>{stopwatchSeconds}</span>
                      <span className="text-2xl text-zinc-500 font-bold ml-1">.{stopwatchMillis}s</span>
                    </>
                  )}
                </div>

                <div className="text-[10px] font-bold text-zinc-500 mt-1 uppercase tracking-widest flex items-center gap-1.5">
                  {mode === 'rest' ? (
                    <span>Rest Period Remaining</span>
                  ) : (
                    <span>
                      Active Isometric Hold {targetHold > 0 && `(Target: ${targetHold}s)`}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Preset Buttons & Quick Adjusters for Rest Mode */}
          {mode === 'rest' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-1.5 font-mono">
                {[30, 60, 90, 120, 180].map(secs => (
                  <button
                    key={secs}
                    onClick={() => handleSelectPreset(secs)}
                    className={`flex-1 py-1 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                      restDuration === secs
                        ? 'bg-[#D1FF00] text-black border border-[#D1FF00] shadow-sm'
                        : 'bg-[#0A0A0A] text-zinc-400 border border-[#222222] hover:text-white hover:border-zinc-700'
                    }`}
                  >
                    {secs}s
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-zinc-400 font-mono pt-1">
                <button
                  onClick={() => handleAdjustRest(-15)}
                  className="px-2.5 py-1 rounded bg-[#0A0A0A] hover:bg-[#1f1f1f] text-zinc-300 border border-[#222222] transition cursor-pointer flex items-center gap-1"
                >
                  <Minus className="w-3 h-3" /> 15s
                </button>
                <button
                  onClick={() => handleAdjustRest(15)}
                  className="px-2.5 py-1 rounded bg-[#0A0A0A] hover:bg-[#1f1f1f] text-zinc-300 border border-[#222222] transition cursor-pointer flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" /> 15s
                </button>
              </div>
            </div>
          )}

          {/* Primary Action Controls */}
          <div className="flex items-center gap-2.5 pt-1">
            <button
              onClick={isRunning ? handlePause : handleStart}
              className={`flex-1 py-3 rounded-xl font-mono font-extrabold text-sm uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-98 ${
                isRunning
                  ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700'
                  : 'bg-[#D1FF00] hover:bg-[#b8e600] text-black shadow-[#D1FF00]/20'
              }`}
            >
              {isRunning ? (
                <>
                  <Pause className="w-4 h-4 fill-current" /> Pause
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  {mode === 'hold' ? (prepDuration > 0 ? 'Start Hold (3s Ready)' : 'Start Hold') : 'Start Rest'}
                </>
              )}
            </button>

            <button
              onClick={handleReset}
              className="p-3 rounded-xl bg-[#0A0A0A] hover:bg-[#1f1f1f] text-zinc-400 hover:text-white border border-[#222222] transition cursor-pointer active:scale-95"
              title="Reset Timer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* 1-Tap Log Set & Auto-Rest Prompt (if hold was recorded or active exercise open) */}
          {((mode === 'hold' && (stopwatchSeconds > 0 || lastCompletedHold !== null)) || activeExercise) && (
            <div className="pt-2 border-t border-[#222222]">
              <button
                onClick={handleLogAndRest}
                className="w-full py-2.5 px-3 rounded-xl bg-[#0A0A0A] hover:bg-[#181818] text-[#D1FF00] border border-[#D1FF00]/40 font-mono font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer group shadow-sm hover:border-[#D1FF00]"
              >
                <Dumbbell className="w-3.5 h-3.5 text-[#D1FF00]" />
                <span>
                  Log Set {mode === 'hold' ? `(${stopwatchSeconds || lastCompletedHold}s hold)` : `(${activeExercise?.passCriteria.targetReps || 10} reps)`} &amp; Start Rest
                </span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
