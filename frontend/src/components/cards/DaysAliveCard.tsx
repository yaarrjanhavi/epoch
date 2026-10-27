import React from 'react';
import { Tile } from '../ui/Tile';
import { StatLabel } from '../ui/StatLabel';
import { CountUp } from '../ui/CountUp';
import { ProgressRing } from '../ui/ProgressRing';
import { Clock } from 'lucide-react';
import { LifeStats } from '../../types';

interface DaysAliveCardProps {
  stats?: LifeStats | null;
  isLoading?: boolean;
}

export const DaysAliveCard: React.FC<DaysAliveCardProps> = ({ stats, isLoading }) => {
  if (isLoading) {
    return (
      <Tile className="col-span-1 md:col-span-2">
        <div className="animate-pulse space-y-4">
          <div className="h-4 w-32 bg-surface-hover rounded" />
          <div className="h-16 w-56 bg-surface-hover rounded" />
          <div className="h-4 w-40 bg-surface-hover rounded" />
        </div>
      </Tile>
    );
  }

  if (!stats) {
    return (
      <Tile className="col-span-1 md:col-span-2">
        <StatLabel icon={<Clock className="w-4 h-4" strokeWidth={1.5} />} caption="DAYS ALIVE" />
        <div className="text-text-dim text-xs py-6 font-mono">No data for this date.</div>
      </Tile>
    );
  }

  // Calculate nearest target milestone: 10,000 if <10k, else 15,000, 20,000, etc.
  const milestoneTarget = stats.days_alive < 10000 ? 10000 : Math.ceil((stats.days_alive + 1) / 5000) * 5000;

  return (
    <Tile className="col-span-1 md:col-span-2" delay={0.1}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        {/* Left: 64px Silkscreen Primary number + hours alive */}
        <div className="space-y-2">
          <StatLabel
            icon={<Clock className="w-4 h-4 text-accent" strokeWidth={1.5} />}
            caption="DAYS ALIVE"
          />

          <div className="font-headline text-5xl sm:text-[64px] leading-none text-primary font-bold tracking-wider">
            <CountUp end={stats.days_alive} durationMs={1400} />
          </div>

          <div className="text-xs sm:text-sm font-mono text-text-muted">
            <span className="text-accent font-bold">
              {stats.hours_alive.toLocaleString()}
            </span>{' '}
            hours alive since birth
          </div>
        </div>

        {/* Right: Circular progress ring to day 10,000 */}
        <div className="flex items-center gap-3">
          <ProgressRing
            currentDays={stats.days_alive}
            targetDays={milestoneTarget}
            size={110}
            strokeWidth={7}
          />
        </div>
      </div>
    </Tile>
  );
};
