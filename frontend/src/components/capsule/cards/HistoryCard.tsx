import React, { useState } from 'react';
import { BentoCard } from '../BentoCard';
import { History, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { HistoryEvent } from '../../../types';

interface HistoryCardProps {
  events: HistoryEvent[];
}

export const HistoryCard: React.FC<HistoryCardProps> = ({ events }) => {
  const [showAll, setShowAll] = useState(false);
  const displayEvents = showAll ? events : events.slice(0, 5);

  return (
    <BentoCard
      title="On This Exact Day In History"
      icon={<History className="w-4 h-4 text-text hover:text-primary transition-colors" strokeWidth={1.5} />}
      badge="WIKIMEDIA"
      className="col-span-1 md:col-span-2"
    >
      <div className="space-y-3">
        {displayEvents.map((evt, idx) => (
          <div
            key={idx}
            className="p-3 rounded-xl bg-surface border border-border flex items-start gap-3 text-xs leading-relaxed hover:border-accent/30 transition-colors"
          >
            {/* Year Chip */}
            <span className="shrink-0 px-2 py-0.5 rounded bg-[#0a0a0a] border border-[#001000] font-headline text-primary text-[11px] font-bold">
              {evt.year}
            </span>

            <div className="flex-1 text-text-muted">
              {evt.text}
              {evt.link && (
                <a
                  href={evt.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 ml-2 text-accent hover:underline text-[11px] font-mono"
                >
                  <span>read</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        ))}

        {events.length > 5 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="w-full py-2.5 rounded-xl bg-surface hover:bg-surface-hover border border-border text-xs font-mono text-text flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>{showAll ? 'Show less highlights' : `Show all ${events.length} historical moments`}</span>
            {showAll ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        )}
      </div>
    </BentoCard>
  );
};
