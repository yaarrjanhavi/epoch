import pytest
from datetime import date, datetime
from app.services.stats_calc import (
    compute_life_stats, get_western_zodiac, get_chinese_zodiac, calculate_age_percentile
)
from app.services.astronomy import get_moon_phase, calculate_cosmic_stats
from app.services.compare import compare_two_dates

def test_life_stats_computation():
    birth_dt = date(2000, 1, 1)
    fixed_now = datetime(2026, 1, 1, 12, 0, 0)
    
    stats = compute_life_stats(birth_dt, now_dt=fixed_now)
    
    # 2000 to 2026 is 26 years, including leap years 2000, 2004, 2008, 2012, 2016, 2020, 2024 (7 leap years)
    # 26 * 365 + 7 = 9497 days
    assert stats.days_alive == 9497
    assert stats.hours_alive > 9497 * 24
    assert stats.heartbeats_est > 0
    assert stats.breaths_est > 0
    assert stats.day_of_week == "Saturday"
    assert "Saturday's child" in stats.weekday_rhyme

def test_leap_year_birthday():
    # Born on Feb 29, 2000
    leap_bday = date(2000, 2, 29)
    # Check in a non-leap year (e.g. 2025)
    now_dt = datetime(2025, 3, 1, 12, 0, 0)
    stats = compute_life_stats(leap_bday, now_dt=now_dt)
    
    # Next birthday should not crash and should resolve cleanly
    assert stats.next_birthday_days > 0
    assert stats.next_birthday_date is not None

def test_western_zodiac_coverage():
    assert get_western_zodiac(3, 25).sign == "Aries"
    assert get_western_zodiac(7, 4).sign == "Cancer"
    assert get_western_zodiac(10, 31).sign == "Scorpio"
    assert get_western_zodiac(1, 1).sign == "Capricorn"

def test_chinese_zodiac():
    # 1984: Wood Rat (1984 - 1900 = 84 = 7*12 -> Rat)
    cz1984 = get_chinese_zodiac(1984)
    assert cz1984.animal == "Rat"
    assert cz1984.element == "Wood"
    
    # 2000: Metal Dragon
    cz2000 = get_chinese_zodiac(2000)
    assert cz2000.animal == "Dragon"
    assert cz2000.element == "Metal"

def test_milestones_and_unlocks():
    birth_dt = date(1970, 1, 1)
    fixed_now = datetime(2026, 1, 1, 0, 0, 0)
    stats = compute_life_stats(birth_dt, now_dt=fixed_now)
    
    # In 2026, someone born in 1970 has lived > 20,000 days (56 years * 365 = 20,440 days)
    m10 = next(m for m in stats.milestones if m.target_days == 10000)
    m15 = next(m for m in stats.milestones if m.target_days == 15000)
    m20 = next(m for m in stats.milestones if m.target_days == 20000)
    
    assert m10.unlocked is True
    assert m15.unlocked is True
    assert m20.unlocked is True

def test_cosmic_stats():
    res = calculate_cosmic_stats(days_alive=1000, seconds_alive=86400000)
    assert res["earth_orbits"] > 2.7
    assert res["space_distance_km"] > 2_500_000_000
    assert res["moon_trips"] > 5000
    assert res["full_moons_seen"] == int(1000 / 29.530588)

def test_moon_phase():
    phase = get_moon_phase(date(1969, 7, 20))  # Apollo 11 moonwalk day
    assert phase.phase_name in [
        "New Moon", "Waxing Crescent", "First Quarter", "Waxing Gibbous",
        "Full Moon", "Waning Gibbous", "Last Quarter", "Waning Crescent"
    ]
    assert 0.0 <= phase.illumination_pct <= 100.0

def test_age_percentile():
    assert calculate_age_percentile(0) == 0.0
    assert calculate_age_percentile(30.5) == 50.0  # UN median age
    assert calculate_age_percentile(80) > 90.0

def test_compare_two_dates():
    d1 = date(1995, 5, 10)
    d2 = date(1998, 8, 20)
    res = compare_two_dates("Alice", d1, "Bob", d2)
    
    assert res.older_person == "Alice"
    assert res.age_difference_days > 0
    assert res.combined_days_lived > 0
    assert res.next_combined_milestone_days > res.combined_days_lived
    assert res.cosmic_distance_diff_km > 0
