import { useState, useEffect } from 'react';

export function useLiveCounter(initialSeconds: number) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    setSeconds(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const days = Math.floor(seconds / 86400);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor(seconds / 60);

  // Live heartbeats (~80 bpm -> 1.333 beats / sec)
  const heartbeats = Math.floor(seconds * (80 / 60));
  // Live breaths (~16 bpm -> 0.2667 breaths / sec)
  const breaths = Math.floor(seconds * (16 / 60));

  return { seconds, days, hours, minutes, heartbeats, breaths };
}
