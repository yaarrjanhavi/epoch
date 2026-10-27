import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const Equalizer: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const bars = [
    { height: [30, 85, 45, 95, 30], duration: 0.9 },
    { height: [60, 25, 90, 40, 60], duration: 1.1 },
    { height: [90, 40, 100, 20, 90], duration: 0.8 },
    { height: [40, 95, 30, 80, 40], duration: 1.2 },
    { height: [75, 30, 60, 90, 75], duration: 1.0 },
    { height: [35, 70, 40, 85, 35], duration: 0.95 }
  ];

  if (shouldReduceMotion) {
    return (
      <div className="flex items-end gap-1.5 h-10 w-16">
        {bars.map((_, i) => (
          <div
            key={i}
            className="w-1.5 rounded-full bg-accent"
            style={{ height: `${40 + (i % 3) * 20}%` }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-end gap-1.5 h-10 w-16">
      {bars.map((bar, i) => (
        <motion.div
          key={i}
          animate={{ height: bar.height.map((h) => `${h}%`) }}
          transition={{
            duration: bar.duration,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut'
          }}
          className="w-1.5 rounded-full bg-gradient-to-t from-accent to-primary shadow-[0_0_6px_rgba(51,255,102,0.4)]"
          style={{ height: '40%' }}
        />
      ))}
    </div>
  );
};
