import React from 'react';
import { PillBadge } from '../components/ui/PillBadge';
import { PixelStars } from '../components/ui/PixelStars';
import { FormBar } from '../components/ui/FormBar';
import { EasterEggConfetti } from '../components/landing/EasterEggConfetti';
import { Globe } from 'lucide-react';

interface LandingProps {
  onSubmit: (name: string, date: string) => void;
  isLoading?: boolean;
}

export const Landing: React.FC<LandingProps> = ({ onSubmit, isLoading = false }) => {
  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 sm:px-6 py-12 z-10 overflow-hidden">
      {/* Soft Accent Radial Glow at the top center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[340px] bg-[radial-gradient(ellipse_at_center,rgba(51,255,102,0.14),transparent_70%)] pointer-events-none" />

      {/* Five floating pixel squares around the hero */}
      <PixelStars />

      <div className="w-full max-w-4xl mx-auto space-y-8 text-center relative z-10">
        {/* Pill Badge */}
        <div className="flex justify-center">
          <PillBadge variant="accent">
            <Globe className="w-3.5 h-3.5 text-accent" />
            <span>Worldwide · every day since 1900</span>
          </PillBadge>
        </div>

        {/* Hero H1: Silkscreen 56px uppercase */}
        <div className="space-y-4">
          <h1 className="font-headline text-3xl sm:text-5xl lg:text-[56px] leading-tight sm:leading-none uppercase tracking-wide select-none">
            <span className="text-text block">Every day has a story.</span>
            <span className="text-primary block mt-1">This one's yours.</span>
          </h1>

          {/* 20px Plex Sans subtitle capped at 600px */}
          <p className="font-body text-base sm:text-[20px] text-text-muted max-w-[600px] mx-auto leading-relaxed">
            Rewind the clock to the exact date you arrived on Earth and discover what the world, the charts, and the cosmos looked like.
          </p>
        </div>

        {/* Easter Egg check if today's birthday */}
        <EasterEggConfetti name="Time Traveler" birthDate={new Date().toISOString().slice(0, 10)} />

        {/* Form Bar container */}
        <div className="pt-2">
          <FormBar
            onSubmit={onSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};
