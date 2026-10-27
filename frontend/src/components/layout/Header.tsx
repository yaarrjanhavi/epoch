import React from 'react';
import { Sparkles, Users, Share2, RotateCcw } from 'lucide-react';

interface HeaderProps {
  name?: string;
  birthDate?: string;
  onNewDate: () => void;
  onOpenCompare: () => void;
  onOpenShare: () => void;
  isCapsuleActive: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  name,
  birthDate,
  onNewDate,
  onOpenCompare,
  onOpenShare,
  isCapsuleActive
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-black/85 border-b border-[#001000] px-4 sm:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={onNewDate} 
          className="flex items-center gap-2 cursor-pointer group select-none"
        >
          <div className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center text-primary group-hover:border-accent group-hover:shadow-glow-sm transition-all">
            <span className="font-headline text-lg">E</span>
          </div>
          <div>
            <span className="font-headline text-xl text-primary tracking-widest group-hover:text-accent transition-colors">
              EPOCH
            </span>
            <span className="hidden sm:inline-block ml-2 text-[10px] tracking-wider text-text-dim uppercase border border-border px-1.5 py-0.5 rounded">
              v1.0
            </span>
          </div>
        </div>

        {/* Middle capsule badge if results are active */}
        {isCapsuleActive && name && birthDate && (
          <div className="hidden md:flex items-center gap-2 bg-surface px-3 py-1 rounded-full border border-border text-xs">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="font-headline text-text">{name}</span>
            <span className="text-text-dim">//</span>
            <span className="text-text-muted">{birthDate}</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {isCapsuleActive ? (
            <>
              <button
                onClick={onOpenCompare}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface hover:bg-surface-hover border border-border hover:border-accent text-xs font-medium text-text hover:text-primary transition-all duration-200"
                title="Compare your timeline with a friend or partner"
              >
                <Users className="w-4 h-4 text-text hover:text-primary transition-colors" strokeWidth={1.5} />
                <span className="hidden sm:inline">Compare</span>
              </button>

              <button
                onClick={onOpenShare}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface hover:bg-surface-hover border border-border hover:border-accent text-xs font-medium text-text hover:text-primary transition-all duration-200 shadow-sm hover:shadow-glow-sm"
                title="Generate shareable time capsule card"
              >
                <Share2 className="w-4 h-4 text-text hover:text-primary transition-colors" strokeWidth={1.5} />
                <span className="hidden sm:inline">Share</span>
              </button>

              <button
                onClick={onNewDate}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface hover:bg-[#1a1a1a] border border-border hover:border-primary text-xs font-headline uppercase text-primary hover:shadow-glow-sm transition-all"
                title="Enter another birth date"
              >
                <RotateCcw className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span>New Date</span>
              </button>
            </>
          ) : (
            <div className="flex items-center gap-1.5 text-xs text-text-dim">
              <Sparkles className="w-3.5 h-3.5 text-accent animate-pulse" />
              <span>TIME MACHINE READY</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
