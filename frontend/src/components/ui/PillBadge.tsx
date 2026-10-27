import React from 'react';

interface PillBadgeProps {
  children: React.ReactNode;
  variant?: 'accent' | 'primary' | 'muted';
  className?: string;
}

export const PillBadge: React.FC<PillBadgeProps> = ({
  children,
  variant = 'accent',
  className = ''
}) => {
  const variantStyles = {
    accent: 'bg-[#001000] border-accent/40 text-accent shadow-[0_0_10px_rgba(51,255,102,0.15)]',
    primary: 'bg-[#141414] border-primary/50 text-primary',
    muted: 'bg-[#0a0a0a] border-border text-text-dim'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono tracking-wider border select-none ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
