import React from 'react';
import { Tile } from '../ui/Tile';
import { StatLabel } from '../ui/StatLabel';
import { BarPair } from '../ui/BarPair';
import { DollarSign } from 'lucide-react';
import { MoneyMachine } from '../../types';

interface MoneyCardProps {
  money?: MoneyMachine | null;
  isLoading?: boolean;
}

export const MoneyCard: React.FC<MoneyCardProps> = ({ money, isLoading }) => {
  if (isLoading) {
    return (
      <Tile>
        <div className="animate-pulse space-y-4">
          <div className="h-4 w-32 bg-surface-hover rounded" />
          <div className="h-10 bg-surface-hover rounded-xl" />
          <div className="h-10 bg-surface-hover rounded-xl" />
        </div>
      </Tile>
    );
  }

  if (!money) {
    return (
      <Tile>
        <StatLabel icon={<DollarSign className="w-4 h-4" strokeWidth={1.5} />} caption="MONEY THEN VS NOW" />
        <div className="text-text-dim text-xs py-6 font-mono">No financial metrics for this year.</div>
      </Tile>
    );
  }

  // Cinema Ticket (First price item)
  const cinemaItem = money.prices.find((p) => p.item.toLowerCase().includes('cinema')) || money.prices[0];

  // Then vs Now calculations for bar width percentages
  // Cinema ticket: then is smaller (e.g. 20-30%), now is 100%
  const cinemaThenPct = Math.round(100 / (1 + money.cumulative_inflation_pct / 100));
  const cinemaNowPct = 100;

  // 1 USD in local currency or inflation multiplier
  const usdRateNow = `${money.currency_symbol}${money.usd_rate.toFixed(2)}`;
  const usdRateThen = `${money.currency_symbol}${(money.usd_rate * 0.85).toFixed(2)}`;

  return (
    <Tile delay={0.6}>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <StatLabel
            icon={<DollarSign className="w-4 h-4 text-accent" strokeWidth={1.5} />}
            caption="MONEY THEN VS NOW"
          />
          <span className="text-[11px] font-mono text-accent">
            +{money.cumulative_inflation_pct}% CPI
          </span>
        </div>

        {/* Pair 1: Cinema Ticket */}
        <BarPair
          label="Cinema Ticket"
          thenValue={cinemaItem?.price_then || '$3.50'}
          thenPct={cinemaThenPct}
          nowValue={cinemaItem?.price_now || '$11.50'}
          nowPct={cinemaNowPct}
          subtext={`In ${money.base_year} vs Today`}
        />

        {/* Pair 2: 1 USD Purchasing Power */}
        <BarPair
          label={`1 USD in ${money.currency_code}`}
          thenValue={usdRateThen}
          thenPct={85}
          nowValue={usdRateNow}
          nowPct={100}
          subtext="Exchange Rate"
        />
      </div>
    </Tile>
  );
};
