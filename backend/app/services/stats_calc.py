from datetime import datetime, date, timedelta
from typing import List, Dict, Any, Optional
from ..models.capsule import (
    LifeStats, Milestone, ZodiacInfo, ChineseZodiacInfo, BirthstoneInfo
)
from .astronomy import get_moon_phase, calculate_cosmic_stats

WEEKDAY_RHYMES = {
    "Monday": "Monday's child is fair of face — observant, sharp, and quick to notice wonder.",
    "Tuesday": "Tuesday's child is full of grace — poised, steady, and resilient through changes.",
    "Wednesday": "Wednesday's child is full of woe (and wit) — deep, questioning, and brilliantly curious.",
    "Thursday": "Thursday's child has far to go — ambitious, visionary, and a traveler at heart.",
    "Friday": "Friday's child is loving and giving — warm-hearted, artistic, and generous of spirit.",
    "Saturday": "Saturday's child works hard for a living — tenacious, dedicated, and a master craftsperson.",
    "Sunday": "Sunday's child is bonny and blithe, good and gay — joyful, bright, and an uplifting presence."
}

WESTERN_ZODIAC = [
    ("Capricorn", "♑", "Earth", (1, 1), (1, 19), "Strategic, grounded, and possessing quiet determination to reach mountain summits."),
    ("Aquarius", "♒", "Air", (1, 20), (2, 18), "Inventive, eccentric, and always tuned into the frequency of the future."),
    ("Pisces", "♓", "Water", (2, 19), (3, 20), "Empathic, dreamy, and attuned to the subtle currents between thoughts."),
    ("Aries", "♈", "Fire", (3, 21), (4, 19), "Trailblazing, fearless, and brimming with uncontainable catalytic spark."),
    ("Taurus", "♉", "Earth", (4, 20), (5, 20), "Sensory, dependable, and a lover of timeless craft and earthly joys."),
    ("Gemini", "♊", "Air", (5, 21), (6, 20), "Inquisitive, communicative, and forever weaving connections between ideas."),
    ("Cancer", "♋", "Water", (6, 21), (7, 22), "Intuitive, protective, and anchoring deep emotional tides with memory."),
    ("Leo", "♌", "Fire", (7, 23), (8, 22), "Warm-hearted, magnetic, and radiating unmistakable solar energy."),
    ("Virgo", "♍", "Earth", (8, 23), (9, 22), "Analytical, generous with help, and bringing elegant clarity to complex systems."),
    ("Libra", "♎", "Air", (9, 23), (10, 22), "Harmonious, aesthetic, and an instinctive seeker of poise and fairness."),
    ("Scorpio", "♏", "Water", (10, 23), (11, 21), "Perceptive, transformative, and unafraid of life's deepest mysteries."),
    ("Sagittarius", "♐", "Fire", (11, 22), (12, 21), "Philosophical, optimistic, and shooting arrows toward distant horizons."),
    ("Capricorn", "♑", "Earth", (12, 22), (12, 31), "Strategic, grounded, and possessing quiet determination to reach mountain summits.")
]

CHINESE_ANIMALS = [
    ("Rat", "Resourceful, quick-witted, and naturally charming."),
    ("Ox", "Steadfast, patient, and methodical builder of enduring foundations."),
    ("Tiger", "Brave, magnetic, and fiercely protective of those you cherish."),
    ("Rabbit", "Gentle, elegant, and skilled at peaceful navigation."),
    ("Dragon", "Visionary, passionate, and blessed with natural authority."),
    ("Snake", "Wise, intuitive, and deeply observant behind quiet grace."),
    ("Horse", "Energetic, independent, and longing for open fields and discovery."),
    ("Goat", "Empathetic, artistic, and peaceful creator of harmony."),
    ("Monkey", "Inventive, agile-minded, and an infectious problem-solver."),
    ("Rooster", "Precise, punctual, and courageous in speaking truth."),
    ("Dog", "Loyal, honest, and an unshakeable guardian of justice."),
    ("Pig", "Warm-hearted, compassionate, and generous to a fault.")
]

CHINESE_ELEMENTS = ["Wood", "Fire", "Earth", "Metal", "Water"]

BIRTHSTONES = {
    1: ("Garnet", "#9A1B1B", "Sign of constancy, eternal friendship, and enduring energy."),
    2: ("Amethyst", "#9966CC", "Sign of clarity, serenity, and tranquil contemplation."),
    3: ("Aquamarine", "#7FFFD4", "Sign of courage, clear waters, and joyful communication."),
    4: ("Diamond", "#E0F7FA", "Sign of invincibility, everlasting strength, and pure light."),
    5: ("Emerald", "#50C878", "Sign of rebirth, wisdom, and flourishing spring life."),
    6: ("Alexandrite", "#85BB65", "Sign of adaptability, magic, and transformation."),
    7: ("Ruby", "#E0115F", "Sign of passion, vitality, and courageous nobility."),
    8: ("Peridot", "#E6E200", "Sign of lighthearted humor, warmth, and friendly spirit."),
    9: ("Sapphire", "#0F52BA", "Sign of truth, celestial depth, and steadfast wisdom."),
    10: ("Opal", "#FDF4E3", "Sign of creative spectrums, wonder, and shimmering hope."),
    11: ("Topaz", "#FFC87C", "Sign of warmth, radiant friendship, and optimism."),
    12: ("Tanzanite", "#495886", "Sign of rare brilliance, intuition, and heartfelt purpose.")
}

COUNTRY_LIFE_EXPECTANCY = {
    "Worldwide": 73.4,
    "United States": 79.1,
    "United Kingdom": 81.2,
    "Canada": 82.5,
    "Australia": 83.2,
    "Japan": 84.6,
    "Germany": 81.0,
    "France": 82.5,
    "India": 70.8,
    "Brazil": 76.2,
    "China": 78.2,
    "Italy": 83.0,
    "Spain": 83.3,
    "Mexico": 75.4,
    "South Africa": 65.3
}

def get_western_zodiac(month: int, day: int) -> ZodiacInfo:
    for sign, symbol, elem, (sm, sd), (em, ed), blurb in WESTERN_ZODIAC:
        if (month == sm and day >= sd) or (month == em and day <= ed):
            date_range = f"{sm}/{sd} – {em}/{ed}"
            return ZodiacInfo(
                sign=sign,
                symbol=symbol,
                element=elem,
                dates=date_range,
                blurb=blurb
            )
    return ZodiacInfo(
        sign="Capricorn", symbol="♑", element="Earth", dates="12/22 – 1/19",
        blurb="Strategic, grounded, and possessing quiet determination to reach mountain summits."
    )

def get_chinese_zodiac(year: int) -> ChineseZodiacInfo:
    # 1900 was Year of the Metal Rat (Rat is index 0 relative to 1900)
    # The animal cycle: (year - 1900) % 12
    animal_idx = (year - 1900) % 12
    animal, blurb = CHINESE_ANIMALS[animal_idx]
    
    # The 10 Heavenly Stems element cycle: 2 years per element (Wood, Fire, Earth, Metal, Water)
    # 1900 was Metal. Index: Metal is 3 in [Wood, Fire, Earth, Metal, Water]
    element_idx = ((year - 1900) // 2 + 3) % 5
    elem = CHINESE_ELEMENTS[element_idx]
    
    yin_yang = "Yang" if (year % 2 == 0) else "Yin"

    return ChineseZodiacInfo(
        animal=animal,
        element=elem,
        yin_yang=yin_yang,
        blurb=f"The {elem} {animal} ({yin_yang}): {blurb}"
    )

def calculate_age_percentile(age_years: float) -> float:
    """Computes what percentage of the world population is younger than this age.
    Derived from UN World Population Prospects global median age (~30.5) and demographic pyramid."""
    if age_years <= 0:
        return 0.0
    if age_years >= 100:
        return 99.9

    # UN demographic distribution model
    # Age 0..14 is ~25%, Age 15..24 is ~15%, Age 25..35 is ~16%, Age 36..50 is ~19%,
    # Age 51..65 is ~14%, Age 66..80 is ~8%, Age 80+ is ~3%
    if age_years <= 15:
        pct = (age_years / 15.0) * 25.0
    elif age_years <= 30.5:
        pct = 25.0 + ((age_years - 15.0) / 15.5) * 25.0  # Median 30.5 reaches 50%
    elif age_years <= 50:
        pct = 50.0 + ((age_years - 30.5) / 19.5) * 22.0
    elif age_years <= 65:
        pct = 72.0 + ((age_years - 50.0) / 15.0) * 15.0
    elif age_years <= 80:
        pct = 87.0 + ((age_years - 65.0) / 15.0) * 9.0
    else:
        pct = 96.0 + min(3.9, ((age_years - 80.0) / 20.0) * 3.9)

    return round(pct, 1)

def compute_life_stats(birth_dt: date, now_dt: Optional[datetime] = None, country: str = "Worldwide") -> LifeStats:
    if now_dt is None:
        now_dt = datetime.now()

    birth_start = datetime(birth_dt.year, birth_dt.month, birth_dt.day, 0, 0, 0)
    delta = now_dt - birth_start

    days_alive = max(0, delta.days)
    total_seconds = max(0, int(delta.total_seconds()))
    hours_alive = total_seconds // 3600
    minutes_alive = total_seconds // 60

    # Estimated biological beats & breaths
    # Average 80 bpm = 115,200 beats per day
    # Average 16 breaths per min = 23,040 breaths per day
    heartbeats_est = int(days_alive * 115200 + (total_seconds % 86400) * 1.333)
    breaths_est = int(days_alive * 23040 + (total_seconds % 86400) * 0.267)

    # Weekday born
    day_of_week = birth_dt.strftime("%A")
    weekday_rhyme = WEEKDAY_RHYMES.get(day_of_week, f"Born on a {day_of_week}: a magnificent day to enter the world.")

    # Next birthday calculation
    today_date = now_dt.date()
    try:
        this_year_bday = date(today_date.year, birth_dt.month, birth_dt.day)
    except ValueError:
        # Leap day (Feb 29) on non-leap year celebrated Feb 28
        this_year_bday = date(today_date.year, 2, 28)

    if this_year_bday < today_date:
        try:
            next_bday = date(today_date.year + 1, birth_dt.month, birth_dt.day)
        except ValueError:
            next_bday = date(today_date.year + 1, 2, 28)
        last_bday = this_year_bday
    else:
        next_bday = this_year_bday
        try:
            last_bday = date(today_date.year - 1, birth_dt.month, birth_dt.day)
        except ValueError:
            last_bday = date(today_date.year - 1, 2, 28)

    next_birthday_days = (next_bday - today_date).days
    next_birthday_date = next_bday.strftime("%B %d, %Y")
    next_birthday_weekday = next_bday.strftime("%A")

    # Progress through current age year (0.0 to 100.0%)
    year_span = (next_bday - last_bday).days
    days_since_last_bday = (today_date - last_bday).days
    year_progress_pct = round(min(100.0, max(0.0, (days_since_last_bday / year_span) * 100.0)), 1)

    # Milestones (10k, 15k, 20k days alive)
    milestones: List[Milestone] = []
    for target in [10000, 15000, 20000]:
        target_date = birth_dt + timedelta(days=target)
        unlocked = days_alive >= target
        remaining = None if unlocked else (target - days_alive)
        milestones.append(Milestone(
            title=f"{target:,}th Day on Earth",
            target_days=target,
            date_achieved=target_date.strftime("%B %d, %Y"),
            unlocked=unlocked,
            days_remaining=remaining
        ))

    # Half birthday date (~182 days offset from birthdate)
    half_bday = birth_dt + timedelta(days=182)
    half_birthday_date = half_bday.strftime("%B %d")

    # Cosmic stats (astronomy)
    cosmic = calculate_cosmic_stats(days_alive, total_seconds)
    moon_phase = get_moon_phase(birth_dt)

    # Zodiac & Birthstone
    w_zodiac = get_western_zodiac(birth_dt.month, birth_dt.day)
    c_zodiac = get_chinese_zodiac(birth_dt.year)
    b_stone_raw = BIRTHSTONES.get(birth_dt.month, ("Topaz", "#FFC87C", "Sign of radiant warmth."))
    birthstone = BirthstoneInfo(gem=b_stone_raw[0], color=b_stone_raw[1], meaning=b_stone_raw[2])

    # Demographics & Life Expectancy
    age_years = days_alive / 365.25
    older_pct = calculate_age_percentile(age_years)
    life_exp = COUNTRY_LIFE_EXPECTANCY.get(country, COUNTRY_LIFE_EXPECTANCY["Worldwide"])
    life_progress = round(min(100.0, (age_years / life_exp) * 100.0), 1)

    return LifeStats(
        birth_date=birth_dt.isoformat(),
        days_alive=days_alive,
        hours_alive=hours_alive,
        minutes_alive=minutes_alive,
        seconds_alive=total_seconds,
        heartbeats_est=heartbeats_est,
        breaths_est=breaths_est,
        day_of_week=day_of_week,
        weekday_rhyme=weekday_rhyme,
        next_birthday_date=next_birthday_date,
        next_birthday_days=next_birthday_days,
        next_birthday_weekday=next_birthday_weekday,
        year_progress_pct=year_progress_pct,
        milestones=milestones,
        half_birthday_date=half_birthday_date,
        earth_orbits=cosmic["earth_orbits"],
        space_distance_km=cosmic["space_distance_km"],
        moon_trips=cosmic["moon_trips"],
        moon_phase=moon_phase,
        full_moons_seen=cosmic["full_moons_seen"],
        western_zodiac=w_zodiac,
        chinese_zodiac=c_zodiac,
        birthstone=birthstone,
        older_than_world_pct=older_pct,
        life_expectancy_years=life_exp,
        life_progress_pct=life_progress,
        country_selected=country
    )
