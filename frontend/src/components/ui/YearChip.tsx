import React from 'react';

interface YearChipProps {
  year: number | string;
  className?: string;
}

export const YearChip: React.FC<YearChipProps> = ({ year, className = '' }) => {
  return (
    <span
      className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded border border-primary bg-[#001000] font-headline text-primary text-xs font-bold tracking-wider select-none shrink-0 shadow-[0_0_8px_rgba(198,255,61,0.2)] ${className}`}
    >
      {year}
    </span>
  );
};
