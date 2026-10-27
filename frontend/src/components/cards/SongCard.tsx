import React from 'react';
import { Tile } from '../ui/Tile';
import { StatLabel } from '../ui/StatLabel';
import { Equalizer } from '../ui/Equalizer';
import { Music, ExternalLink } from 'lucide-react';
import { SongInfo } from '../../types';

interface SongCardProps {
  song?: SongInfo | null;
  isLoading?: boolean;
}

export const SongCard: React.FC<SongCardProps> = ({ song, isLoading }) => {
  if (isLoading) {
    return (
      <Tile>
        <div className="animate-pulse space-y-4">
          <div className="h-4 w-28 bg-surface-hover rounded" />
          <div className="h-8 w-40 bg-surface-hover rounded" />
          <div className="h-4 w-32 bg-surface-hover rounded" />
        </div>
      </Tile>
    );
  }

  if (!song) {
    return (
      <Tile>
        <StatLabel icon={<Music className="w-4 h-4" strokeWidth={1.5} />} caption="#1 SONG" />
        <div className="text-text-dim text-xs py-6 font-mono">No chart record for this week.</div>
      </Tile>
    );
  }

  return (
    <Tile delay={0.2}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <StatLabel
            icon={<Music className="w-4 h-4 text-accent" strokeWidth={1.5} />}
            caption="#1 SONG"
          />
          {/* Six animated equalizer bars */}
          <Equalizer />
        </div>

        <div className="space-y-1">
          <div className="font-headline text-lg sm:text-xl text-primary font-bold line-clamp-2">
            "{song.title}"
          </div>
          <div className="text-sm font-medium text-text">
            {song.artist}
          </div>
        </div>

        <div className="pt-2">
          <a
            href={song.spotify_url || song.youtube_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-headline uppercase text-accent hover:text-primary transition-colors underline decoration-accent/40 hover:decoration-primary"
          >
            <span>Search this song</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </Tile>
  );
};
