from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field


class Milestone(BaseModel):
    title: str
    target_days: int
    date_achieved: str
    unlocked: bool
    days_remaining: Optional[int] = None


class ZodiacInfo(BaseModel):
    sign: str
    symbol: str
    element: str
    dates: str
    blurb: str


class ChineseZodiacInfo(BaseModel):
    animal: str
    element: str
    yin_yang: str
    blurb: str


class BirthstoneInfo(BaseModel):
    gem: str
    color: str
    meaning: str


class MoonPhaseInfo(BaseModel):
    phase_name: str
    illumination_pct: float
    age_days: float
    description: str


class LifeStats(BaseModel):
    birth_date: str
    days_alive: int
    hours_alive: int
    minutes_alive: int
    seconds_alive: int
    heartbeats_est: int
    breaths_est: int
    day_of_week: str
    weekday_rhyme: str
    next_birthday_date: str
    next_birthday_days: int
    next_birthday_weekday: str
    year_progress_pct: float
    milestones: List[Milestone]
    half_birthday_date: str
    earth_orbits: float
    space_distance_km: float
    moon_trips: float
    moon_phase: MoonPhaseInfo
    full_moons_seen: int
    western_zodiac: ZodiacInfo
    chinese_zodiac: ChineseZodiacInfo
    birthstone: BirthstoneInfo
    older_than_world_pct: float
    life_expectancy_years: float
    life_progress_pct: float
    country_selected: Optional[str] = "Worldwide"


class SongInfo(BaseModel):
    title: str
    artist: str
    chart_date: str
    is_exact_week: bool
    fallback_note: Optional[str] = None
    youtube_url: str
    spotify_url: str


class MovieInfo(BaseModel):
    week_title: str
    year_title: str
    year: int
    trivia: str


class HistoryEvent(BaseModel):
    year: int
    text: str
    category: str  # 'event', 'birth', 'death'
    link: Optional[str] = None


class BirthdayTwin(BaseModel):
    name: str
    year: int
    description: str


class WorldLeader(BaseModel):
    office: str
    name: str
    country: str


class PriceItem(BaseModel):
    item: str
    price_then: str
    price_now: str
    unit: str


class MoneyMachine(BaseModel):
    base_year: int
    current_year: int
    cumulative_inflation_pct: float
    currency_code: str
    currency_symbol: str
    usd_rate: float
    prices: List[PriceItem]


class HistoricalWeather(BaseModel):
    city: str
    country: str
    date: str
    temp_max_c: float
    temp_min_c: float
    condition: str
    icon_type: str  # 'sunny', 'cloudy', 'rain', 'snow'


class BirthdayPopularity(BaseModel):
    rank: int
    total_dates: int
    rarity_percentile: float
    is_leap_day: bool
    summary: str


class NameRankPoint(BaseModel):
    year: int
    rank: int
    count: int


class NamePopularity(BaseModel):
    name: str
    found: bool
    peak_year: int
    rank_in_birth_year: Optional[int] = None
    historical_curve: List[NameRankPoint]


class LifeTimelineEvent(BaseModel):
    year: int
    age: int
    user_milestone: str
    world_event: str
    category: str


class WorldThenVsNow(BaseModel):
    birth_year: int
    current_year: int
    population_then: str
    population_now: str
    internet_users_pct_then: float
    internet_users_pct_now: float
    life_expectancy_then: float
    life_expectancy_now: float
    gdp_per_capita_then: str
    gdp_per_capita_now: str


class WorldOnDay(BaseModel):
    top_song: Optional[SongInfo] = None
    top_movie: Optional[MovieInfo] = None
    history_highlights: List[HistoryEvent] = []
    birthday_twins: List[BirthdayTwin] = []
    world_leaders: List[WorldLeader] = []
    monthly_headlines: List[str] = []
    sports_champion: Optional[Dict[str, str]] = None
    tech_of_the_time: Optional[Dict[str, Any]] = None
    money_machine: Optional[MoneyMachine] = None
    world_population_then: int
    world_population_now: int
    weather: Optional[HistoricalWeather] = None


class DataScienceExtras(BaseModel):
    birthday_popularity: BirthdayPopularity
    name_popularity: NamePopularity
    life_timeline: List[LifeTimelineEvent]
    then_vs_now: WorldThenVsNow
    birthday_story: Optional[str] = None


class TimeCapsuleResponse(BaseModel):
    name: str
    birth_date: str
    country: str
    stats: LifeStats
    world: WorldOnDay
    extras: DataScienceExtras
