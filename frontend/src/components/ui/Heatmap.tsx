import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface HeatmapProps {
  birthMonth: number; // 1..12
  birthDay: number;   // 1..31
  rarityPercentile: number;
}

const MONTH_NAMES = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const DAYS_IN_MONTH = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// 4 Accent intensity levels
const INTENSITY_COLORS = [
  'bg-[#0b1b0b]',
  'bg-[rgba(51,255,102,0.25)]',
  'bg-[rgba(51,255,102,0.55)]',
  'bg-[rgba(51,255,102,0.85)]'
];

export const Heatmap: React.FC<HeatmapProps> = ({
  birthMonth,
  birthDay,
  rarityPercentile
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="space-y-3 select-none">
      <div className="overflow-x-auto pb-2">
        <div className="flex flex-col gap-1 min-w-[540px]">
          {Array.from({ length: 12 }).map((_, mIdx) => {
            const currentMonth = mIdx + 1;
            const maxDays = DAYS_IN_MONTH[mIdx];

            return (
              <div key={mIdx} className="flex items-center gap-1.5">
                {/* Month label */}
                <span className="w-7 font-mono text-[9px] text-text-dim text-right font-bold shrink-0">
                  {MONTH_NAMES[mIdx]}
                </span>

                {/* 31 day squares */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: 31 }).map((_, dIdx) => {
                    const currentDay = dIdx + 1;
                    if (currentDay > maxDays) {
                      return <div key={dIdx} className="w-3 h-3 opacity-0" />;
                    }

                    const isUserBirthday = currentMonth === birthMonth && currentDay === birthDay;

                    // Pseudo-deterministic level (0..3) based on demographic seasonal trends
                    let level = 1;
                    if (currentMonth === 9) level = 3;
                    else if (currentMonth === 8) level = 2;
                    else if (currentMonth === 12 && currentDay >= 24) level = 0;
                    else if (currentMonth === 1 && currentDay === 1) level = 0;
                    else if (currentMonth === 2 && currentDay === 29) level = 0;
                    else level = ((currentDay * 7 + currentMonth * 11) % 4);

                    return (
                      <motion.div
                        key={dIdx}
                        initial={shouldReduceMotion ? { scale: 1 } : { scale: 0.2, opacity: 0 }}
                        whileInView={shouldReduceMotion ? { scale: 1 } : { scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: shouldReduceMotion ? 0 : (mIdx * 31 + dIdx) * 0.0012,
                          duration: 0.25
                        }}
                        title={`${MONTH_NAMES[mIdx]} ${currentDay}${isUserBirthday ? ' (Your Birthday!)' : ''}`}
                        className={`w-3 h-3 rounded-[2px] transition-transform hover:scale-150 ${
                          isUserBirthday
                            ? 'bg-[#C6FF3D] border border-white z-10 scale-125 shadow-[0_0_10px_#C6FF3D] animate-pulse'
                            : INTENSITY_COLORS[level]
                        }`}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Caption & Legend */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2 border-t border-[#002200] text-xs">
        <p className="font-headline uppercase text-primary text-[11px] sm:text-xs">
          Your birthday is rarer than {rarityPercentile}% of dates.
        </p>

        <div className="flex items-center gap-2 text-[10px] font-mono text-text-dim">
          <span>Less common</span>
          <div className="flex items-center gap-1">
            {INTENSITY_COLORS.map((bg, i) => (
              <div key={i} className={`w-2.5 h-2.5 rounded-[1px] ${bg}`} />
            ))}
            <div className="w-2.5 h-2.5 rounded-[1px] bg-[#C6FF3D] shadow-[0_0_4px_#C6FF3D]" />
          </div>
          <span>Most common</span>
        </div>
      </div>
    </div>
  );
};
