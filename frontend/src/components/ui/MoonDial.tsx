import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface MoonDialProps {
  illuminationPct: number;
  phaseName: string;
}

export const MoonDial: React.FC<MoonDialProps> = ({
  illuminationPct,
  phaseName
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
      {/* Slowly rotating dotted ring */}
      <motion.svg
        viewBox="0 0 100 100"
        className="w-full h-full absolute inset-0"
        animate={shouldReduceMotion ? {} : { rotate: 360 }}
        transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#33FF66"
          strokeWidth="1.5"
          strokeDasharray="3 7"
          opacity="0.45"
        />
      </motion.svg>

      {/* Moon Orb */}
      <div className="relative w-16 h-16 rounded-full bg-[#0a0a0a] border border-[#002200] p-1 flex items-center justify-center shadow-[0_0_15px_rgba(51,255,102,0.2)]">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Base dark moon */}
          <circle cx="50" cy="50" r="44" fill="#0c0c0c" stroke="#001800" strokeWidth="1" />
          
          {/* Moon craters */}
          <circle cx="36" cy="42" r="5" fill="#050505" />
          <circle cx="62" cy="58" r="7" fill="#050505" />
          <circle cx="48" cy="68" r="4" fill="#050505" />

          {/* Illumination crescent / phase */}
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="#C6FF3D"
            opacity={Math.max(0.18, illuminationPct / 100)}
            className="filter drop-shadow-[0_0_6px_rgba(198,255,61,0.5)]"
          />
        </svg>
      </div>
    </div>
  );
};
