import React, { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

interface CountUpProps {
  end: number;
  durationMs?: number;
  className?: string;
  suffix?: string;
}

export const CountUp: React.FC<CountUpProps> = ({
  end,
  durationMs = 1400,
  className = '',
  suffix = ''
}) => {
  const [count, setCount] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setCount(end);
      return;
    }

    const startTimestamp = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTimestamp;
      const progress = Math.min(1, elapsed / durationMs);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeProgress * end);
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    const animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [end, durationMs, shouldReduceMotion]);

  return (
    <span className={`tabular-nums ${className}`}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};
