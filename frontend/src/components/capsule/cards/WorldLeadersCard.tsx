import React from 'react';
import { BentoCard } from '../BentoCard';
import { Landmark, ShieldAlert } from 'lucide-react';
import { WorldLeader } from '../../../types';

interface WorldLeadersCardProps {
  leaders: WorldLeader[];
}

export const WorldLeadersCard: React.FC<WorldLeadersCardProps> = ({ leaders }) => {
  return (
    <BentoCard
      title="World Leadership"
      icon={<Landmark className="w-4 h-4 text-text hover:text-primary transition-colors" strokeWidth={1.5} />}
      badge="GOVERNANCE"
    >
      <div className="space-y-3">
        {leaders.map((leader, idx) => (
          <div
            key={idx}
            className="p-3 rounded-xl bg-surface border border-border flex items-center justify-between text-xs"
          >
            <div>
              <span className="text-[10px] font-mono text-text-dim uppercase block">
                {leader.office} ({leader.country})
              </span>
              <span className="font-headline text-text font-bold text-xs uppercase">
                {leader.name}
              </span>
            </div>
            <ShieldAlert className="w-4 h-4 text-primary shrink-0 opacity-80" strokeWidth={1.5} />
          </div>
        ))}
      </div>
    </BentoCard>
  );
};
