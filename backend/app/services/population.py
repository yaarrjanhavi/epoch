import sqlite3
from typing import Tuple
from ..models.capsule import BirthdayPopularity, WorldThenVsNow
from ..config import DB_PATH

def get_birthday_rarity(month: int, day: int) -> BirthdayPopularity:
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    cursor.execute("""
    SELECT rank, rarity_percentile FROM birthday_frequency
    WHERE month = ? AND day = ?;
    """, (month, day))
    row = cursor.fetchone()
    conn.close()

    is_leap = (month == 2 and day == 29)
    if row:
        rank, rarity_pct = row[0], row[1]
    else:
        rank = 366 if is_leap else 180
        rarity_pct = 99.7 if is_leap else 50.0

    if is_leap:
        summary = "Leap Day! You possess the rarest birthday on the calendar (#366 of 366). Only 1 in 1,461 people share this date."
    elif rarity_pct > 70.0:
        summary = f"Your birthday is rarer than {rarity_pct}% of calendar dates (Rank #{rank} of 366)."
    elif rarity_pct < 30.0:
        summary = f"Your birthday is among the most popular of the year (Rank #{rank} of 366), rarer than {rarity_pct}% of dates."
    else:
        summary = f"Your birthday is rarer than {rarity_pct}% of dates (Rank #{rank} of 366)."

    return BirthdayPopularity(
        rank=rank,
        total_dates=366,
        rarity_percentile=rarity_pct,
        is_leap_day=is_leap,
        summary=summary
    )

def get_world_population(birth_year: int) -> Tuple[int, int]:
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    cursor.execute("SELECT world_population FROM population WHERE year = ?;", (birth_year,))
    row_then = cursor.fetchone()

    cursor.execute("SELECT world_population FROM population WHERE year = 2026;")
    row_now = cursor.fetchone()

    conn.close()

    pop_then = row_then[0] if row_then else 5000000000
    pop_now = row_now[0] if row_now else 8200000000
    return pop_then, pop_now

def get_then_vs_now(birth_year: int) -> WorldThenVsNow:
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    cursor.execute("""
    SELECT p.world_population, e.internet_users_pct, e.global_life_expectancy, e.world_gdp_pc_usd
    FROM population p
    JOIN economy e ON p.year = e.year
    WHERE p.year = ?;
    """, (birth_year,))
    row_then = cursor.fetchone()

    cursor.execute("""
    SELECT p.world_population, e.internet_users_pct, e.global_life_expectancy, e.world_gdp_pc_usd
    FROM population p
    JOIN economy e ON p.year = e.year
    WHERE p.year = 2026;
    """, ())
    row_now = cursor.fetchone()

    conn.close()

    if not row_then:
        row_then = (5300000000, 0.05, 75.4, 23800)
    if not row_now:
        row_now = (8200000000, 72.5, 79.5, 86000)

    def fmt_pop(val: int) -> str:
        if val >= 1000000000:
            return f"{val / 1000000000:.2f} Billion"
        return f"{val / 1000000:.1f} Million"

    return WorldThenVsNow(
        birth_year=birth_year,
        current_year=2026,
        population_then=fmt_pop(row_then[0]),
        population_now=fmt_pop(row_now[0]),
        internet_users_pct_then=row_then[1],
        internet_users_pct_now=row_now[1],
        life_expectancy_then=row_then[2],
        life_expectancy_now=row_now[2],
        gdp_per_capita_then=f"${int(row_then[3]):,}",
        gdp_per_capita_now=f"${int(row_now[3]):,}"
    )
