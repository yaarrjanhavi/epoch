import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Radio, Film, Sparkles } from 'lucide-react';

interface TimeMachineLoaderProps {
  targetDate: string; // e.g. 1998-05-14
  targetName: string;
  onComplete?: () => void;
}

const FUNNY_LOADING_LINES = [
  "Rewinding the clocks...",
  "Calibrating flux capacitors...",
  "Dusting off the charts...",
  "Asking old newspapers what they remember...",
  "Tuning analog radio frequencies...",
  "Calculating celestial lunar alignments...",
  "Synchronizing historical headlines...",
  "Retrieving box office receipts..."
];

export const TimeMachineLoader: React.FC<TimeMachineLoaderProps> = ({
  targetDate,
  targetName,
  onComplete
}) => {
  const currentYear = new Date().getFullYear();
  const targetYear = parseInt(targetDate.split('-')[0], 10) || 1998;

  const [displayYear, setDisplayYear] = useState(currentYear);
  const [progress, setProgress] = useState(5);
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    // Rotate funny lines
    const lineInterval = setInterval(() => {
      setLineIndex((prev) => (prev + 1) % FUNNY_LOADING_LINES.length);
    }, 700);

    return () => clearInterval(lineInterval);
  }, []);

  useEffect(() => {
    // Reverse year roller from currentYear down to targetYear over ~2.4 seconds
    const totalSteps = 40;
    const stepTime = 60; // 40 * 60 = 2400ms
    let step = 0;

    const rollerInterval = setInterval(() => {
      step++;
      const pct = Math.min(100, Math.floor((step / totalSteps) * 100));
      setProgress(pct);

      // Interpolate year backwards
      const currentInterpolated = Math.round(
        currentYear - (step / totalSteps) * (currentYear - targetYear)
      );
      setDisplayYear(currentInterpolated);

      if (step >= totalSteps) {
        clearInterval(rollerInterval);
        setDisplayYear(targetYear);
        if (onComplete) {
          setTimeout(onComplete, 300);
        }
      }
    }, stepTime);

    return () => clearInterval(rollerInterval);
  }, [currentYear, targetYear, onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden">
      {/* Background scanline sweep */}
      <div className="absolute inset-0 scanlines opacity-60 pointer-events-none" />
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Animated clock/compass icon */}
        <div className="relative mx-auto w-20 h-20 rounded-full border-2 border-accent/40 bg-surface flex items-center justify-center shadow-glow">
          <Clock className="w-10 h-10 text-primary animate-spin" style={{ animationDuration: '3s', animationDirection: 'reverse' }} />
          <Sparkles className="w-4 h-4 text-accent absolute top-1 right-1 animate-ping" />
        </div>

        {/* Roller Year Counter */}
        <div className="space-y-2">
          <div className="text-xs font-mono tracking-widest text-text-dim uppercase">
            TEMPORAL DISPLACEMENT
          </div>
          <div className="font-headline text-6xl sm:text-7xl tracking-widest text-primary font-bold drop-shadow-md">
            {displayYear}
          </div>
          <div className="font-mono text-xs text-accent tracking-widest">
            COORDINATE: {targetDate}
          </div>
        </div>

        {/* Microcopy Rotator */}
        <motion.div
          key={lineIndex}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="text-sm font-body text-text font-medium min-h-[24px]"
        >
          {FUNNY_LOADING_LINES[lineIndex]}
        </motion.div>

        {/* Retro Progress Bar */}
        <div className="space-y-2">
          <div className="w-full bg-[#141414] border border-[#001000] p-1 rounded-xl h-6 flex items-center">
            <div
              className="h-full bg-accent rounded-lg transition-all duration-75 relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse" />
            </div>
          </div>
          <div className="flex justify-between items-center text-[10px] font-mono text-text-dim px-1">
            <span>REWIND PROTOCOL</span>
            <span>{progress}% COMPLETE</span>
          </div>
        </div>

        {/* Ambient status */}
        <div className="text-[11px] font-mono text-text-dim">
          PREPARING TIME CAPSULE FOR <span className="text-primary font-headline uppercase">{targetName}</span>
        </div>
      </div>
    </div>
  );
};
