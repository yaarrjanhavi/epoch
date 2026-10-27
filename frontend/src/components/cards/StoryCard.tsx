import React, { useState } from 'react';
import { Tile } from '../ui/Tile';
import { StatLabel } from '../ui/StatLabel';
import { Typewriter } from '../ui/Typewriter';
import { Sparkles, RefreshCw } from 'lucide-react';
import { regenerateStory } from '../../services/api';

interface StoryCardProps {
  initialStory?: string | null;
  capsulePayload: any;
  isLoading?: boolean;
}

export const StoryCard: React.FC<StoryCardProps> = ({
  initialStory,
  capsulePayload,
  isLoading
}) => {
  const [story, setStory] = useState(initialStory || '');
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [key, setKey] = useState(0); // forces re-render of typewriter on new story

  if (isLoading) {
    return (
      <Tile className="col-span-1 md:col-span-2 lg:col-span-3 border-accent/30">
        <div className="animate-pulse space-y-4">
          <div className="h-4 w-36 bg-surface-hover rounded" />
          <div className="space-y-2">
            <div className="h-4 bg-surface-hover rounded w-full" />
            <div className="h-4 bg-surface-hover rounded w-5/6" />
            <div className="h-4 bg-surface-hover rounded w-4/6" />
          </div>
        </div>
      </Tile>
    );
  }

  const handleRegenerate = async () => {
    if (isRegenerating) return;
    setIsRegenerating(true);
    try {
      const newStory = await regenerateStory(capsulePayload);
      setStory(newStory);
      setKey((prev) => prev + 1);
    } catch (e) {
      console.error(e);
    } finally {
      setIsRegenerating(false);
    }
  };

  return (
    <Tile
      className="col-span-1 md:col-span-2 lg:col-span-3 border-[rgba(51,255,102,0.35)] shadow-[0_0_18px_rgba(51,255,102,0.12)]"
      delay={0.8}
    >
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <StatLabel
            icon={<Sparkles className="w-4 h-4 text-accent animate-pulse" strokeWidth={1.5} />}
            caption="BIRTHDAY STORY"
          />
          <button
            onClick={handleRegenerate}
            disabled={isRegenerating}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#001000] hover:bg-[#002200] border border-accent/40 hover:border-accent text-xs font-headline uppercase text-accent hover:text-primary transition-all cursor-pointer disabled:opacity-50 select-none shadow-[0_0_8px_rgba(51,255,102,0.15)]"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRegenerating ? 'animate-spin text-accent' : ''}`} />
            <span>{isRegenerating ? 'Composing...' : 'REGENERATE'}</span>
          </button>
        </div>

        {/* Typewriter story text */}
        <div className="bg-[#000000] border border-[#001800] rounded-xl p-5 min-h-[90px]">
          {isRegenerating ? (
            <div className="flex items-center gap-2 text-xs font-mono text-accent">
              <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
              <span>Asking the timeline to recompose your narrative...</span>
            </div>
          ) : story ? (
            <Typewriter
              key={key}
              text={story}
              speedMs={14}
              className="text-sm sm:text-base text-text leading-relaxed tracking-wide"
            />
          ) : (
            <div className="text-text-dim text-xs font-mono">No story generated yet.</div>
          )}
        </div>
      </div>
    </Tile>
  );
};
