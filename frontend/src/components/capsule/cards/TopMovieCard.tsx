import React from 'react';
import { BentoCard } from '../BentoCard';
import { Film, Clapperboard } from 'lucide-react';
import { MovieInfo } from '../../../types';

interface TopMovieCardProps {
  movie?: MovieInfo;
}

export const TopMovieCard: React.FC<TopMovieCardProps> = ({ movie }) => {
  if (!movie) {
    return (
      <BentoCard
        title="Box Office Gold"
        icon={<Film className="w-4 h-4 text-text hover:text-primary transition-colors" strokeWidth={1.5} />}
        badge="CINEMA"
      >
        <div className="text-xs text-text-dim py-4 text-center">
          No cinematic data recorded for this year.
        </div>
      </BentoCard>
    );
  }

  return (
    <BentoCard
      title="Box Office Sensation"
      icon={<Film className="w-4 h-4 text-text hover:text-primary transition-colors" strokeWidth={1.5} />}
      badge={`${movie.year} BLOCKBUSTER`}
    >
      <div className="space-y-4">
        {/* Film titles */}
        <div className="bg-[#0a0a0a] rounded-xl p-4 border border-[#001000] space-y-2">
          <div className="flex items-center gap-2">
            <Clapperboard className="w-4 h-4 text-primary shrink-0" strokeWidth={1.5} />
            <span className="text-[10px] font-mono text-text-dim uppercase">
              Leading Feature of the Era
            </span>
          </div>
          <div className="font-headline text-lg sm:text-xl text-primary font-bold">
            {movie.year_title}
          </div>
          {movie.week_title !== movie.year_title && (
            <div className="text-xs text-text-muted">
              Also headlining theaters: <span className="text-text font-medium">{movie.week_title}</span>
            </div>
          )}
        </div>

        {/* Trivia */}
        <div className="bg-surface rounded-xl p-3 border border-border text-xs leading-relaxed text-text-muted">
          <span className="text-primary font-headline uppercase mr-1 text-[11px]">Trivia:</span>
          {movie.trivia}
        </div>
      </div>
    </BentoCard>
  );
};
