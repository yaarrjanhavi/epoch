import React from 'react';
import { BentoCard } from '../BentoCard';
import { Clock, Heart, Wind, Calendar } from 'lucide-react';
import { useLiveCounter } from '../../../hooks/useLiveCounter';

interface LifeCountersCardProps {
  initialSeconds: number;
  weekday: string;
  weekdayRhyme: string;
}

export const LifeCountersCard: React.FC<LifeCountersCardProps> = ({
  initialSeconds,
  weekday,
  weekdayRhyme
}) => {
  const { seconds, days, hours, minutes, heartbeats, breaths } = useLiveCounter(initialSeconds);

  return (
    <BentoCard
      title="Temporal Orbit Counter"
      icon={<Clock className="w-4 h-4" strokeWidth={1.5} />}
      badge="LIVE TICKING"
      className="col-span-1 md:col-span-2 lg:col-span-2"
    >
      <div className="space-y-4">
        {/* Big Live Seconds Counter */}
        <div className="bg-[#0a0a0a] rounded-xl p-4 border border-[#001000] flex flex-col items-center justify-center text-center">
          <span className="text-[11px] font-mono text-text-dim uppercase tracking-widest mb-1">
            Total Seconds In Existence
          </span>
          <div className="font-headline text-3xl sm:text-4xl text-primary font-bold tracking-wider tabular-nums">
            {seconds.toLocaleString()}
            <span className="text-xs font-mono text-accent ml-2 uppercase animate-pulse">sec</span>
          </div>
        </div>

        {/* Breakdown: Days, Hours, Minutes */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-surface rounded-xl p-3 border border-border">
            <div className="font-headline text-lg sm:text-xl text-text font-bold tabular-nums">
              {days.toLocaleString()}
            </div>
            <div className="text-[10px] font-mono text-text-dim uppercase">Days Alive</div>
          </div>
          <div className="bg-surface rounded-xl p-3 border border-border">
            <div className="font-headline text-lg sm:text-xl text-text font-bold tabular-nums">
              {hours.toLocaleString()}
            </div>
            <div className="text-[10px] font-mono text-text-dim uppercase">Hours Alive</div>
          </div>
          <div className="bg-surface rounded-xl p-3 border border-border">
            <div className="font-headline text-lg sm:text-xl text-text font-bold tabular-nums">
              {minutes.toLocaleString()}
            </div>
            <div className="text-[10px] font-mono text-text-dim uppercase">Minutes Alive</div>
          </div>
        </div>

        {/* Biological estimates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-3 bg-surface/80 p-2.5 rounded-xl border border-border">
            <Heart className="w-4 h-4 text-accent animate-pulse shrink-0" strokeWidth={1.5} />
            <div>
              <div className="font-headline text-sm text-text tabular-nums">
                ~{heartbeats.toLocaleString()}
              </div>
              <div className="text-[10px] text-text-dim font-mono">Heartbeats (avg 80 bpm)</div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-surface/80 p-2.5 rounded-xl border border-border">
            <Wind className="w-4 h-4 text-primary shrink-0" strokeWidth={1.5} />
            <div>
              <div className="font-headline text-sm text-text tabular-nums">
                ~{breaths.toLocaleString()}
              </div>
              <div className="text-[10px] text-text-dim font-mono">Breaths (avg 16/min)</div>
            </div>
          </div>
        </div>

        {/* Weekday Rhyme */}
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-surface border border-border text-xs">
          <Calendar className="w-4 h-4 text-accent mt-0.5 shrink-0" strokeWidth={1.5} />
          <div>
            <span className="font-headline text-primary uppercase mr-1">Born on a {weekday}:</span>
            <span className="text-text-muted italic">"{weekdayRhyme}"</span>
          </div>
        </div>
      </div>
    </BentoCard>
  );
};
