import React from 'react';
import { BentoCard } from '../BentoCard';
import { Flag, CheckCircle2, Lock, Cake } from 'lucide-react';
import { Milestone } from '../../../types';

interface MilestonesCardProps {
  milestones: Milestone[];
  halfBirthday: string;
}

export const MilestonesCard: React.FC<MilestonesCardProps> = ({
  milestones,
  halfBirthday
}) => {
  return (
    <BentoCard
      title="Life Milestones"
      icon={<Flag className="w-4 h-4" strokeWidth={1.5} />}
      badge="ACHIEVEMENTS"
    >
      <div className="space-y-3">
        {milestones.map((m) => (
          <div
            key={m.target_days}
            className={`p-3 rounded-xl border flex items-center justify-between text-xs transition-colors ${
              m.unlocked
                ? 'bg-accent/10 border-accent/40 text-text'
                : 'bg-surface border-border text-text-muted'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {m.unlocked ? (
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0" strokeWidth={1.5} />
              ) : (
                <Lock className="w-4 h-4 text-text-dim shrink-0" strokeWidth={1.5} />
              )}
              <div>
                <div className="font-headline uppercase text-[11px] text-text">
                  {m.title}
                </div>
                <div className="text-[10px] text-text-dim font-mono">{m.date_achieved}</div>
              </div>
            </div>

            <div className="text-right">
              {m.unlocked ? (
                <span className="font-headline text-[10px] tracking-wider text-accent uppercase bg-accent/20 px-2 py-0.5 rounded">
                  UNLOCKED
                </span>
              ) : (
                <span className="font-mono text-[10px] text-text-dim">
                  In {m.days_remaining?.toLocaleString()} days
                </span>
              )}
            </div>
          </div>
        ))}

        {/* Half Birthday */}
        <div className="p-3 rounded-xl bg-surface border border-border flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            <Cake className="w-4 h-4 text-primary shrink-0" strokeWidth={1.5} />
            <div>
              <div className="font-headline uppercase text-[11px] text-primary">Half-Birthday</div>
              <div className="text-[10px] text-text-dim font-mono">6-Month Solar Reflection</div>
            </div>
          </div>
          <span className="font-headline text-text uppercase text-xs">
            {halfBirthday}
          </span>
        </div>
      </div>
    </BentoCard>
  );
};
