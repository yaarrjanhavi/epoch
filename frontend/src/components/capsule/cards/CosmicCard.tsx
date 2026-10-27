import React from 'react';
import { BentoCard } from '../BentoCard';
import { Orbit, Rocket, Globe } from 'lucide-react';

interface CosmicCardProps {
  earthOrbits: number;
  spaceDistanceKm: number;
  moonTrips: number;
}

export const CosmicCard: React.FC<CosmicCardProps> = ({
  earthOrbits,
  spaceDistanceKm,
  moonTrips
}) => {
  const billionKm = (spaceDistanceKm / 1_000_000_000).toFixed(2);

  return (
    <BentoCard
      title="Cosmic Voyage"
      icon={<Orbit className="w-4 h-4 text-text hover:text-primary transition-colors" strokeWidth={1.5} />}
      badge="HELIOCENTRIC"
    >
      <div className="space-y-4">
        {/* Distance in Billion KM */}
        <div className="bg-[#0a0a0a] rounded-xl p-4 border border-[#001000] text-center">
          <span className="text-[10px] font-mono text-text-dim uppercase tracking-wider block mb-1">
            Distance Traveled Around the Sun (~30 km/s)
          </span>
          <div className="font-headline text-3xl sm:text-4xl text-primary font-bold tracking-wider">
            {billionKm}
            <span className="text-sm font-mono text-text-muted ml-1.5 uppercase">Billion km</span>
          </div>
        </div>

        {/* Orbits and Moon trips */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-surface rounded-xl p-3 border border-border flex items-center gap-2.5">
            <Globe className="w-4 h-4 text-accent shrink-0" strokeWidth={1.5} />
            <div>
              <div className="font-headline text-sm text-text tabular-nums font-bold">
                {earthOrbits}
              </div>
              <div className="text-[10px] font-mono text-text-dim uppercase">Solar Orbits</div>
            </div>
          </div>

          <div className="bg-surface rounded-xl p-3 border border-border flex items-center gap-2.5">
            <Rocket className="w-4 h-4 text-primary shrink-0" strokeWidth={1.5} />
            <div>
              <div className="font-headline text-sm text-text tabular-nums font-bold">
                {Math.round(moonTrips).toLocaleString()}
              </div>
              <div className="text-[10px] font-mono text-text-dim uppercase">Trips to Moon</div>
            </div>
          </div>
        </div>
      </div>
    </BentoCard>
  );
};
