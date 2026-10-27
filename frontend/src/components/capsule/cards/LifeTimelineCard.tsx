import React, { useState } from 'react';
import { BentoCard } from '../BentoCard';
import { GitCommit, Sparkles, Milestone } from 'lucide-react';
import { LifeTimelineEvent } from '../../../types';

interface LifeTimelineCardProps {
  timeline: LifeTimelineEvent[];
}

export const LifeTimelineCard: React.FC<LifeTimelineCardProps> = ({ timeline }) => {
  const [selectedEvent, setSelectedEvent] = useState<LifeTimelineEvent>(timeline[0] || null);

  return (
    <BentoCard
      title="Interactive Life & World Timeline"
      icon={<GitCommit className="w-4 h-4 text-text hover:text-primary transition-colors" strokeWidth={1.5} />}
      badge="CHRONOLOGY"
      className="col-span-1 md:col-span-2 lg:col-span-3"
    >
      <div className="space-y-4">
        {/* Horizontal scrollable timeline track */}
        <div className="overflow-x-auto py-2">
          <div className="flex items-center gap-6 min-w-max px-2 relative">
            {/* Connecting baseline line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#002200] -translate-y-1/2 pointer-events-none" />

            {timeline.map((evt, idx) => {
              const isSelected = selectedEvent?.year === evt.year;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedEvent(evt)}
                  className="flex flex-col items-center group cursor-pointer relative z-10 transition-transform hover:-translate-y-1"
                >
                  <span className="text-[10px] font-mono text-text-dim mb-1 group-hover:text-primary">
                    Age {evt.age}
                  </span>

                  {/* Node Circle */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all ${
                      isSelected
                        ? 'bg-primary border-white shadow-glow-primary scale-110'
                        : 'bg-surface border-border group-hover:border-accent'
                    }`}
                  >
                    <span
                      className={`text-[9px] font-headline ${
                        isSelected ? 'text-black' : 'text-text'
                      }`}
                    >
                      {String(evt.year).slice(-2)}
                    </span>
                  </div>

                  <span className="text-[11px] font-headline text-text-muted mt-1.5 group-hover:text-primary">
                    {evt.year}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Event Details Panel */}
        {selectedEvent && (
          <div className="bg-[#0a0a0a] rounded-xl p-4 border border-[#001000] flex flex-col sm:flex-row items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-surface border border-border font-headline text-primary text-xs">
                  {selectedEvent.year} • Age {selectedEvent.age}
                </span>
                <span className="font-headline text-text uppercase text-xs">
                  {selectedEvent.user_milestone}
                </span>
              </div>
              <div className="text-xs text-text-muted pt-1 leading-relaxed">
                <span className="text-accent font-headline uppercase mr-1.5 text-[10px]">
                  What Was Happening On Earth:
                </span>
                {selectedEvent.world_event}
              </div>
            </div>
            <Sparkles className="w-5 h-5 text-accent shrink-0 mt-1 animate-pulse" />
          </div>
        )}
      </div>
    </BentoCard>
  );
};
