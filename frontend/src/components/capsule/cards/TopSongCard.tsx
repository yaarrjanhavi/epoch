import React from 'react';
import { BentoCard } from '../BentoCard';
import { Music, Play, ExternalLink } from 'lucide-react';
import { SongInfo } from '../../../types';

interface TopSongCardProps {
  song?: SongInfo;
}

export const TopSongCard: React.FC<TopSongCardProps> = ({ song }) => {
  if (!song) {
    return (
      <BentoCard
        title="Billboard #1 Hit"
        icon={<Music className="w-4 h-4 text-text hover:text-primary transition-colors" strokeWidth={1.5} />}
        badge="MUSIC"
      >
        <div className="text-xs text-text-dim py-4 text-center">
          No chart recorded for this week.
        </div>
      </BentoCard>
    );
  }

  return (
    <BentoCard
      title="Billboard #1 Hit"
      icon={<Music className="w-4 h-4 text-text hover:text-primary transition-colors" strokeWidth={1.5} />}
      badge={song.is_exact_week ? "EXACT WEEK #1" : "NEAREST HIT"}
    >
      <div className="space-y-4">
        {/* Track Title & Artist */}
        <div className="bg-[#0a0a0a] rounded-xl p-4 border border-[#001000] flex items-center justify-between gap-3">
          <div className="space-y-1 overflow-hidden">
            <div className="font-headline text-lg sm:text-xl text-primary font-bold truncate">
              "{song.title}"
            </div>
            <div className="text-sm font-medium text-text">
              {song.artist}
            </div>
            <div className="text-[10px] font-mono text-text-dim">
              Chart Date: {song.chart_date}
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary shrink-0 shadow-glow-sm">
            <Play className="w-5 h-5 ml-0.5 fill-primary" />
          </div>
        </div>

        {song.fallback_note && (
          <p className="text-[10px] font-mono text-text-dim italic">
            * {song.fallback_note}
          </p>
        )}

        {/* Streaming links */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <a
            href={song.youtube_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-surface hover:bg-surface-hover border border-border hover:border-red-500/50 text-text hover:text-red-400 transition-all font-mono text-[11px]"
          >
            <span>YouTube</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <a
            href={song.spotify_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-surface hover:bg-surface-hover border border-border hover:border-accent text-text hover:text-accent transition-all font-mono text-[11px]"
          >
            <span>Spotify</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </BentoCard>
  );
};
