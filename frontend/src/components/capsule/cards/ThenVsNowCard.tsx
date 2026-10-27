import React from 'react';
import { BentoCard } from '../BentoCard';
import { RefreshCw, Wifi, HeartPulse, Coins, Users } from 'lucide-react';
import { WorldThenVsNow } from '../../../types';

interface ThenVsNowCardProps {
  thenVsNow: WorldThenVsNow;
}

export const ThenVsNowCard: React.FC<ThenVsNowCardProps> = ({ thenVsNow }) => {
  return (
    <BentoCard
      title="Planetary Transformation: Then vs Now"
      icon={<RefreshCw className="w-4 h-4 text-text hover:text-primary transition-colors" strokeWidth={1.5} />}
      badge={`${thenVsNow.birth_year} → ${thenVsNow.current_year}`}
      className="col-span-1 md:col-span-2"
    >
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {/* Metric 1: Population */}
        <div className="bg-surface rounded-xl p-3 border border-border flex flex-col justify-between space-y-2">
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-text-dim uppercase">
            <Users className="w-3.5 h-3.5 text-accent" strokeWidth={1.5} />
            <span>Population</span>
          </div>
          <div className="space-y-0.5">
            <div className="text-[11px] font-mono text-text-muted">
              Then: <span className="font-headline text-text">{thenVsNow.population_then}</span>
            </div>
            <div className="text-[11px] font-mono text-primary">
              Now: <span className="font-headline font-bold">{thenVsNow.population_now}</span>
            </div>
          </div>
        </div>

        {/* Metric 2: Internet Penetration */}
        <div className="bg-surface rounded-xl p-3 border border-border flex flex-col justify-between space-y-2">
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-text-dim uppercase">
            <Wifi className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
            <span>Online</span>
          </div>
          <div className="space-y-0.5">
            <div className="text-[11px] font-mono text-text-muted">
              Then: <span className="font-headline text-text">{thenVsNow.internet_users_pct_then}%</span>
            </div>
            <div className="text-[11px] font-mono text-primary">
              Now: <span className="font-headline font-bold">{thenVsNow.internet_users_pct_now}%</span>
            </div>
          </div>
        </div>

        {/* Metric 3: Global Life Expectancy */}
        <div className="bg-surface rounded-xl p-3 border border-border flex flex-col justify-between space-y-2">
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-text-dim uppercase">
            <HeartPulse className="w-3.5 h-3.5 text-accent" strokeWidth={1.5} />
            <span>Life Expectancy</span>
          </div>
          <div className="space-y-0.5">
            <div className="text-[11px] font-mono text-text-muted">
              Then: <span className="font-headline text-text">{thenVsNow.life_expectancy_then} yrs</span>
            </div>
            <div className="text-[11px] font-mono text-primary">
              Now: <span className="font-headline font-bold">{thenVsNow.life_expectancy_now} yrs</span>
            </div>
          </div>
        </div>

        {/* Metric 4: Global GDP per Capita */}
        <div className="bg-surface rounded-xl p-3 border border-border flex flex-col justify-between space-y-2">
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-text-dim uppercase">
            <Coins className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
            <span>GDP / Capita</span>
          </div>
          <div className="space-y-0.5">
            <div className="text-[11px] font-mono text-text-muted">
              Then: <span className="font-headline text-text">{thenVsNow.gdp_per_capita_then}</span>
            </div>
            <div className="text-[11px] font-mono text-primary">
              Now: <span className="font-headline font-bold">{thenVsNow.gdp_per_capita_now}</span>
            </div>
          </div>
        </div>
      </div>
    </BentoCard>
  );
};
