import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const PixelStars: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  // 5 pixel squares with positions, colors, speeds, and delays
  const stars = [
    { id: 1, top: '15%', left: '8%', size: 8, color: '#C6FF3D', duration: 4.2, delay: 0 },
    { id: 2, top: '22%', right: '10%', size: 10, color: '#33FF66', duration: 5.5, delay: 0.8 },
    { id: 3, top: '65%', left: '12%', size: 7, color: '#9CFF8C', duration: 3.8, delay: 1.4 },
    { id: 4, top: '78%', right: '14%', size: 9, color: '#C6FF3D', duration: 4.9, delay: 0.4 },
    { id: 5, top: '48%', right: '6%', size: 6, color: '#33FF66', duration: 6.0, delay: 1.9 },
  ];

  if (shouldReduceMotion) {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {stars.map((s) => (
          <div
            key={s.id}
            className="absolute shadow-[0_0_8px_currentColor]"
            style={{
              top: s.top,
              left: s.left,
              right: s.right,
              width: `${s.size}px`,
              height: `${s.size}px`,
              backgroundColor: s.color,
              color: s.color,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {stars.map((s) => (
        <motion.div
          key={s.id}
          initial={{ y: 0, opacity: 0.6 }}
          animate={{
            y: [-14, 14, -14],
            opacity: [0.4, 0.9, 0.4],
            rotate: [0, 90, 180, 270, 360]
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute shadow-[0_0_10px_currentColor]"
          style={{
            top: s.top,
            left: s.left,
            right: s.right,
            width: `${s.size}px`,
            height: `${s.size}px`,
            backgroundColor: s.color,
            color: s.color,
          }}
        />
      ))}
    </div>
  );
};
