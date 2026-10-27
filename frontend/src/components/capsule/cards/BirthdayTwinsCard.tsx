import React from 'react';
import { BentoCard } from '../BentoCard';
import { Users2, Star } from 'lucide-react';
import { BirthdayTwin } from '../../../types';

interface BirthdayTwinsCardProps {
  twins: BirthdayTwin[];
}

export const BirthdayTwinsCard: React.FC<BirthdayTwinsCardProps> = ({ twins }) => {
  return (
    <BentoCard
      title="Birthday Twins"
      icon={<Users2 className="w-4 h-4 text-text hover:text-primary transition-colors" strokeWidth={1.5} />}
      badge="SHARED BIRTHDAY"
    >
      <div className="space-y-3">
        {twins.slice(0, 4).map((twin, idx) => (
          <div
            key={idx}
            className="p-3 rounded-xl bg-surface border border-border flex items-start gap-2.5 text-xs"
          >
            <Star className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" strokeWidth={1.5} />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-headline text-text font-bold text-xs uppercase">
                  {twin.name}
                </span>
                <span className="font-mono text-[10px] text-accent">
                  (b. {twin.year})
                </span>
              </div>
              <p className="text-[11px] text-text-muted mt-0.5 leading-snug">
                {twin.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </BentoCard>
  );
};
