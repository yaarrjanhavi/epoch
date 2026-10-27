import React from 'react';
import { BentoCard } from '../BentoCard';
import { Hourglass, Calendar, Sparkles } from 'lucide-react';

interface NextBirthdayCardProps {
  nextBirthdayDate: string;
  daysRemaining: number;
  weekday: string;
  yearProgressPct: number;
}

export const NextBirthdayCard: React.FC<NextBirthdayCardProps> = ({
  nextBirthdayDate,
  daysRemaining,
  weekday,
  yearProgressPct
}) => {
  // SVG circular progress calculation
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (yearProgressPct / 100) * circumference;

  return (
    <BentoCard
      title="Next Solar Return"
      icon={<Hourglass className="w-4 h-4" strokeWidth={1.5} />}
      badge="COUNTDOWN"
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Days Left & Date */}
        <div className="space-y-2 text-center sm:text-left">
          <div className="font-headline text-4xl sm:text-5xl text-primary font-bold tracking-wider tabular-nums">
            {daysRemaining}
            <span className="text-xs font-mono text-text-dim ml-2 uppercase">days</span>
          </div>
          <div className="text-xs text-text-muted flex items-center justify-center sm:justify-start gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-accent" />
            <span>{nextBirthdayDate}</span>
          </div>
          <div className="text-[11px] font-mono text-accent">
            Falls on a <span className="font-headline uppercase">{weekday}</span>
          </div>
        </div>

        {/* Circular Progress Ring */}
        <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90">
            {/* Background ring */}
            <circle
              cx="48"
              cy="48"
              r={radius}
              stroke="rgba(156, 255, 140, 0.15)"
              strokeWidth="6"
              fill="transparent"
            />
            {/* Progress ring */}
            <circle
              cx="48"
              cy="48"
              r={radius}
              stroke="#C6FF3D"
              strokeWidth="6"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="font-headline text-xs text-text font-bold">
              {Math.round(yearProgressPct)}%
            </span>
            <span className="text-[9px] font-mono text-text-dim uppercase">of age year</span>
          </div>
        </div>
      </div>
    </BentoCard>
  );
};
