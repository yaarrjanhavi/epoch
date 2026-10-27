import React from 'react';
import { PillBadge } from '../components/ui/PillBadge';
import { DaysAliveCard } from '../components/cards/DaysAliveCard';
import { SongCard } from '../components/cards/SongCard';
import { MovieCard } from '../components/cards/MovieCard';
import { MoonCard } from '../components/cards/MoonCard';
import { OnThisDayCard } from '../components/cards/OnThisDayCard';
import { MoneyCard } from '../components/cards/MoneyCard';
import { HeatmapCard } from '../components/cards/HeatmapCard';
import { StoryCard } from '../components/cards/StoryCard';
import { ZodiacCard } from '../components/capsule/cards/ZodiacCard';
import { CosmicCard } from '../components/capsule/cards/CosmicCard';
import { NamePopularityCard } from '../components/capsule/cards/NamePopularityCard';
import { LifeTimelineCard } from '../components/capsule/cards/LifeTimelineCard';
import { Share2, Users, Calendar } from 'lucide-react';
import { TimeCapsuleResponse } from '../types';

interface CapsulePageProps {
  capsule: TimeCapsuleResponse;
  onOpenCompare: () => void;
  onOpenShare: () => void;
}

export const Capsule: React.FC<CapsulePageProps> = ({
  capsule,
  onOpenCompare,
  onOpenShare
}) => {
  const { name, birth_date, stats, world, extras } = capsule;

  // Format date nicely: "May 14, 1998"
  const formattedDate = new Date(birth_date + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const payloadForStory = {
    name,
    birth_date,
    stats,
    world
  };

  const birthYear = parseInt(birth_date.split('-')[0], 10);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8 relative z-10">
      {/* Header Row: Label, Greeting H2, and Share + Compare buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2 border-b border-[#001000]">
        <div className="space-y-2">
          <PillBadge variant="accent">YOUR CAPSULE</PillBadge>
          <h2 className="font-headline text-2xl sm:text-3xl text-primary uppercase font-bold tracking-wide">
            Hey {name}, here's the world on{' '}
            <span className="text-text">{formattedDate}</span>.
          </h2>
          <div className="text-xs font-mono text-text-dim flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-accent" />
            <span>Born on a {stats.day_of_week}</span>
            <span>//</span>
            <span>{stats.weekday_rhyme}</span>
          </div>
        </div>

        {/* Buttons on the right: Share + Compare */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCompare}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#141414] hover:bg-[#1a1a1a] border border-[#001000] hover:border-accent text-xs font-headline uppercase text-text hover:text-primary transition-all cursor-pointer shadow-sm select-none"
          >
            <Users className="w-4 h-4 text-text hover:text-primary transition-colors" />
            <span>Compare</span>
          </button>

          <button
            onClick={onOpenShare}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-[#d6ff5c] text-background font-headline text-xs font-bold uppercase tracking-wider shadow-[0_0_18px_rgba(198,255,61,0.35)] transition-all cursor-pointer select-none"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Bento Grid layout: 20px radius Surface tiles, 1px border, 28-32px padding */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 1. Days alive (wide) */}
        <DaysAliveCard stats={stats} />

        {/* 2. #1 song */}
        <SongCard song={world.top_song} />

        {/* 3. Top movie */}
        <MovieCard movie={world.top_movie} />

        {/* 4. Moon phase */}
        <MoonCard moonPhase={stats.moon_phase} daysAlive={stats.days_alive} />

        {/* 5. On this day (wide) */}
        <OnThisDayCard events={world.history_highlights} />

        {/* 6. Money then vs now */}
        <MoneyCard money={world.money_machine} />

        {/* 7. Birthday heatmap (wide) */}
        <HeatmapCard birthdayPop={extras.birthday_popularity} birthDate={birth_date} />

        {/* 8. Birthday story (full width) */}
        <StoryCard initialStory={extras.birthday_story} capsulePayload={payloadForStory} />

        {/* Supplementary Data Science Portfolio Cards */}
        <ZodiacCard
          westernZodiac={stats.western_zodiac}
          chineseZodiac={stats.chinese_zodiac}
          birthstone={stats.birthstone}
        />
        <CosmicCard
          earthOrbits={stats.earth_orbits}
          spaceDistanceKm={stats.space_distance_km}
          moonTrips={stats.moon_trips}
        />
        <NamePopularityCard
          namePop={extras.name_popularity}
          birthYear={birthYear}
        />
        <LifeTimelineCard timeline={extras.life_timeline} />
      </div>
    </div>
  );
};
