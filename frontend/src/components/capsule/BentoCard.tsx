import React from 'react';
import { motion } from 'framer-motion';

interface BentoCardProps {
  title: string;
  icon: React.ReactNode;
  subtitle?: string;
  badge?: string;
  className?: string;
  children: React.ReactNode;
}

export const BentoCard: React.FC<BentoCardProps> = ({
  title,
  icon,
  subtitle,
  badge,
  className = '',
  children
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={`retro-card p-5 sm:p-6 flex flex-col justify-between group relative overflow-hidden backdrop-blur-sm ${className}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#0a0a0a] border border-[#001000] flex items-center justify-center text-text group-hover:text-primary group-hover:border-accent/40 transition-colors">
            {icon}
          </div>
          <div>
            <h3 className="font-headline text-xs sm:text-sm uppercase tracking-wider text-primary group-hover:text-accent transition-colors">
              {title}
            </h3>
            {subtitle && (
              <p className="text-[11px] text-text-dim font-mono">{subtitle}</p>
            )}
          </div>
        </div>
        {badge && (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono tracking-wider bg-[#0a0a0a] border border-border text-accent uppercase">
            {badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center">
        {children}
      </div>
    </motion.div>
  );
};
