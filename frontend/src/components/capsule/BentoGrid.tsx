import React from 'react';
import { TimeCapsuleResponse } from '../../types';
import { LifeCountersCard } from './cards/LifeCountersCard';
import { NextBirthdayCard } from './cards/NextBirthdayCard';
import { MilestonesCard } from './cards/MilestonesCard';
import { CosmicCard } from './cards/CosmicCard';
import { MoonPhaseCard } from './cards/MoonPhaseCard';
import { ZodiacCard } from './cards/ZodiacCard';
import { AgePercentileCard } from './cards/AgePercentileCard';
import { TopSongCard } from './cards/TopSongCard';
import { TopMovieCard } from './cards/TopMovieCard';
import { HistoryCard } from './cards/HistoryCard';
import { BirthdayTwinsCard } from './cards/BirthdayTwinsCard';
import { WorldLeadersCard } from './cards/WorldLeadersCard';
import { MoneyMachineCard } from './cards/MoneyMachineCard';
import { WorldPopCard } from './cards/WorldPopCard';
import { HistoricalWeatherCard } from './cards/HistoricalWeatherCard';
import { BirthdayHeatmapCard } from './cards/BirthdayHeatmapCard';
import { NamePopularityCard } from './cards/NamePopularityCard';
import { LifeTimelineCard } from './cards/LifeTimelineCard';
import { ThenVsNowCard } from './cards/ThenVsNowCard';
import { BirthdayStoryCard } from './cards/BirthdayStoryCard';

interface BentoGridProps {
  capsule: TimeCapsuleResponse;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ capsule }) => {
  const { stats, world, extras, name, birth_date, country } = capsule;
  const parts = birth_date.split('-');
  const birthYear = parseInt(parts[0], 10);
  const birthMonth = parseInt(parts[1], 10);
  const birthDay = parseInt(parts[2], 10);

  const payloadForStory = {
    name,
    birth_date,
    stats,
    world
  };

  return (
    <div className="space-y-6">
      {/* SECTION 1: PERSONAL LIFE ORBIT & BIOLOGICAL METRICS */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-primary" />
          <h2 className="font-headline text-xs uppercase tracking-widest text-text-dim">
            // 01. LIFE STATISTICS & TEMPORAL COUNTERS
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <LifeCountersCard
            initialSeconds={stats.seconds_alive}
            weekday={stats.day_of_week}
            weekdayRhyme={stats.weekday_rhyme}
          />
          <NextBirthdayCard
            nextBirthdayDate={stats.next_birthday_date}
            daysRemaining={stats.next_birthday_days}
            weekday={stats.next_birthday_weekday}
            yearProgressPct={stats.year_progress_pct}
          />
          <MilestonesCard
            milestones={stats.milestones}
            halfBirthday={stats.half_birthday_date}
          />
          <CosmicCard
            earthOrbits={stats.earth_orbits}
            spaceDistanceKm={stats.space_distance_km}
            moonTrips={stats.moon_trips}
          />
          <MoonPhaseCard
            moonPhase={stats.moon_phase}
            fullMoonsSeen={stats.full_moons_seen}
          />
          <ZodiacCard
            westernZodiac={stats.western_zodiac}
            chineseZodiac={stats.chinese_zodiac}
            birthstone={stats.birthstone}
          />
          <AgePercentileCard
            olderThanPct={stats.older_than_world_pct}
            lifeProgressPct={stats.life_progress_pct}
            lifeExpectancyYears={stats.life_expectancy_years}
            country={country}
          />
        </div>
      </div>

      {/* SECTION 2: THE WORLD ON THAT DAY */}
      <div className="pt-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-accent" />
          <h2 className="font-headline text-xs uppercase tracking-widest text-text-dim">
            // 02. THE PLANET ON YOUR ARRIVAL
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <TopSongCard song={world.top_song} />
          <TopMovieCard movie={world.top_movie} />
          {world.weather && <HistoricalWeatherCard weather={world.weather} />}
          <HistoryCard events={world.history_highlights} />
          <BirthdayTwinsCard twins={world.birthday_twins} />
          <WorldLeadersCard leaders={world.world_leaders} />
          <WorldPopCard
            populationThen={world.world_population_then}
            populationNow={world.world_population_now}
            birthYear={birthYear}
          />
          {world.money_machine && <MoneyMachineCard money={world.money_machine} />}
        </div>
      </div>

      {/* SECTION 3: DATA SCIENCE PORTFOLIO EXTRAS */}
      <div className="pt-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-primary" />
          <h2 className="font-headline text-xs uppercase tracking-widest text-text-dim">
            // 03. STATISTICAL DISTRIBUTIONS & NARRATIVE
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <BirthdayHeatmapCard
            birthdayPop={extras.birthday_popularity}
            birthMonth={birthMonth}
            birthDay={birthDay}
          />
          <NamePopularityCard
            namePop={extras.name_popularity}
            birthYear={birthYear}
          />
          <ThenVsNowCard thenVsNow={extras.then_vs_now} />
          <LifeTimelineCard timeline={extras.life_timeline} />
          <BirthdayStoryCard
            initialStory={extras.birthday_story}
            capsulePayload={payloadForStory}
          />
        </div>
      </div>
    </div>
  );
};
