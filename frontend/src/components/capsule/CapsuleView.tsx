import React from 'react';
import { motion } from 'framer-motion';
import { TimeCapsuleResponse } from '../../types';
import { BentoGrid } from './BentoGrid';
import { Sparkles, Calendar, Globe, Users, Share2 } from 'lucide-react';

interface CapsuleViewProps {
  capsule: TimeCapsuleResponse;
  onOpenCompare: () => void;
  onOpenShare: () => void;
}

export const CapsuleView: React.FC<CapsuleViewProps> = ({
  capsule,
  onOpenCompare,
  onOpenShare
}) => {
  const { name, birth_date, stats, country } = capsule;

  // Format date nicely: e.g. "May 14, 1998"
  const formattedDate = new Date(birth_date + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8 relative z-10">
      {/* Hero Greeting Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="retro-card p-6 sm:p-8 bg-[#141414]/90 border border-[#001000] relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0a0a0a] border border-[#001000] text-xs text-text-muted">
            <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
            <span className="font-mono text-accent">TIME CAPSULE UNLOCKED</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-headline tracking-wider text-primary font-bold">
            HEY {name.toUpperCase()},
          </h1>
          <p className="font-body text-lg sm:text-xl text-text-muted">
            Here's what the world looked like on <span className="text-text font-medium">{formattedDate}</span>.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-mono text-text-dim">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-accent" />
              <span>{stats.day_of_week}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-primary" />
              <span>Region: {country}</span>
            </span>
            <span>•</span>
            <span className="text-accent">
              Orbit #{Math.floor(stats.earth_orbits)} In Progress
            </span>
          </div>
        </div>

        {/* Quick action buttons on banner */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <button
            onClick={onOpenCompare}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-surface hover:bg-surface-hover border border-border hover:border-accent text-xs font-headline uppercase text-text hover:text-primary transition-all cursor-pointer shadow-sm"
          >
            <Users className="w-4 h-4 text-text hover:text-primary" />
            <span>Compare With Someone</span>
          </button>

          <button
            onClick={onOpenShare}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-[#d6ff5c] text-background font-headline text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-glow-primary"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Capsule</span>
          </button>
        </div>
      </motion.div>

      {/* Bento Grid */}
      <BentoGrid capsule={capsule} />
    </div>
  );
};
