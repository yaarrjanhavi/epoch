import React from 'react';
import { BentoCard } from '../BentoCard';
import { Flame, Info } from 'lucide-react';
import { BirthdayPopularity } from '../../../types';

interface BirthdayHeatmapCardProps {
  birthdayPop: BirthdayPopularity;
  birthMonth: number;
  birthDay: number;
}

const MONTH_LABELS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
const DAYS_IN_MONTHS = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export const BirthdayHeatmapCard: React.FC<BirthdayHeatmapCardProps> = ({
  birthdayPop,
  birthMonth,
  birthDay
}) => {
  return (
    <BentoCard
      title="Birthday Popularity Heatmap"
      icon={<Flame className="w-4 h-4 text-text hover:text-primary transition-colors" strokeWidth={1.5} />}
      badge={`RANK #${birthdayPop.rank} OF 366`}
      className="col-span-1 md:col-span-2"
    >
      <div className="space-y-4">
        {/* Summary callout */}
        <div className="bg-[#0a0a0a] rounded-xl p-3.5 border border-[#001000] flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="space-y-0.5">
            <span className="font-headline text-primary text-base uppercase">
              {birthdayPop.summary}
            </span>
            <p className="text-xs text-text-muted">
              Calculated from multi-decade demographic birth registry distributions (NCHS).
            </p>
          </div>
          <div className="shrink-0 font-headline text-accent text-sm bg-accent/10 border border-accent/30 px-3 py-1.5 rounded-xl">
            {birthdayPop.rarity_percentile}% RARITY
          </div>
        </div>

        {/* 12-Month Matrix Visual Heatmap */}
        <div className="bg-surface rounded-xl p-3.5 border border-border overflow-x-auto">
          <div className="text-[10px] font-mono text-text-dim uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>ANNUAL BIRTH MATRIX (366 DAYS)</span>
            <span className="flex items-center gap-1.5 text-accent">
              <span className="w-2.5 h-2.5 rounded-sm bg-primary border border-white animate-pulse" />
              <span>YOUR DATE</span>
            </span>
          </div>

          <div className="grid grid-cols-12 gap-1.5 min-w-[320px]">
            {DAYS_IN_MONTHS.map((daysCount, mIdx) => {
              const currentMonth = mIdx + 1;
              return (
                <div key={mIdx} className="flex flex-col items-center gap-1">
                  <span className="text-[10px] font-mono text-text-dim font-bold">
                    {MONTH_LABELS[mIdx]}
                  </span>
                  <div className="flex flex-col gap-1 w-full">
                    {Array.from({ length: 31 }).map((_, dIdx) => {
                      const dayNum = dIdx + 1;
                      if (dayNum > daysCount) {
                        return <div key={dIdx} className="w-full h-1.5 opacity-0" />;
                      }

                      const isUserDay = currentMonth === birthMonth && dayNum === birthDay;

                      // Simulated heat level based on month
                      // Aug/Sep high, holidays low
                      let bg = 'bg-[#1a1a1a]';
                      if (currentMonth === 9) bg = 'bg-accent/40';
                      else if (currentMonth === 8) bg = 'bg-accent/30';
                      else if (currentMonth === 12 && dayNum >= 24) bg = 'bg-[#0f0f0f]';
                      else if (currentMonth === 2 && dayNum === 29) bg = 'bg-[#050505]';
                      else if (dIdx % 3 === 0) bg = 'bg-accent/20';

                      if (isUserDay) {
                        bg = 'bg-primary ring-2 ring-white scale-125 z-10 shadow-glow-primary';
                      }

                      return (
                        <div
                          key={dIdx}
                          title={`${MONTH_LABELS[mIdx]} ${dayNum}${isUserDay ? ' (Your Birthday!)' : ''}`}
                          className={`w-full h-1.5 rounded-[1px] transition-all hover:scale-150 ${bg}`}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[9px] font-mono text-text-dim mt-3 pt-2 border-t border-border/50">
            <span>Rarest Dates (Dec 25, Jan 1, Feb 29)</span>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-[1px] bg-[#0f0f0f]" />
              <span className="w-2 h-2 rounded-[1px] bg-accent/20" />
              <span className="w-2 h-2 rounded-[1px] bg-accent/40" />
              <span className="w-2 h-2 rounded-[1px] bg-primary" />
            </div>
            <span>Peak Season (September)</span>
          </div>
        </div>
      </div>
    </BentoCard>
  );
};
