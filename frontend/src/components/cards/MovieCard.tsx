import React from 'react';
import { Tile } from '../ui/Tile';
import { StatLabel } from '../ui/StatLabel';
import { FilmStrip } from '../ui/FilmStrip';
import { Clapperboard } from 'lucide-react';
import { MovieInfo } from '../../types';

interface MovieCardProps {
  movie?: MovieInfo | null;
  isLoading?: boolean;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, isLoading }) => {
  if (isLoading) {
    return (
      <Tile>
        <div className="animate-pulse space-y-4">
          <div className="h-4 w-28 bg-surface-hover rounded" />
          <div className="h-8 w-44 bg-surface-hover rounded" />
          <div className="h-4 w-36 bg-surface-hover rounded" />
        </div>
      </Tile>
    );
  }

  if (!movie) {
    return (
      <Tile>
        <StatLabel icon={<Clapperboard className="w-4 h-4" strokeWidth={1.5} />} caption="TOP MOVIE" />
        <div className="text-text-dim text-xs py-6 font-mono">No box office data for this date.</div>
      </Tile>
    );
  }

  return (
    <Tile delay={0.3}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <StatLabel
            icon={<Clapperboard className="w-4 h-4 text-accent" strokeWidth={1.5} />}
            caption="TOP MOVIE"
          />
          {/* Three-frame film strip visual */}
          <FilmStrip />
        </div>

        <div className="space-y-1">
          <div className="font-headline text-lg sm:text-xl text-primary font-bold line-clamp-2">
            {movie.week_title || movie.year_title}
          </div>
          <div className="text-xs font-mono text-text-dim">
            Top of the box office that week
          </div>
        </div>

        {movie.year_title && movie.year_title !== movie.week_title && (
          <div className="text-xs text-text-muted pt-1">
            Biggest film of {movie.year}: <span className="text-text font-medium">{movie.year_title}</span>
          </div>
        )}
      </div>
    </Tile>
  );
};
