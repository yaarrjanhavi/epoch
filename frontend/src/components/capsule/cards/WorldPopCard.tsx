import React from 'react';
import { BentoCard } from '../BentoCard';
import { Globe2, Users, ArrowUp } from 'lucide-react';

interface WorldPopCardProps {
  populationThen: number;
  populationNow: number;
  birthYear: number;
}

export const WorldPopCard: React.FC<WorldPopCardProps> = ({
  populationThen,
  populationNow,
  birthYear
}) => {
  const popThenBillion = (populationThen / 1_000_000_000).toFixed(2);
  const popNowBillion = (populationNow / 1_000_000_000).toFixed(2);
  const netAdditionBillion = ((populationNow - populationThen) / 1_000_000_000).toFixed(2);

  return (
    <BentoCard
      title="World Population Shift"
      icon={<Globe2 className="w-4 h-4 text-text hover:text-primary transition-colors" strokeWidth={1.5} />}
      badge="DEMOGRAPHICS"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3 text-center">
          {/* Then */}
          <div className="bg-[#0a0a0a] rounded-xl p-3.5 border border-[#001000]">
            <span className="text-[10px] font-mono text-text-dim uppercase tracking-wider block mb-1">
              In {birthYear}
            </span>
            <div className="font-headline text-2xl text-accent font-bold">
              {popThenBillion} B
            </div>
            <span className="text-[10px] text-text-muted font-mono">Humans on Earth</span>
          </div>

          {/* Now */}
          <div className="bg-[#0a0a0a] rounded-xl p-3.5 border border-[#001000]">
            <span className="text-[10px] font-mono text-text-dim uppercase tracking-wider block mb-1">
              Today (2026)
            </span>
            <div className="font-headline text-2xl text-primary font-bold">
              {popNowBillion} B
            </div>
            <span className="text-[10px] text-text-muted font-mono">Humans on Earth</span>
          </div>
        </div>

        {/* Growth Callout */}
        <div className="bg-surface rounded-xl p-3 border border-border flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <ArrowUp className="w-4 h-4 text-primary shrink-0" strokeWidth={1.5} />
            <span className="text-text-muted">Added during your lifetime:</span>
          </div>
          <span className="font-headline text-text font-bold text-sm">
            +{netAdditionBillion} Billion
          </span>
        </div>
      </div>
    </BentoCard>
  );
};
