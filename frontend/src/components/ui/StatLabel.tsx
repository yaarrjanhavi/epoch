import React from 'react';

interface StatLabelProps {
  icon: React.ReactNode;
  caption: string;
  className?: string;
}

export const StatLabel: React.FC<StatLabelProps> = ({
  icon,
  caption,
  className = ''
}) => {
  return (
    <div className={`flex items-center gap-2 text-text group-hover:text-primary transition-colors ${className}`}>
      <span className="text-text hover:text-primary shrink-0 transition-colors">
        {icon}
      </span>
      <span className="font-headline text-[11px] sm:text-xs uppercase tracking-wider text-text-muted group-hover:text-primary transition-colors select-none">
        {caption}
      </span>
    </div>
  );
};
