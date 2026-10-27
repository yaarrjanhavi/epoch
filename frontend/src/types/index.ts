export interface Milestone {
  title: string;
  target_days: number;
  date_achieved: string;
  unlocked: boolean;
  days_remaining?: number;
}

export interface ZodiacInfo {
  sign: string;
  symbol: string;
  element: string;
  dates: string;
  blurb: string;
}

export interface ChineseZodiacInfo {
  animal: string;
  element: string;
  yin_yang: string;
  blurb: string;
}

export interface BirthstoneInfo {
  gem: string;
  color: string;
  meaning: string;
}

export interface MoonPhaseInfo {
  phase_name: string;
  illumination_pct: number;
  age_days: number;
  description: string;
}

export interface LifeStats {
  birth_date: string;
  days_alive: number;
  hours_alive: number;
  minutes_alive: number;
  seconds_alive: number;
  heartbeats_est: number;
  breaths_est: number;
  day_of_week: string;
  weekday_rhyme: string;
  next_birthday_date: string;
  next_birthday_days: number;
  next_birthday_weekday: string;
  year_progress_pct: number;
  milestones: Milestone[];
  half_birthday_date: string;
  earth_orbits: number;
  space_distance_km: number;
  moon_trips: number;
  moon_phase: MoonPhaseInfo;
  full_moons_seen: number;
  western_zodiac: ZodiacInfo;
  chinese_zodiac: ChineseZodiacInfo;
  birthstone: BirthstoneInfo;
  older_than_world_pct: number;
  life_expectancy_years: number;
  life_progress_pct: number;
  country_selected?: string;
}

export interface SongInfo {
  title: string;
  artist: string;
  chart_date: string;
  is_exact_week: boolean;
  fallback_note?: string;
  youtube_url: string;
  spotify_url: string;
}

export interface MovieInfo {
  week_title: string;
  year_title: string;
  year: number;
  trivia: string;
}

export interface HistoryEvent {
  year: number;
  text: string;
  category: string;
  link?: string;
}

export interface BirthdayTwin {
  name: string;
  year: number;
  description: string;
}

export interface WorldLeader {
  office: string;
  name: string;
  country: string;
}

export interface PriceItem {
  item: string;
  price_then: string;
  price_now: string;
  unit: string;
}

export interface MoneyMachine {
  base_year: number;
  current_year: number;
  cumulative_inflation_pct: number;
  currency_code: string;
  currency_symbol: string;
  usd_rate: number;
  prices: PriceItem[];
}

export interface HistoricalWeather {
  city: string;
  country: string;
  date: string;
  temp_max_c: number;
  temp_min_c: number;
  condition: string;
  icon_type: string;
}

export interface BirthdayPopularity {
  rank: number;
  total_dates: number;
  rarity_percentile: number;
  is_leap_day: boolean;
  summary: string;
}

export interface NameRankPoint {
  year: number;
  rank: number;
  count: number;
}

export interface NamePopularity {
  name: string;
  found: boolean;
  peak_year: number;
  rank_in_birth_year?: number;
  historical_curve: NameRankPoint[];
}

export interface LifeTimelineEvent {
  year: number;
  age: number;
  user_milestone: string;
  world_event: string;
  category: string;
}

export interface WorldThenVsNow {
  birth_year: number;
  current_year: number;
  population_then: string;
  population_now: string;
  internet_users_pct_then: number;
  internet_users_pct_now: number;
  life_expectancy_then: number;
  life_expectancy_now: number;
  gdp_per_capita_then: string;
  gdp_per_capita_now: string;
}

export interface WorldOnDay {
  top_song?: SongInfo;
  top_movie?: MovieInfo;
  history_highlights: HistoryEvent[];
  birthday_twins: BirthdayTwin[];
  world_leaders: WorldLeader[];
  monthly_headlines: string[];
  sports_champion?: {
    event: string;
    winner: string;
    details: string;
  };
  tech_of_the_time?: {
    gadget: string;
    description: string;
    internet_users_pct: number;
  };
  money_machine?: MoneyMachine;
  world_population_then: number;
  world_population_now: number;
  weather?: HistoricalWeather;
}

export interface DataScienceExtras {
  birthday_popularity: BirthdayPopularity;
  name_popularity: NamePopularity;
  life_timeline: LifeTimelineEvent[];
  then_vs_now: WorldThenVsNow;
  birthday_story?: string;
}

export interface TimeCapsuleResponse {
  name: string;
  birth_date: string;
  country: string;
  stats: LifeStats;
  world: WorldOnDay;
  extras: DataScienceExtras;
}

export interface CompareResponse {
  person1_name: string;
  person1_date: string;
  person2_name: string;
  person2_date: string;
  older_person: string;
  age_difference_days: number;
  age_difference_years: number;
  combined_days_lived: number;
  next_combined_milestone_days: number;
  next_combined_milestone_date: string;
  same_weekday: boolean;
  weekday_shared?: string;
  same_western_zodiac: boolean;
  same_chinese_zodiac: boolean;
  cosmic_distance_diff_km: number;
  shared_milestones: {
    title: string;
    date: string;
    description: string;
  }[];
  fun_synastry_blurb: string;
}
