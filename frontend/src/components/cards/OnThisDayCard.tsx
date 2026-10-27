import React, { useState } from 'react';
import { Tile } from '../ui/Tile';
import { StatLabel } from '../ui/StatLabel';
import { YearChip } from '../ui/YearChip';
import { History, ChevronDown, ChevronUp } from 'lucide-react';
import { HistoryEvent } from '../../types';

interface OnThisDayCardProps {
  events?: HistoryEvent[] | null;
  isLoading?: boolean;
}

export const OnThisDayCard: React.FC<OnThisDayCardProps> = ({ events, isLoading }) => {
  const [showMore, setShowMore] = useState(false);

  if (isLoading) {
    return (
      <Tile className="col-span-1 md:col-span-2">
        <div className="animate-pulse space-y-4">
          <div className="h-4 w-32 bg-surface-hover rounded" />
          <div className="space-y-3">
            <div className="h-10 bg-surface-hover rounded-xl" />
            <div className="h-10 bg-surface-hover rounded-xl" />
            <div className="h-10 bg-surface-hover rounded-xl" />
          </div>
        </div>
      </Tile>
    );
  }

  if (!events || events.length === 0) {
    return (
      <Tile className="col-span-1 md:col-span-2">
        <StatLabel icon={<History className="w-4 h-4" strokeWidth={1.5} />} caption="ON THIS DAY" />
        <div className="text-text-dim text-xs py-6 font-mono">No historical records for this date.</div>
      </Tile>
    );
  }

  // Display 3 rows initially, or more when toggled
  const displayedEvents = showMore ? events : events.slice(0, 3);

  return (
    <Tile className="col-span-1 md:col-span-2" delay={0.5}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <StatLabel
            icon={<History className="w-4 h-4 text-accent" strokeWidth={1.5} />}
            caption="ON THIS DAY"
          />
          {events.length > 3 && (
            <button
              onClick={() => setShowMore(!showMore)}
              className="text-xs font-mono text-accent hover:text-primary transition-colors flex items-center gap-1 cursor-pointer select-none"
            >
              <span>{showMore ? 'Show less' : 'Show more'}</span>
              {showMore ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>

        {/* 3 rows with YearChip (Primary border) and event headline */}
        <div className="space-y-3">
          {displayedEvents.map((evt, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 text-xs leading-relaxed text-text-muted hover:text-text transition-colors p-2 rounded-xl hover:bg-[#0a0a0a]"
            >
              <YearChip year={evt.year} />
              <p className="flex-1 font-body text-xs sm:text-sm">
                {evt.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Tile>
  );
};
