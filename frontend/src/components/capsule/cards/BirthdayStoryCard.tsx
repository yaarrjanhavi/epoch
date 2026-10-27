import React, { useState, useEffect } from 'react';
import { BentoCard } from '../BentoCard';
import { BookOpen, Sparkles, RefreshCw } from 'lucide-react';
import { regenerateStory } from '../../../services/api';

interface BirthdayStoryCardProps {
  initialStory?: string;
  capsulePayload: any;
}

export const BirthdayStoryCard: React.FC<BirthdayStoryCardProps> = ({
  initialStory,
  capsulePayload
}) => {
  const [story, setStory] = useState(initialStory || '');
  const [displayedText, setDisplayedText] = useState('');
  const [isRegenerating, setIsRegenerating] = useState(false);

  // Typewriter animation when story text updates
  useEffect(() => {
    if (!story) return;
    let idx = 0;
    setDisplayedText('');
    const interval = setInterval(() => {
      idx++;
      setDisplayedText(story.slice(0, idx));
      if (idx >= story.length) {
        clearInterval(interval);
      }
    }, 18);

    return () => clearInterval(interval);
  }, [story]);

  const handleRegenerate = async () => {
    if (isRegenerating) return;
    setIsRegenerating(true);
    try {
      const newStory = await regenerateStory(capsulePayload);
      setStory(newStory);
    } catch (e) {
      console.error(e);
    } finally {
      setIsRegenerating(false);
    }
  };

  return (
    <BentoCard
      title="The Birthday Narrative"
      icon={<BookOpen className="w-4 h-4 text-text hover:text-primary transition-colors" strokeWidth={1.5} />}
      badge="TIME DISPATCH"
      className="col-span-1 md:col-span-2 lg:col-span-3"
    >
      <div className="space-y-4">
        <div className="bg-[#0a0a0a] rounded-xl p-5 border border-[#001000] relative overflow-hidden">
          <div className="text-sm font-body text-text leading-relaxed tracking-wide min-h-[100px]">
            {displayedText}
            {displayedText.length < (story?.length || 0) && (
              <span className="animate-blink text-accent ml-0.5">▌</span>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="text-[11px] font-mono text-text-dim flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-accent animate-pulse" />
              <span>Synthesized personalized prose of your epoch</span>
            </span>

            <button
              onClick={handleRegenerate}
              disabled={isRegenerating}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface hover:bg-surface-hover border border-border hover:border-accent text-xs font-headline uppercase text-text hover:text-primary transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRegenerating ? 'animate-spin text-accent' : ''}`} />
              <span>{isRegenerating ? 'Composing...' : 'Regenerate Narrative'}</span>
            </button>
          </div>
        </div>
      </div>
    </BentoCard>
  );
};
