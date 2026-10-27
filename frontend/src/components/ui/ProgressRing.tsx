import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface ProgressRingProps {
  currentDays: number;
  targetDays?: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  currentDays,
  targetDays = 10000,
  size = 110,
  strokeWidth = 7,
  className = ''
}) => {
  const shouldReduceMotion = useReducedMotion();
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  
  // Cap at 100% or show milestone progress
  const percentage = Math.min(100, Math.max(0, (currentDays / targetDays) * 100));
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#002200"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Animated fill ring */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#C6FF3D"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeLinecap="round"
          fill="transparent"
          initial={shouldReduceMotion ? { strokeDashoffset } : { strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: shouldReduceMotion ? 0.01 : 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="filter drop-shadow-[0_0_8px_rgba(198,255,61,0.5)]"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="font-headline text-xs sm:text-sm text-primary font-bold">
          {Math.round(percentage)}%
        </span>
        <span className="text-[9px] font-mono text-text-dim uppercase tracking-wider">
          TO {targetDays >= 1000 ? `${targetDays / 1000}K` : targetDays}
        </span>
      </div>
    </div>
  );
};
