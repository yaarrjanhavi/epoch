import React from 'react';
import { BentoCard } from '../BentoCard';
import { Users, TrendingUp } from 'lucide-react';

interface AgePercentileCardProps {
  olderThanPct: number;
  lifeProgressPct: number;
  lifeExpectancyYears: number;
  country: string;
}

export const AgePercentileCard: React.FC<AgePercentileCardProps> = ({
  olderThanPct,
  lifeProgressPct,
  lifeExpectancyYears,
  country
}) => {
  return (
    <BentoCard
      title="Global Age Rank"
      icon={<Users className="w-4 h-4 text-text hover:text-primary transition-colors" strokeWidth={1.5} />}
      badge="UN DEMOGRAPHICS"
    >
      <div className="space-y-4">
        {/* Older than X% */}
        <div className="bg-[#0a0a0a] rounded-xl p-4 border border-[#001000] text-center">
          <span className="text-[10px] font-mono text-text-dim uppercase tracking-wider block mb-1">
            Global Demographic Seniority
          </span>
          <div className="font-headline text-3xl sm:text-4xl text-primary font-bold tracking-wider">
            Older than {olderThanPct}%
          </div>
          <span className="text-xs text-text-muted mt-1 block">
            of the ~8.2 billion humans alive on Earth today
          </span>
        </div>

        {/* Life progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-text-muted font-mono text-[11px]">
              Life Expectancy ({country}: ~{lifeExpectancyYears} yrs)
            </span>
            <span className="font-headline text-accent font-bold text-xs">
              {lifeProgressPct}%
            </span>
          </div>

          <div className="w-full bg-[#0a0a0a] border border-[#001000] p-1 rounded-xl h-4 flex items-center">
            <div
              className="h-full bg-gradient-to-r from-accent to-primary rounded-lg transition-all duration-1000"
              style={{ width: `${Math.min(100, lifeProgressPct)}%` }}
            />
          </div>

          <p className="text-[10px] text-text-dim italic">
            A hopeful horizon: ample chapters, inventions, and seasons still waiting to be written.
          </p>
        </div>
      </div>
    </BentoCard>
  );
};
