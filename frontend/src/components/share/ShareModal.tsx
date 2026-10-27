import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { X, Download, Copy, Check, Share2, Sparkles, Music, Film, Clock, History } from 'lucide-react';
import { toPng } from 'html-to-image';
import { TimeCapsuleResponse } from '../../types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  capsule: TimeCapsuleResponse;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, capsule }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  if (!isOpen) return null;

  const { name, birth_date, stats, world } = capsule;
  const shareableUrl = `${window.location.origin}${window.location.pathname}?date=${birth_date}&name=${encodeURIComponent(name)}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopySummary = () => {
    const summary = `⏳ EPOCH TIME CAPSULE: ${name.toUpperCase()}
Birthdate: ${birth_date} (${stats.day_of_week})
• Days Alive: ${stats.days_alive.toLocaleString()} days
• Heliocentric Distance: ${(stats.space_distance_km / 1e9).toFixed(2)} Billion km
• Lunar Phase: ${stats.moon_phase.phase_name} (${stats.moon_phase.illumination_pct}% lit)
• Billboard #1 Hit: "${world.top_song?.title}" by ${world.top_song?.artist}
• Top Film: ${world.top_movie?.year_title}
• Zodiac: ${stats.western_zodiac.sign} (${stats.western_zodiac.symbol}) // Year of the ${stats.chinese_zodiac.animal}
Explore your day on: ${shareableUrl}`;

    navigator.clipboard.writeText(summary);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  const handleDownloadImage = async () => {
    if (!cardRef.current || isDownloading) return;
    setIsDownloading(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        quality: 0.95,
        pixelRatio: 2,
        backgroundColor: '#000000'
      });
      const link = document.createElement('a');
      link.download = `epoch-capsule-${name.toLowerCase().replace(/\s+/g, '-')}-${birth_date}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Image export failed:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const firstHistory = world.history_highlights[0]?.text || 'Significant cultural advancements and human progress.';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="retro-card w-full max-w-xl bg-[#141414] border-2 border-border p-6 sm:p-8 space-y-6 relative shadow-glow my-8 max-h-[92vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center text-text hover:text-primary hover:border-accent transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-primary" strokeWidth={1.5} />
            <h2 className="font-headline text-lg sm:text-xl text-primary uppercase tracking-wider">
              Share Your Time Capsule
            </h2>
          </div>
          <p className="text-xs text-text-muted">
            Export a high-res poster card, copy your share link, or grab a text dispatch.
          </p>
        </div>

        {/* 1080x1350 Proportional Canvas Preview (4:5 Aspect Ratio) */}
        <div className="flex justify-center">
          <div
            ref={cardRef}
            className="w-[340px] h-[425px] sm:w-[380px] sm:h-[475px] bg-[#000000] border-2 border-[#002200] rounded-2xl p-6 flex flex-col justify-between text-left relative overflow-hidden shadow-2xl select-none"
            style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
          >
            {/* Retro scanline & background */}
            <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
            <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-accent/30 pointer-events-none" />

            {/* Top header */}
            <div className="relative z-10 flex items-center justify-between border-b border-[#002200] pb-3">
              <div>
                <span className="font-headline text-primary text-xl tracking-widest font-bold">
                  EPOCH
                </span>
                <span className="text-[9px] font-mono text-text-dim block tracking-wider">
                  TIME CAPSULE ARCHIVE
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-accent uppercase font-bold block">
                  {birth_date}
                </span>
                <span className="text-[9px] font-mono text-text-dim">
                  Born on a {stats.day_of_week}
                </span>
              </div>
            </div>

            {/* Center: Traveler & Life Stats */}
            <div className="relative z-10 space-y-3 my-auto">
              <div>
                <span className="text-[10px] font-mono text-text-dim uppercase tracking-widest block">
                  EXPLORER
                </span>
                <div className="font-headline text-2xl text-text font-bold uppercase truncate">
                  {name}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-[#141414] p-2.5 rounded-xl border border-[#001800]">
                  <span className="text-[9px] font-mono text-text-dim uppercase block">Days Alive</span>
                  <span className="font-headline text-primary text-base font-bold">
                    {stats.days_alive.toLocaleString()}
                  </span>
                </div>
                <div className="bg-[#141414] p-2.5 rounded-xl border border-[#001800]">
                  <span className="text-[9px] font-mono text-text-dim uppercase block">Cosmic Distance</span>
                  <span className="font-headline text-accent text-base font-bold">
                    {(stats.space_distance_km / 1e9).toFixed(1)}B km
                  </span>
                </div>
              </div>

              {/* Cultural highlights */}
              <div className="space-y-1.5 text-[11px] bg-[#141414]/90 p-3 rounded-xl border border-[#001800]">
                {world.top_song && (
                  <div className="flex items-center gap-2 truncate">
                    <Music className="w-3.5 h-3.5 text-accent shrink-0" />
                    <span className="text-text font-medium truncate">
                      "{world.top_song.title}" — {world.top_song.artist}
                    </span>
                  </div>
                )}
                {world.top_movie && (
                  <div className="flex items-center gap-2 truncate">
                    <Film className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span className="text-text-muted truncate">
                      Cinema: {world.top_movie.year_title}
                    </span>
                  </div>
                )}
                <div className="flex items-start gap-2 pt-1 border-t border-[#002200]">
                  <History className="w-3.5 h-3.5 text-text-dim shrink-0 mt-0.5" />
                  <p className="text-[10px] text-text-dim line-clamp-2 leading-tight">
                    {firstHistory}
                  </p>
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="relative z-10 pt-2 border-t border-[#002200] flex items-center justify-between text-[9px] font-mono text-text-dim">
              <span>{stats.western_zodiac.sign} • {stats.chinese_zodiac.animal}</span>
              <span className="text-primary font-bold">EPOCH TIME MACHINE</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Download Image */}
          <button
            onClick={handleDownloadImage}
            disabled={isDownloading}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary hover:bg-[#d6ff5c] text-background font-headline text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-glow-primary disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{isDownloading ? 'Rendering...' : 'Download Card'}</span>
          </button>

          {/* Copy Link */}
          <button
            onClick={handleCopyLink}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-surface hover:bg-surface-hover border border-border hover:border-accent text-text hover:text-primary font-headline text-xs uppercase tracking-wider transition-all cursor-pointer"
          >
            {copiedLink ? <Check className="w-4 h-4 text-accent" /> : <Copy className="w-4 h-4" />}
            <span>{copiedLink ? 'Link Copied!' : 'Copy Link'}</span>
          </button>

          {/* Copy Summary Text */}
          <button
            onClick={handleCopySummary}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-surface hover:bg-surface-hover border border-border hover:border-accent text-text hover:text-primary font-headline text-xs uppercase tracking-wider transition-all cursor-pointer"
          >
            {copiedSummary ? <Check className="w-4 h-4 text-accent" /> : <Sparkles className="w-4 h-4" />}
            <span>{copiedSummary ? 'Copied!' : 'Copy Summary'}</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
