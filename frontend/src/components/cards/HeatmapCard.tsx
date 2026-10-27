import React from 'react';
import { Tile } from '../ui/Tile';
import { StatLabel } from '../ui/StatLabel';
import { Heatmap } from '../ui/Heatmap';
import { Calendar } from 'lucide-react';
import { BirthdayPopularity } from '../../types';

interface HeatmapCardProps {
  birthdayPop?: BirthdayPopularity | null;
  birthDate?: string;
  isLoading?: boolean;
}

export const HeatmapCard: React.FC<HeatmapCardProps> = ({
  birthdayPop,
  birthDate = '1998-05-14',
  isLoading
}) => {
  if (isLoading) {
    return (
      <Tile className="col-span-1 md:col-span-2">
        <div className="animate-pulse space-y-4">
          <div className="h-4 w-36 bg-surface-hover rounded" />
          <div className="h-32 bg-surface-hover rounded-xl" />
          <div className="h-4 w-48 bg-surface-hover rounded" />
        </div>
      </Tile>
    );
  }

  if (!birthdayPop) {
    return (
      <Tile className="col-span-1 md:col-span-2">
        <StatLabel icon={<Calendar className="w-4 h-4" strokeWidth={1.5} />} caption="BIRTHDAY RARITY" />
        <div className="text-text-dim text-xs py-6 font-mono">No demographic data available.</div>
      </Tile>
    );
  }

  const parts = birthDate.split('-');
  const month = parseInt(parts[1], 10) || 5;
  const day = parseInt(parts[2], 10) || 14;

  return (
    <Tile className="col-span-1 md:col-span-2" delay={0.7}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <StatLabel
            icon={<Calendar className="w-4 h-4 text-accent" strokeWidth={1.5} />}
            caption="BIRTHDAY POPULARITY HEATMAP"
          />
          <span className="text-[11px] font-mono text-primary font-bold">
            RANK #{birthdayPop.rank} OF 366
          </span>
        </div>

        {/* 12 rows x 31 cols heatmap */}
        <Heatmap
          birthMonth={month}
          birthDay={day}
          rarityPercentile={birthdayPop.rarity_percentile}
        />
      </div>
    </Tile>
  );
};
