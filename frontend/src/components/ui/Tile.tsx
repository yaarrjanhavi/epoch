import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface TileProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  onClick?: () => void;
}

export const Tile: React.FC<TileProps> = ({
  children,
  className = '',
  delay = 0,
  onClick
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{
        duration: shouldReduceMotion ? 0.01 : 0.45,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      whileHover={
        shouldReduceMotion
          ? {}
          : {
              y: -4,
              rotate: 0.25,
              transition: { duration: 0.2, ease: 'easeOut' }
            }
      }
      onClick={onClick}
      className={`rounded-[20px] bg-[#141414] border border-[#001000] p-7 sm:p-8 transition-colors duration-250 hover:border-[rgba(51,255,102,0.4)] hover:shadow-[0_0_24px_rgba(51,255,102,0.2)] flex flex-col justify-between relative overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  );
};
