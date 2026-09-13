import React, { useState, useEffect, useRef } from 'react';
import {
  WorkoutSessionConfig,
  ProgressionExercise,
  PBRecord,
  SkillTree,
  WorkoutLoggedSet,
  WarmupExercise,
  StretchExercise
} from '../types';
import { WARMUP_EXERCISES } from '../data/warmupData';
import { STRETCH_EXERCISES } from '../data/stretchData';
import { soundFX, triggerVibration } from '../utils/sound';
import {
  Dumbbell,
  Play,
  Pause,
  RotateCcw,
  X,
  Volume2,
  VolumeX,
  Clock,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Flame,
  Activity,
  Plus,
  Minus,
  Timer,
  AlertTriangle,
  Award,
  Zap,
  ArrowRight
} from 'lucide-react';

interface WorkoutSandboxProps {
  config: WorkoutSessionConfig;
  trees: SkillTree[];
  pbRecords: Record<string, PBRecord>;
  allExercises: Record<string, ProgressionExercise>;
  onFinishWorkout: (loggedSets: WorkoutLoggedSet[], sessionDurationSeconds: number) => void;
  onCancelWorkout: () => void;
}

type SandboxPhase = 'warmup' | 'superset' | 'rest' | 'stretches' | 'summary';

export const WorkoutSandbox: React.FC<WorkoutSandboxProps> = ({
  config,
  trees,
  pbRecords,
  allExercises,
  onFinishWorkout,
  onCancelWorkout
}) => {
  // Session Overall Timer
  const [sessionSeconds, setSessionSeconds] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(soundFX.getMuted());
  const [phase, setPhase] = useState<SandboxPhase>('warmup');
  const [showExitConfirm, setShowExitConfirm] = useState<boolean>(false);

  // Dynamic Exercise Slots (allows dropping/increasing level at any point)
  const [exerciseA1, setExerciseA1] = useState<ProgressionExercise>(config.exerciseA1);
  const [exerciseB1, setExerciseB1] = useState<ProgressionExercise>(config.exerciseB1);
  const [exerciseA2, setExerciseA2] = useState<ProgressionExercise>(config.exerciseA2);
  const [exerciseB2, setExerciseB2] = useState<ProgressionExercise>(config.exerciseB2);

  // Superset Execution State
  const [currentSupersetIdx, setCurrentSupersetIdx] = useState<1 | 2>(1);
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [currentSlot, setCurrentSlot] = useState<'A' | 'B'>('A');
  const [loggedSets, setLoggedSets] = useState<WorkoutLoggedSet[]>([]);

  // Reps Stepper state
  const [inputReps, setInputReps] = useState<number>(8);
  const [addedWeightKg, setAddedWeightKg] = useState<number>(0);
  const [rpeScore, setRpeScore] = useState<number>(8);
  const [showAdvancedInputs, setShowAdvancedInputs] = useState<boolean>(false);

  // Static Hold Stopwatch state (user starts it manually)
  const [isHolding, setIsHolding] = useState<boolean>(false);
  const [holdElapsedSeconds, setHoldElapsedSeconds] = useState<number>(0);
  const holdStartTimestampRef = useRef<number>(0);
  const holdIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Rest Timer State
  const [restDuration, setRestDuration] = useState<number>(config.restBetweenRoundsSeconds);
  const [restTimeLeft, setRestTimeLeft] = useState<number>(config.restBetweenRoundsSeconds);
  const [isRestBetweenSupersets, setIsRestBetweenSupersets] = useState<boolean>(false);
  const restTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Warmup & Stretch state
  const warmupList = config.preset.warmupIds
    .map(id => WARMUP_EXERCISES.find(w => w.id === id))
    .filter(Boolean) as WarmupExercise[];
  const stretchList = config.preset.stretchIds
    .map(id => STRETCH_EXERCISES.find(s => s.id === id))
    .filter(Boolean) as StretchExercise[];

  const [warmupIdx, setWarmupIdx] = useState<number>(0);
  const [stretchIdx, setStretchIdx] = useState<number>(0);

  // 5s Countdown Prep State for Warmup / Stretches
  const [prepSeconds, setPrepSeconds] = useState<number | null>(5);
  const [movementDuration, setMovementDuration] = useState<number>(35);
  const [movementTimeLeft, setMovementTimeLeft] = useState<number>(35);
  const movementTimerRef = useRef<NodeJS.Timeout | null>(null);
  const prepTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Determine current active exercise
  const currentExercise =
    currentSupersetIdx === 1
      ? currentSlot === 'A'
        ? exerciseA1
        : exerciseB1
      : currentSlot === 'A'
      ? exerciseA2
      : exerciseB2;

  const pairedExercise =
    currentSupersetIdx === 1
      ? currentSlot === 'A'
        ? exerciseB1
        : exerciseA1
      : currentSlot === 'A'
      ? exerciseB2
      : exerciseA2;

  const currentTree = trees.find(t => t.id === currentExercise.skillTreeId);
  const treeExerciseList = currentTree
    ? currentTree.exercises.map(id => allExercises[id]).filter(Boolean)
    : [];
  const currentTreeIndex = treeExerciseList.findIndex(e => e.id === currentExercise.id);

  // Reset default input reps whenever active exercise changes
  useEffect(() => {
    if (currentExercise.metricType === 'seconds') {
      setInputReps(currentExercise.passCriteria.targetHoldSeconds || 15);
    } else {
      setInputReps(currentExercise.passCriteria.targetReps || 8);
    }
    setIsHolding(false);
    setHoldElapsedSeconds(0);
  }, [currentExercise]);

  // Overall Session Clock (runs continuously)
  useEffect(() => {
    const clock = setInterval(() => {
      setSessionSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(clock);
  }, []);

  // Format seconds into MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Sound Mute Toggle
  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundFX.setMuted(next);
  };

  // --- LEVEL ADJUSTMENT HANDLERS (Progression / Regression on the fly) ---
  const handleShiftLevel = (delta: number) => {
    if (currentTreeIndex === -1) return;
    const targetIdx = currentTreeIndex + delta;
    if (targetIdx < 0 || targetIdx >= treeExerciseList.length) return;
    const targetExercise = treeExerciseList[targetIdx];

    if (currentSupersetIdx === 1) {
      if (currentSlot === 'A') setExerciseA1(targetExercise);
      else setExerciseB1(targetExercise);
    } else {
      if (currentSlot === 'A') setExerciseA2(targetExercise);
      else setExerciseB2(targetExercise);
    }
  };

  // --- STATIC HOLD STOPWATCH HANDLERS ---
  const handleStartHold = () => {
    setIsHolding(true);
    setHoldElapsedSeconds(0);
    holdStartTimestampRef.current = Date.now();
    soundFX.playGoChime();
    triggerVibration(100);

    if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    holdIntervalRef.current = setInterval(() => {
      const elapsed = (Date.now() - holdStartTimestampRef.current) / 1000;
      setHoldElapsedSeconds(Math.round(elapsed));
    }, 200);
  };

  const handleStopHold = () => {
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
      holdIntervalRef.current = null;
    }
    setIsHolding(false);
  };

  // --- LOGGING CURRENT SET ---
  const handleLogCurrentSet = (overrideMetricValue?: number) => {
    if (isHolding) {
      handleStopHold();
    }

    const finalVal = overrideMetricValue !== undefined ? overrideMetricValue : inputReps;
    const existingPb = pbRecords[currentExercise.id];
    const isNewPB = !existingPb || finalVal > (existingPb.bestValue || 0);

    const newSet: WorkoutLoggedSet = {
      id: `workout-set-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      exerciseId: currentExercise.id,
      exerciseTitle: currentExercise.title,
      supersetIndex: currentSupersetIdx,
      roundNumber: currentRound,
      slot: currentSlot,
      metricValue: finalVal,
      metricType: currentExercise.metricType,
      weightAddedKg: addedWeightKg > 0 ? addedWeightKg : undefined,
      rpe: rpeScore,
      timestamp: Date.now(),
      isPB: isNewPB
    };

    setLoggedSets(prev => [...prev, newSet]);

    if (isNewPB) {
      soundFX.playCelebrationFanfare();
      triggerVibration([100, 100, 200]);
    } else {
      soundFX.playTick();
      triggerVibration(60);
    }

    // Determine next step in Superset flow
    if (currentSlot === 'A') {
      // Move to paired Skill B immediately with 0s rest!
      setCurrentSlot('B');
    } else {
      // Skill B completed -> Start automated Rest Timer!
      const isFinalRoundOfSuperset = currentRound >= config.roundsPerSuperset;

      if (isFinalRoundOfSuperset) {
        if (currentSupersetIdx === 1) {
          // Finished Superset 1! Start 120s Transition Rest
          setIsRestBetweenSupersets(true);
          startRestCountdown(config.restBetweenSupersetsSeconds);
        } else {
          // Finished Superset 2! All superset rounds complete -> proceed to Stretches
          soundFX.playCelebrationFanfare();
          triggerVibration([100, 50, 100, 50, 200]);
          if (stretchList.length > 0) {
            setPhase('stretches');
            startStretch(0);
          } else {
            setPhase('summary');
          }
        }
      } else {
        // Standard round rest (90s)
        setIsRestBetweenSupersets(false);
        startRestCountdown(config.restBetweenRoundsSeconds);
      }
    }
  };

  // --- REST TIMER HANDLERS ---
  const startRestCountdown = (seconds: number) => {
    setRestDuration(seconds);
    setRestTimeLeft(seconds);
    setPhase('rest');

    if (restTimerRef.current) clearInterval(restTimerRef.current);
    restTimerRef.current = setInterval(() => {
      setRestTimeLeft(prev => {
        if (prev <= 4 && prev > 1) {
          soundFX.playCountdownBeep(false);
        } else if (prev === 1) {
          soundFX.playCountdownBeep(true);
        }

        if (prev <= 1) {
          clearInterval(restTimerRef.current!);
          restTimerRef.current = null;
          soundFX.playTimerComplete();
          triggerVibration([150, 100, 150]);
          handleRestComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleRestComplete = () => {
    if (restTimerRef.current) {
      clearInterval(restTimerRef.current);
      restTimerRef.current = null;
    }

    if (isRestBetweenSupersets) {
      // Transition from Superset 1 to Superset 2 Round 1
      setCurrentSupersetIdx(2);
      setCurrentRound(1);
      setCurrentSlot('A');
      setIsRestBetweenSupersets(false);
      setPhase('superset');
    } else {
      // Advance to next round, Slot A
      setCurrentRound(prev => prev + 1);
      setCurrentSlot('A');
      setPhase('superset');
    }
  };

  const handleSkipRest = () => {
    handleRestComplete();
  };

  const handleAdjustRest = (delta: number) => {
    setRestTimeLeft(prev => Math.max(5, prev + delta));
  };

  // --- WARMUP FLOW HANDLERS (5s countdown then 35s timer) ---
  const startWarmup = (index: number) => {
    setWarmupIdx(index);
    setPrepSeconds(5);
    setMovementDuration(35);
    setMovementTimeLeft(35);

    if (prepTimerRef.current) clearInterval(prepTimerRef.current);
    if (movementTimerRef.current) clearInterval(movementTimerRef.current);

    prepTimerRef.current = setInterval(() => {
      setPrepSeconds(prev => {
        if (prev === null) return null;
        if (prev > 1) {
          soundFX.playCountdownBeep(false);
          return prev - 1;
        }
        // Prep finished! Start movement timer
        clearInterval(prepTimerRef.current!);
        prepTimerRef.current = null;
        soundFX.playGoChime();
        triggerVibration(100);
        runMovementTimer(35, () => handleNextWarmup(index + 1));
        return null;
      });
    }, 1000);
  };

  const runMovementTimer = (duration: number, onComplete: () => void) => {
    setMovementTimeLeft(duration);
    if (movementTimerRef.current) clearInterval(movementTimerRef.current);

    movementTimerRef.current = setInterval(() => {
      setMovementTimeLeft(prev => {
        if (prev <= 4 && prev > 1) {
          soundFX.playCountdownBeep(false);
        } else if (prev === 1) {
          soundFX.playCountdownBeep(true);
        }

        if (prev <= 1) {
          clearInterval(movementTimerRef.current!);
          movementTimerRef.current = null;
          soundFX.playTimerComplete();
          triggerVibration([100, 50, 100]);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleNextWarmup = (nextIdx: number) => {
    if (nextIdx < warmupList.length) {
      startWarmup(nextIdx);
    } else {
      // Warmups finished -> Begin Superset 1!
      soundFX.playCelebrationFanfare();
      triggerVibration([100, 100]);
      setPhase('superset');
      setCurrentSupersetIdx(1);
      setCurrentRound(1);
      setCurrentSlot('A');
    }
  };

  const handleSkipWarmup = () => {
    if (prepTimerRef.current) clearInterval(prepTimerRef.current);
    if (movementTimerRef.current) clearInterval(movementTimerRef.current);
    handleNextWarmup(warmupIdx + 1);
  };

  const handleSkipAllWarmups = () => {
    if (prepTimerRef.current) clearInterval(prepTimerRef.current);
    if (movementTimerRef.current) clearInterval(movementTimerRef.current);
    setPhase('superset');
    setCurrentSupersetIdx(1);
    setCurrentRound(1);
    setCurrentSlot('A');
  };

  // --- STRETCHES FLOW HANDLERS ---
  const startStretch = (index: number) => {
    setStretchIdx(index);
    setPrepSeconds(5);
    setMovementDuration(35);
    setMovementTimeLeft(35);

    if (prepTimerRef.current) clearInterval(prepTimerRef.current);
    if (movementTimerRef.current) clearInterval(movementTimerRef.current);

    prepTimerRef.current = setInterval(() => {
      setPrepSeconds(prev => {
        if (prev === null) return null;
        if (prev > 1) {
          soundFX.playCountdownBeep(false);
          return prev - 1;
        }
        clearInterval(prepTimerRef.current!);
        prepTimerRef.current = null;
        soundFX.playGoChime();
        triggerVibration(100);
        runMovementTimer(35, () => handleNextStretch(index + 1));
        return null;
      });
    }, 1000);
  };

  const handleNextStretch = (nextIdx: number) => {
    if (nextIdx < stretchList.length) {
      startStretch(nextIdx);
    } else {
      // Stretches finished -> Show complete summary
      soundFX.playCelebrationFanfare();
      triggerVibration([100, 50, 100, 50, 200]);
      setPhase('summary');
    }
  };

  const handleSkipStretch = () => {
    if (prepTimerRef.current) clearInterval(prepTimerRef.current);
    if (movementTimerRef.current) clearInterval(movementTimerRef.current);
    handleNextStretch(stretchIdx + 1);
  };

  // Start initial warmup on mount if warmups exist
  useEffect(() => {
    if (warmupList.length > 0) {
      startWarmup(0);
    } else {
      setPhase('superset');
    }

    return () => {
      if (restTimerRef.current) clearInterval(restTimerRef.current);
      if (prepTimerRef.current) clearInterval(prepTimerRef.current);
      if (movementTimerRef.current) clearInterval(movementTimerRef.current);
      if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    };
  }, []);

  // Calculate Overall Progress (0 to 100)
  const totalWorkoutUnits =
    warmupList.length + config.roundsPerSuperset * 4 + stretchList.length;
  let completedUnits = 0;
  if (phase === 'warmup') {
    completedUnits = warmupIdx;
  } else if (phase === 'superset' || phase === 'rest') {
    completedUnits =
      warmupList.length +
      (currentSupersetIdx === 1
        ? (currentRound - 1) * 2 + (currentSlot === 'B' ? 1 : 0) + (phase === 'rest' ? 1 : 0)
        : config.roundsPerSuperset * 2 +
          (currentRound - 1) * 2 +
          (currentSlot === 'B' ? 1 : 0) +
          (phase === 'rest' ? 1 : 0));
  } else if (phase === 'stretches') {
    completedUnits = warmupList.length + config.roundsPerSuperset * 4 + stretchIdx;
  } else if (phase === 'summary') {
    completedUnits = totalWorkoutUnits;
  }
  const progressPercent = Math.min(100, Math.round((completedUnits / totalWorkoutUnits) * 100));

  return (
    <div className="fixed inset-0 z-50 bg-[#0A0A0A] text-zinc-100 flex flex-col font-sans select-none overflow-hidden">
      
      {/* 1. MINIMAL HUD TOP HEADER */}
      <header className="px-4 sm:px-6 py-3 border-b border-[#222222] bg-[#0f1013] flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowExitConfirm(true)}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-[#181a20] hover:bg-[#252834] text-zinc-400 hover:text-white border border-[#262933] text-xs font-mono font-bold transition flex items-center gap-1.5 cursor-pointer"
            title="End or pause workout"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Quit</span>
          </button>

          {/* Phase Badge */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-black uppercase tracking-wider px-2.5 py-1 rounded-lg bg-[#D1FF00]/10 text-[#D1FF00] border border-[#D1FF00]/25">
              {phase === 'warmup' && `WARMUP ${warmupIdx + 1}/${warmupList.length}`}
              {phase === 'superset' &&
                `SUPERSET ${currentSupersetIdx}/2 · ROUND ${currentRound}/3 · SLOT ${currentSlot}`}
              {phase === 'rest' &&
                (isRestBetweenSupersets
                  ? 'SUPERSET TRANSITION REST'
                  : `REST · ROUND ${currentRound}/3`)}
              {phase === 'stretches' && `COOLDOWN ${stretchIdx + 1}/${stretchList.length}`}
              {phase === 'summary' && 'WORKOUT COMPLETE'}
            </span>
          </div>
        </div>

        {/* Center/Right Session Stopwatch & Mute Toggle */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-mono font-bold text-zinc-300 bg-[#16181f] px-3 py-1.5 rounded-xl border border-[#272b38]">
            <Clock className="w-3.5 h-3.5 text-[#D1FF00]" />
            <span>{formatTime(sessionSeconds)}</span>
          </div>

          <button
            onClick={toggleMute}
            className="p-2 rounded-xl bg-[#16181f] hover:bg-[#252834] text-zinc-400 hover:text-white border border-[#272b38] transition cursor-pointer"
            title={isMuted ? 'Unmute audio cues' : 'Mute audio cues'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-[#D1FF00]" />}
          </button>
        </div>
      </header>

      {/* 2. PROGRESS BAR */}
      <div className="w-full bg-[#181a20] h-1.5 shrink-0 overflow-hidden">
        <div
          className="h-full bg-[#D1FF00] transition-all duration-300 shadow-sm shadow-[#D1FF00]"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* 3. MAIN WORKOUT SANDBOX BODY */}
      <main className="flex-1 flex flex-col justify-center items-center p-4 sm:p-6 overflow-y-auto max-w-2xl w-full mx-auto"
        style={{ paddingTop : `130px` }}>
        
        {/* ========================================================
            PHASE A: WARMUP HUD
        ======================================================== */}
        {phase === 'warmup' && warmupList[warmupIdx] && (
          <div className="w-full max-w-lg space-y-6 animate-in fade-in zoom-in-95 duration-200">
            {/* Countdown Prep Header */}
            {prepSeconds !== null ? (
              <div className="text-center py-6 space-y-3">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D1FF00]">
                  Get Ready · Next Warmup
                </span>
                <div className="text-6xl sm:text-7xl font-mono font-black text-white animate-pulse">
                  {prepSeconds}
                </div>
                <p className="text-sm font-bold text-zinc-300">
                  {warmupList[warmupIdx].name}
                </p>
              </div>
            ) : (
              /* Active Warmup Movement Timer */
              <div className="text-center space-y-4">
                <div className="inline-flex flex-col items-center justify-center w-36 h-36 rounded-full border-4 border-[#D1FF00] bg-[#15171d] shadow-xl shadow-[#D1FF00]/10">
                  <span className="text-4xl font-mono font-black text-white">
                    {movementTimeLeft}s
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                    Remaining
                  </span>
                </div>
              </div>
            )}

            {/* Exercise Card */}
            <div className="bg-[#121316] border border-[#252833] rounded-2xl p-5 space-y-3 text-center shadow-lg">
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-[#1e222c] text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                {warmupList[warmupIdx].categoryLabel}
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white font-display">
                {warmupList[warmupIdx].name}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto">
                {warmupList[warmupIdx].purpose}
              </p>

              {warmupList[warmupIdx].cues.length > 0 && (
                <div className="pt-2 flex flex-wrap justify-center gap-1.5">
                  {warmupList[warmupIdx].cues.slice(0, 2).map((cue, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-mono bg-[#1a1c23] text-zinc-300 px-2.5 py-1 rounded-lg border border-[#282d3b]"
                    >
                      • {cue}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Warmup Controls */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={handleSkipAllWarmups}
                className="px-4 py-2.5 rounded-xl bg-[#181a20] hover:bg-[#242833] text-zinc-400 hover:text-white text-xs font-mono font-bold transition cursor-pointer"
              >
                Skip All Warmups
              </button>

              <button
                onClick={handleSkipWarmup}
                className="px-5 py-2.5 rounded-xl bg-[#222631] hover:bg-[#2d3241] text-zinc-200 hover:text-white text-xs font-mono font-bold transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>Next Warmup</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            PHASE B: SUPERSET EXECUTION HUD (Minimal-thinking core)
        ======================================================== */}
        {phase === 'superset' && (
          <div className="w-full max-w-lg space-y-5 animate-in fade-in duration-200">
            
            {/* 1. Paired Exercise Notification Banner */}
            <div className={`p-3 rounded-xl border flex items-center justify-between text-xs font-mono ${
              currentSlot === 'A'
                ? 'bg-[#14161b] border-[#D1FF00]/30 text-zinc-300'
                : 'bg-[#181b22] border-amber-500/30 text-zinc-300'
            }`}>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#D1FF00] shrink-0" />
                <span>
                  {currentSlot === 'A' ? (
                    <>
                      Paired with: <strong className="text-white">{pairedExercise.title}</strong>
                    </>
                  ) : (
                    <>
                      Completes Round {currentRound}/3 → Auto-starts 90s rest
                    </>
                  )}
                </span>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-black/40 text-zinc-400">
                {currentSlot === 'A' ? '0s Rest Next' : 'Round Finisher'}
              </span>
            </div>

            {/* 2. Main Exercise Card */}
            <div className="bg-[#121316] border border-[#2a2e3a] rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
              
              {/* Header Info */}
              <div className="space-y-1 text-center">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 bg-[#1a1c24] px-2 py-0.5 rounded border border-[#2b2f3d]">
                    {currentTree?.shortName} · Slot {currentSlot}
                  </span>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#D1FF00] bg-[#D1FF00]/10 px-2 py-0.5 rounded">
                    Round {currentRound} of 3
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight pt-1">
                  {currentExercise.title}
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400">
                  {currentExercise.subtitle}
                </p>
              </div>

              {/* 3. On-The-Fly Level Stepper (Drop / Increase Level Mid-Set) */}
              <div className="bg-[#161820] border border-[#262a36] rounded-xl p-2.5 flex items-center justify-between">
                <button
                  onClick={() => handleShiftLevel(-1)}
                  disabled={currentTreeIndex <= 0}
                  className="px-2.5 py-1.5 rounded-lg bg-[#20232c] hover:bg-[#2b303d] text-zinc-300 hover:text-white disabled:opacity-25 font-mono text-xs flex items-center gap-1 cursor-pointer disabled:cursor-not-allowed transition"
                  title="Regression (Lower Level)"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Regression</span>
                </button>

                <div className="text-center px-2">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">
                    Working Level
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[#D1FF00] font-mono line-clamp-1">
                    Lvl {currentExercise.level} · {currentExercise.title}
                  </span>
                </div>

                <button
                  onClick={() => handleShiftLevel(1)}
                  disabled={currentTreeIndex >= treeExerciseList.length - 1}
                  className="px-2.5 py-1.5 rounded-lg bg-[#20232c] hover:bg-[#2b303d] text-zinc-300 hover:text-white disabled:opacity-25 font-mono text-xs flex items-center gap-1 cursor-pointer disabled:cursor-not-allowed transition"
                  title="Progression (Higher Level)"
                >
                  <span className="hidden sm:inline">Progression</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Target Standard */}
              <div className="text-center py-1">
                <span className="text-xs font-mono text-zinc-400">
                  Target Criteria:{' '}
                  <strong className="text-white">
                    {currentExercise.metricType === 'seconds'
                      ? `${currentExercise.passCriteria.targetHoldSeconds || 15}s Hold`
                      : `${currentExercise.passCriteria.targetReps || 8} Reps`}
                  </strong>{' '}
                  · Form: {currentExercise.passCriteria.formStandard}
                </span>
              </div>

              {/* 4. Logging & Controls Area */}
              {currentExercise.metricType === 'seconds' ? (
                /* STATIC HOLD STOPWATCH (Started manually by user) */
                <div className="space-y-4 pt-2">
                  <div className="text-center space-y-1">
                    <div className="text-5xl sm:text-6xl font-mono font-black text-white tracking-tight">
                      {holdElapsedSeconds}s
                    </div>
                    <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                      {isHolding ? 'Hold In Progress...' : 'Hold Stopwatch Ready'}
                    </span>
                  </div>

                  {!isHolding ? (
                    <button
                      id="start-hold-btn"
                      onClick={handleStartHold}
                      className="w-full py-4 rounded-xl bg-[#D1FF00] hover:bg-[#b8e600] text-black font-mono font-black text-sm uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-[#D1FF00]/20 active:scale-98"
                    >
                      <Play className="w-5 h-5 fill-black" />
                      <span>Start Static Hold</span>
                    </button>
                  ) : (
                    <button
                      id="log-hold-btn"
                      onClick={() => handleLogCurrentSet(holdElapsedSeconds)}
                      className="w-full py-4 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black font-mono font-black text-sm uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-emerald-400/20 active:scale-98 animate-pulse"
                    >
                      <Check className="w-5 h-5 stroke-[2.5]" />
                      <span>
                        Log Hold ({holdElapsedSeconds}s) & {currentSlot === 'A' ? 'Go to Skill B' : 'Start Rest'}
                      </span>
                    </button>
                  )}
                </div>
              ) : (
                /* REPETITIONS STEPPER */
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-center gap-4">
                    <button
                      onClick={() => setInputReps(prev => Math.max(1, prev - 1))}
                      className="w-12 h-12 rounded-xl bg-[#1e222c] hover:bg-[#2b303d] text-zinc-300 hover:text-white flex items-center justify-center font-mono text-lg font-bold transition cursor-pointer active:scale-95"
                    >
                      <Minus className="w-5 h-5" />
                    </button>

                    <div className="text-center min-w-[120px]">
                      <div className="text-5xl font-mono font-black text-white tracking-tight">
                        {inputReps}
                      </div>
                      <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                        Reps Completed
                      </span>
                    </div>

                    <button
                      onClick={() => setInputReps(prev => prev + 1)}
                      className="w-12 h-12 rounded-xl bg-[#1e222c] hover:bg-[#2b303d] text-zinc-300 hover:text-white flex items-center justify-center font-mono text-lg font-bold transition cursor-pointer active:scale-95"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Log Action Button */}
                  <button
                    id="log-set-btn"
                    onClick={() => handleLogCurrentSet(inputReps)}
                    className="w-full py-4 rounded-xl bg-[#D1FF00] hover:bg-[#b8e600] text-black font-mono font-black text-sm uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-[#D1FF00]/20 active:scale-98"
                  >
                    <Check className="w-5 h-5 stroke-[2.5]" />
                    <span>
                      {currentSlot === 'A'
                        ? `Log Set (${inputReps} Reps) & Switch to ${pairedExercise.title} ➔`
                        : `Log Set (${inputReps} Reps) & Start Rest (90s) ➔`}
                    </span>
                  </button>
                </div>
              )}

              {/* Optional Weight / RPE toggle */}
              <div className="pt-2 text-center">
                <button
                  onClick={() => setShowAdvancedInputs(!showAdvancedInputs)}
                  className="text-[11px] font-mono text-zinc-400 hover:text-zinc-300 underline cursor-pointer"
                >
                  {showAdvancedInputs ? 'Hide Extra Details' : '+ Add Added Weight (kg) / RPE'}
                </button>

                {showAdvancedInputs && (
                  <div className="mt-3 p-3 bg-[#171922] rounded-xl border border-[#282c38] grid grid-cols-2 gap-3 text-left animate-in fade-in duration-150">
                    <div>
                      <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                        Weight Added (kg)
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="0.5"
                        value={addedWeightKg || ''}
                        placeholder="0"
                        onChange={e => setAddedWeightKg(parseFloat(e.target.value) || 0)}
                        className="w-full bg-[#101217] border border-[#2b2f3d] rounded-lg px-2.5 py-1.5 text-xs font-mono text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                        RPE Score (1-10)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={rpeScore || ''}
                        onChange={e => setRpeScore(parseInt(e.target.value, 10) || 8)}
                        className="w-full bg-[#101217] border border-[#2b2f3d] rounded-lg px-2.5 py-1.5 text-xs font-mono text-white"
                      />
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Set History in Current Workout */}
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 px-1">
              <span>Sets Logged This Session: <strong>{loggedSets.length}</strong></span>
              <span>Rounds Done: <strong>{currentRound - 1}/3</strong></span>
            </div>

          </div>
        )}

        {/* ========================================================
            PHASE C: REST TIMER HUD (Automated Rest)
        ======================================================== */}
        {phase === 'rest' && (
          <div className="w-full max-w-lg space-y-6 text-center animate-in fade-in zoom-in-95 duration-200">
            
            {/* Header Banner */}
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D1FF00]">
                {isRestBetweenSupersets ? 'Superset 1 Complete · Recovery' : 'Resting Between Rounds'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
                {isRestBetweenSupersets ? 'Transition to Superset 2' : `Round ${currentRound} Complete`}
              </h2>
            </div>

            {/* Big Circular Countdown Display */}
            <div className="inline-flex flex-col items-center justify-center w-48 h-48 rounded-full border-4 border-[#D1FF00] bg-[#121316] shadow-2xl shadow-[#D1FF00]/15 mx-auto">
              <span className="text-5xl sm:text-6xl font-mono font-black text-white">
                {formatTime(restTimeLeft)}
              </span>
              <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 mt-1">
                Rest Remaining
              </span>
            </div>

            {/* Next Up Preview */}
            <div className="bg-[#15171d] border border-[#282d3a] rounded-xl p-3.5 max-w-sm mx-auto text-xs font-mono">
              <span className="text-zinc-400 uppercase text-[10px] block mb-0.5">Next Up</span>
              <span className="text-white font-bold block text-sm">
                {isRestBetweenSupersets
                  ? `Superset 2 Round 1: ${exerciseA2.title}`
                  : `Round ${currentRound + 1}: ${exerciseA1.title}`}
              </span>
            </div>

            {/* Quick Time Adjusters & Skip Button */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => handleAdjustRest(-15)}
                className="px-3.5 py-2 rounded-xl bg-[#1e222c] hover:bg-[#2b303d] text-zinc-300 text-xs font-mono font-bold transition cursor-pointer"
              >
                -15s
              </button>

              <button
                id="skip-rest-btn"
                onClick={handleSkipRest}
                className="px-6 py-3 rounded-xl bg-[#D1FF00] hover:bg-[#b8e600] text-black font-mono font-black text-xs uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 shadow-lg shadow-[#D1FF00]/20 active:scale-95"
              >
                <span>Skip Rest & Start Next Round</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleAdjustRest(15)}
                className="px-3.5 py-2 rounded-xl bg-[#1e222c] hover:bg-[#2b303d] text-zinc-300 text-xs font-mono font-bold transition cursor-pointer"
              >
                +15s
              </button>
            </div>

          </div>
        )}

        {/* ========================================================
            PHASE D: COOLDOWN STRETCHES HUD
        ======================================================== */}
        {phase === 'stretches' && stretchList[stretchIdx] && (
          <div className="w-full max-w-lg space-y-6 animate-in fade-in zoom-in-95 duration-200">
            {/* Countdown Prep Header */}
            {prepSeconds !== null ? (
              <div className="text-center py-6 space-y-3">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D1FF00]">
                  Cooldown · Get Ready
                </span>
                <div className="text-6xl sm:text-7xl font-mono font-black text-white animate-pulse">
                  {prepSeconds}
                </div>
                <p className="text-sm font-bold text-zinc-300">
                  {stretchList[stretchIdx].name}
                </p>
              </div>
            ) : (
              /* Active Stretch Hold Timer */
              <div className="text-center space-y-4">
                <div className="inline-flex flex-col items-center justify-center w-36 h-36 rounded-full border-4 border-[#D1FF00] bg-[#15171d] shadow-xl shadow-[#D1FF00]/10">
                  <span className="text-4xl font-mono font-black text-white">
                    {movementTimeLeft}s
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                    Hold Duration
                  </span>
                </div>
              </div>
            )}

            {/* Exercise Card */}
            <div className="bg-[#121316] border border-[#252833] rounded-2xl p-5 space-y-3 text-center shadow-lg">
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-[#1e222c] text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                {stretchList[stretchIdx].categoryLabel}
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white font-display">
                {stretchList[stretchIdx].name}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto">
                {stretchList[stretchIdx].purpose}
              </p>
            </div>

            {/* Stretch Controls */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={() => setPhase('summary')}
                className="px-4 py-2.5 rounded-xl bg-[#181a20] hover:bg-[#242833] text-zinc-400 hover:text-white text-xs font-mono font-bold transition cursor-pointer"
              >
                Skip to Summary
              </button>

              <button
                onClick={handleSkipStretch}
                className="px-5 py-2.5 rounded-xl bg-[#222631] hover:bg-[#2d3241] text-zinc-200 hover:text-white text-xs font-mono font-bold transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>Next Stretch</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            PHASE E: WORKOUT SUMMARY & CELEBRATION
        ======================================================== */}
        {phase === 'summary' && (
          <div className="w-full max-w-lg bg-[#121316] border border-[#2d313d] rounded-2xl p-6 sm:p-7 space-y-6 text-center shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-2xl bg-[#D1FF00] flex items-center justify-center text-black mx-auto shadow-xl shadow-[#D1FF00]/20">
              <Award className="w-8 h-8 stroke-[2.2]" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D1FF00]">
                Session Accomplished
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
                Great Workout!
              </h2>
              <p className="text-xs text-zinc-400">
                All logged sets will now be committed to your skill tree progress and personal records.
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-3 gap-2.5 py-1 text-left">
              <div className="bg-[#181a20] p-3 rounded-xl border border-[#272b38]">
                <span className="text-[10px] font-mono text-zinc-400 uppercase block">Duration</span>
                <span className="text-lg font-mono font-bold text-white">
                  {formatTime(sessionSeconds)}
                </span>
              </div>
              <div className="bg-[#181a20] p-3 rounded-xl border border-[#272b38]">
                <span className="text-[10px] font-mono text-zinc-400 uppercase block">Sets Logged</span>
                <span className="text-lg font-mono font-bold text-[#D1FF00]">
                  {loggedSets.length}
                </span>
              </div>
              <div className="bg-[#181a20] p-3 rounded-xl border border-[#272b38]">
                <span className="text-[10px] font-mono text-zinc-400 uppercase block">New PBs</span>
                <span className="text-lg font-mono font-bold text-amber-400">
                  {loggedSets.filter(s => s.isPB).length}
                </span>
              </div>
            </div>

            {/* Breakdown of Completed Sets */}
            <div className="space-y-2 text-left max-h-48 overflow-y-auto pr-1">
              <span className="text-[11px] font-mono text-zinc-400 uppercase font-bold tracking-wider block">
                Session Log Breakdown
              </span>
              {loggedSets.map((s, idx) => (
                <div
                  key={s.id || idx}
                  className="p-2.5 bg-[#171922] rounded-xl border border-[#262a37] flex items-center justify-between text-xs font-mono"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-400 text-[10px]">#{idx + 1}</span>
                    <span className="font-bold text-zinc-200 line-clamp-1">{s.exerciseTitle}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[#D1FF00] font-bold">
                      {s.metricValue} {s.metricType === 'seconds' ? 'sec' : 'reps'}
                    </span>
                    {s.isPB && (
                      <span className="text-[10px] bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded font-bold">
                        ★ PB
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Finish Action */}
            <button
              id="finish-and-save-btn"
              onClick={() => onFinishWorkout(loggedSets, sessionSeconds)}
              className="w-full py-4 rounded-xl bg-[#D1FF00] hover:bg-[#b8e600] text-black font-mono font-black text-sm uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2 shadow-xl shadow-[#D1FF00]/25 active:scale-98"
            >
              <CheckCircle2 className="w-5 h-5 stroke-[2.2]" />
              <span>Finish & Return to Dashboard</span>
            </button>
          </div>
        )}

      </main>

      {/* 4. EXIT CONFIRMATION MODAL */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#15171d] border border-[#2e3342] rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-2xl">
            <div className="flex items-center gap-2.5 text-amber-400">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="text-base font-bold text-white font-display">
                End Workout Session?
              </h3>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              You have completed <strong>{loggedSets.length} sets</strong> in this session. Would you like to save your logged sets or discard this workout?
            </p>

            <div className="space-y-2 pt-1">
              {loggedSets.length > 0 && (
                <button
                  onClick={() => {
                    setShowExitConfirm(false);
                    onFinishWorkout(loggedSets, sessionSeconds);
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#D1FF00] text-black font-mono font-bold text-xs uppercase tracking-wider transition cursor-pointer"
                >
                  Save {loggedSets.length} Sets & Finish Early
                </button>
              )}

              <button
                onClick={() => {
                  setShowExitConfirm(false);
                  onCancelWorkout();
                }}
                className="w-full py-2.5 rounded-xl bg-red-500/15 hover:bg-red-500/25 text-red-300 font-mono font-bold text-xs transition cursor-pointer"
              >
                Discard Workout (Don&apos;t Save)
              </button>

              <button
                onClick={() => setShowExitConfirm(false)}
                className="w-full py-2 rounded-xl bg-[#20232c] hover:bg-[#2a2e3a] text-zinc-300 font-mono text-xs transition cursor-pointer"
              >
                Resume Workout
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
