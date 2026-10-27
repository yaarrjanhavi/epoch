import React from 'react';
import { BentoCard } from '../BentoCard';
import { DollarSign, ArrowUpRight, TrendingUp } from 'lucide-react';
import { MoneyMachine } from '../../../types';

interface MoneyMachineCardProps {
  money?: MoneyMachine;
}

export const MoneyMachineCard: React.FC<MoneyMachineCardProps> = ({ money }) => {
  if (!money) return null;

  return (
    <BentoCard
      title="Money Machine"
      icon={<DollarSign className="w-4 h-4 text-text hover:text-primary transition-colors" strokeWidth={1.5} />}
      badge={`+${money.cumulative_inflation_pct}% INFLATION`}
      className="col-span-1 md:col-span-2"
    >
      <div className="space-y-4">
        {/* Inflation Banner */}
        <div className="bg-[#0a0a0a] rounded-xl p-4 border border-[#001000] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <div className="font-headline text-2xl text-primary font-bold">
              +{money.cumulative_inflation_pct}% Price Shift
            </div>
            <div className="text-xs text-text-muted mt-0.5">
              Consumer price change from {money.base_year} to {money.current_year}
            </div>
          </div>
          <div className="text-right text-[11px] font-mono text-text-dim">
            <div>Currency: {money.currency_code} ({money.currency_symbol})</div>
            {money.usd_rate !== 1.0 && (
              <div>1 USD ≈ {money.usd_rate} {money.currency_code}</div>
            )}
          </div>
        </div>

        {/* Commodity comparison grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {money.prices.map((item, idx) => (
            <div
              key={idx}
              className="bg-surface rounded-xl p-3 border border-border flex flex-col justify-between space-y-2 text-xs"
            >
              <div className="text-[11px] font-headline text-text uppercase">
                {item.item}
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-text-dim font-mono">{money.base_year}:</span>
                  <span className="font-headline text-accent font-bold">{item.price_then}</span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-text-dim font-mono">Today:</span>
                  <span className="font-headline text-primary font-bold">{item.price_now}</span>
                </div>
              </div>

              <div className="text-[9px] font-mono text-text-dim truncate">
                {item.unit}
              </div>
            </div>
          ))}
        </div>
      </div>
    </BentoCard>
  );
};
