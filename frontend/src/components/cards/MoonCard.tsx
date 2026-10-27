import React from 'react';
import { Tile } from '../ui/Tile';
import { StatLabel } from '../ui/StatLabel';
import { MoonDial } from '../ui/MoonDial';
import { Moon } from 'lucide-react';
import { MoonPhaseInfo } from '../../types';

interface MoonCardProps {
  moonPhase?: MoonPhaseInfo | null;
  daysAlive?: number;
  isLoading?: boolean;
}

export const MoonCard: React.FC<MoonCardProps> = ({
  moonPhase,
  daysAlive = 0,
  isLoading
}) => {
  if (isLoading) {
    return (
      <Tile>
        <div className="animate-pulse space-y-4">
          <div className="h-4 w-28 bg-surface-hover rounded" />
          <div className="h-16 w-16 bg-surface-hover rounded-full mx-auto" />
          <div className="h-4 w-32 bg-surface-hover rounded mx-auto" />
        </div>
      </Tile>
    );
  }

  if (!moonPhase) {
    return (
      <Tile>
        <StatLabel icon={<Moon className="w-4 h-4" strokeWidth={1.5} />} caption="MOON PHASE" />
        <div className="text-text-dim text-xs py-6 font-mono">No lunar data available.</div>
      </Tile>
    );
  }

  // Synodic lunar cycle is ~29.530588 days
  const cycles = Math.floor(daysAlive / 29.530588);

  return (
    <Tile delay={0.4}>
      <div className="space-y-4 flex flex-col justify-between h-full">
        <StatLabel
          icon={<Moon className="w-4 h-4 text-accent" strokeWidth={1.5} />}
          caption="MOON PHASE"
        />

        <div className="flex items-center justify-around gap-4 py-1">
          {/* MoonDial: crescent moon inside slowly rotating dotted ring */}
          <MoonDial
            illuminationPct={moonPhase.illumination_pct}
            phaseName={moonPhase.phase_name}
          />

          <div className="space-y-1">
            <div className="font-headline text-base sm:text-lg text-primary uppercase font-bold">
              {moonPhase.phase_name}
            </div>
            <div className="text-xs font-mono text-accent">
              {moonPhase.illumination_pct}% illuminated
            </div>
            <div className="text-xs font-mono text-text-dim pt-1">
              About {cycles.toLocaleString()} moon cycles since
            </div>
          </div>
        </div>
      </div>
    </Tile>
  );
};
