import React, { useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';

interface TypewriterProps {
  text: string;
  speedMs?: number;
  onComplete?: () => void;
  className?: string;
}

export const Typewriter: React.FC<TypewriterProps> = ({
  text,
  speedMs = 15,
  onComplete,
  className = ''
}) => {
  const [displayed, setDisplayed] = useState('');
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayed(text);
      if (onComplete) onComplete();
      return;
    }

    setDisplayed('');
    let idx = 0;
    const timer = setInterval(() => {
      idx++;
      setDisplayed(text.slice(0, idx));
      if (idx >= text.length) {
        clearInterval(timer);
        if (onComplete) onComplete();
      }
    }, speedMs);

    return () => clearInterval(timer);
  }, [text, speedMs, shouldReduceMotion]);

  return (
    <div className={`font-body leading-relaxed ${className}`}>
      {displayed}
      {displayed.length < text.length && (
        <span className="inline-block w-2 h-4 bg-accent ml-1 animate-pulse align-middle" />
      )}
    </div>
  );
};
