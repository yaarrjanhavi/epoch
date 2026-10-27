import React from 'react';
import { BentoCard } from '../BentoCard';
import { UserCheck, Sparkles } from 'lucide-react';
import { NamePopularity } from '../../../types';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine
} from 'recharts';

interface NamePopularityCardProps {
  namePop: NamePopularity;
  birthYear: number;
}

export const NamePopularityCard: React.FC<NamePopularityCardProps> = ({
  namePop,
  birthYear
}) => {
  return (
    <BentoCard
      title={`Name Trajectory: "${namePop.name}"`}
      icon={<UserCheck className="w-4 h-4 text-text hover:text-primary transition-colors" strokeWidth={1.5} />}
      badge={`PEAK: ${namePop.peak_year}`}
      className="col-span-1 md:col-span-2"
    >
      <div className="space-y-4">
        {/* Banner summary */}
        <div className="bg-[#0a0a0a] rounded-xl p-3.5 border border-[#001000] flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="space-y-0.5">
            <span className="font-headline text-primary text-base uppercase">
              {namePop.name}
            </span>
            <p className="text-xs text-text-muted">
              {namePop.rank_in_birth_year
                ? `Ranked #${namePop.rank_in_birth_year} in ${birthYear} • Peak era peaked around ${namePop.peak_year}`
                : `Historical naming frequency curve plotted from 1900 to 2026`}
            </p>
          </div>
          <div className="text-xs font-mono text-accent">
            Birth Year Marked: {birthYear}
          </div>
        </div>

        {/* Recharts Line Chart */}
        <div className="h-48 w-full bg-surface rounded-xl p-2 border border-border">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={namePop.historical_curve} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis
                dataKey="year"
                stroke="rgba(156, 255, 140, 0.4)"
                fontSize={10}
                tickLine={false}
              />
              <YAxis
                stroke="rgba(156, 255, 140, 0.4)"
                fontSize={10}
                tickLine={false}
                tickFormatter={(val) => `${val}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#141414',
                  borderColor: '#002200',
                  borderRadius: '12px',
                  color: '#9CFF8C',
                  fontSize: '11px',
                  fontFamily: 'monospace'
                }}
                formatter={(val: any) => [`${Number(val).toLocaleString()} babies`, 'Frequency']}
                labelFormatter={(label) => `Year: ${label}`}
              />
              {/* Reference line at birth year */}
              <ReferenceLine
                x={birthYear}
                stroke="#C6FF3D"
                strokeDasharray="3 3"
                label={{
                  value: `${birthYear}`,
                  fill: '#C6FF3D',
                  fontSize: 10,
                  position: 'top',
                  fontFamily: 'monospace'
                }}
              />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#33FF66"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 5, fill: '#C6FF3D', stroke: '#000000', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </BentoCard>
  );
};
