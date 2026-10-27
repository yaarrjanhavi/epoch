import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface BarPairProps {
  label: string;
  thenValue: string;
  thenPct: number; // 0..100
  nowValue: string;
  nowPct: number;  // 0..100
  subtext?: string;
}

export const BarPair: React.FC<BarPairProps> = ({
  label,
  thenValue,
  thenPct,
  nowValue,
  nowPct,
  subtext
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-xs">
        <span className="font-headline text-text uppercase text-xs">{label}</span>
        {subtext && <span className="text-[10px] font-mono text-text-dim">{subtext}</span>}
      </div>

      {/* Then Bar (Accent #33FF66) */}
      <div className="space-y-1">
        <div className="flex justify-between text-[11px] font-mono">
          <span className="text-text-dim">THEN</span>
          <span className="text-accent font-bold">{thenValue}</span>
        </div>
        <div className="w-full bg-[#0a0a0a] rounded-full h-3 border border-[#001000] p-0.5 overflow-hidden">
          <motion.div
            initial={shouldReduceMotion ? { width: `${thenPct}%` } : { width: '0%' }}
            whileInView={{ width: `${Math.max(4, thenPct)}%` }}
            viewport={{ once: true }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 1.1, ease: 'easeOut' }}
            className="h-full bg-accent rounded-full shadow-[0_0_8px_rgba(51,255,102,0.4)]"
          />
        </div>
      </div>

      {/* Now Bar (Primary #C6FF3D) */}
      <div className="space-y-1">
        <div className="flex justify-between text-[11px] font-mono">
          <span className="text-text-dim">NOW</span>
          <span className="text-primary font-bold">{nowValue}</span>
        </div>
        <div className="w-full bg-[#0a0a0a] rounded-full h-3 border border-[#001000] p-0.5 overflow-hidden">
          <motion.div
            initial={shouldReduceMotion ? { width: `${nowPct}%` } : { width: '0%' }}
            whileInView={{ width: `${Math.max(4, nowPct)}%` }}
            viewport={{ once: true }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 1.3, ease: 'easeOut' }}
            className="h-full bg-primary rounded-full shadow-[0_0_8px_rgba(198,255,61,0.4)]"
          />
        </div>
      </div>
    </div>
  );
};
