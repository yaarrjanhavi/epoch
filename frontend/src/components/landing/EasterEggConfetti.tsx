import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Cake } from 'lucide-react';

interface EasterEggConfettiProps {
  name: string;
  birthDate: string;
}

export const EasterEggConfetti: React.FC<EasterEggConfettiProps> = ({ name, birthDate }) => {
  const isBirthdayToday = () => {
    if (!birthDate) return false;
    const today = new Date();
    const parts = birthDate.split('-');
    if (parts.length < 3) return false;
    const bMonth = parseInt(parts[1], 10);
    const bDay = parseInt(parts[2], 10);
    return today.getMonth() + 1 === bMonth && today.getDate() === bDay;
  };

  const isToday = isBirthdayToday();

  useEffect(() => {
    if (isToday) {
      // Fire confetti burst
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#C6FF3D', '#33FF66', '#9CFF8C', '#FFFFFF', '#FFDF00']
        });
      } catch (e) {
        console.error('Confetti trigger error:', e);
      }
    }
  }, [isToday]);

  if (!isToday) return null;

  return (
    <div className="w-full bg-[#141414] border-2 border-accent rounded-card p-4 my-6 shadow-glow flex items-center justify-between gap-4 animate-bounce">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
          <Cake className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <div className="font-headline text-primary text-base uppercase tracking-wider">
            🎂 HAPPY BIRTHDAY, {name || 'TIME TRAVELER'}!
          </div>
          <div className="text-xs text-text-muted">
            The solar system marks another full circle for you today!
          </div>
        </div>
      </div>
      <Sparkles className="w-5 h-5 text-accent animate-spin" />
    </div>
  );
};
