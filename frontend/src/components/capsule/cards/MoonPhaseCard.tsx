import React from 'react';
import { BentoCard } from '../BentoCard';
import { Moon, Eye } from 'lucide-react';
import { MoonPhaseInfo } from '../../../types';

interface MoonPhaseCardProps {
  moonPhase: MoonPhaseInfo;
  fullMoonsSeen: number;
}

export const MoonPhaseCard: React.FC<MoonPhaseCardProps> = ({
  moonPhase,
  fullMoonsSeen
}) => {
  // Compute SVG moon shadow rendering
  // Phase age in 0..29.53:
  // 0/29.5: new (all dark), ~7.4: first quarter (right half lit), 14.8: full (all lit), 22.1: last quarter
  const phaseFraction = moonPhase.illumination_pct / 100;

  return (
    <BentoCard
      title="Lunar Phase"
      icon={<Moon className="w-4 h-4 text-text hover:text-primary transition-colors" strokeWidth={1.5} />}
      badge={`${moonPhase.illumination_pct}% LIT`}
    >
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          {/* Animated SVG Moon */}
          <div className="relative w-16 h-16 shrink-0 rounded-full bg-[#0a0a0a] border border-[#001000] p-1 shadow-glow flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Moon Dark Side Base */}
              <circle cx="50" cy="50" r="46" fill="#141414" stroke="#002200" strokeWidth="2" />
              {/* Crater details */}
              <circle cx="35" cy="40" r="6" fill="#0c0c0c" />
              <circle cx="65" cy="60" r="8" fill="#0c0c0c" />
              <circle cx="45" cy="70" r="5" fill="#0c0c0c" />

              {/* Illumination overlay using clip & gradient */}
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="#C6FF3D"
                opacity={Math.max(0.15, phaseFraction)}
                className="animate-pulse"
                style={{ animationDuration: '4s' }}
              />
            </svg>
          </div>

          <div>
            <div className="font-headline text-base text-primary uppercase tracking-wide">
              {moonPhase.phase_name}
            </div>
            <p className="text-xs text-text-muted mt-1 leading-snug">
              {moonPhase.description}
            </p>
          </div>
        </div>

        {/* Full Moons Witnessed */}
        <div className="bg-surface rounded-xl p-3 border border-border flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-accent" strokeWidth={1.5} />
            <span className="text-text-muted">Full Moons In Your Lifetime:</span>
          </div>
          <span className="font-headline text-text font-bold text-sm tabular-nums">
            ~{fullMoonsSeen.toLocaleString()}
          </span>
        </div>
      </div>
    </BentoCard>
  );
};
