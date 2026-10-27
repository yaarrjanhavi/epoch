import math
from datetime import datetime, date
import ephem
from ..models.capsule import MoonPhaseInfo

def get_moon_phase(dt: date) -> MoonPhaseInfo:
    """Calculates moon phase, illumination %, age in days, and name on given date."""
    try:
        # ephem date representation
        ephem_date = ephem.Date(dt.strftime("%Y/%m/%d 12:00:00"))
        moon = ephem.Moon(ephem_date)
        sun = ephem.Sun(ephem_date)
        
        # Elongation angle between sun and moon
        elongation = ephem.separation(moon, sun)
        # Phase (illumination fraction 0.0 to 1.0)
        phase_fraction = moon.phase / 100.0
        
        # Moon age in days (synodic cycle is ~29.530588 days)
        # Previous new moon
        prev_new = ephem.previous_new_moon(ephem_date)
        moon_age_days = round(float(ephem_date - prev_new), 1)
        if moon_age_days < 0:
            moon_age_days += 29.53
    except Exception:
        # Reliable trigonometric fallback based on known reference new moon
        # Reference new moon: Jan 6, 2000 18:14 UTC
        ref = datetime(2000, 1, 6, 18, 14)
        target = datetime(dt.year, dt.month, dt.day, 12, 0)
        diff_days = (target - ref).total_seconds() / 86400.0
        moon_age_days = round(diff_days % 29.530588, 1)
        # Illumination estimate
        phase_fraction = 0.5 * (1 - math.cos(2 * math.pi * moon_age_days / 29.530588))

    illumination_pct = round(phase_fraction * 100.0, 1)

    # Classify phase name based on age in 29.53-day cycle
    age = moon_age_days % 29.530588
    if age < 1.84:
        phase_name = "New Moon"
        description = "A dark sky: the Moon sat invisibly between the Earth and the Sun."
    elif age < 5.53:
        phase_name = "Waxing Crescent"
        description = "A delicate sliver of silvery light smiling low in the evening twilight."
    elif age < 9.22:
        phase_name = "First Quarter"
        description = "Exactly half-illuminated in the right side, rising around noon."
    elif age < 12.92:
        phase_name = "Waxing Gibbous"
        description = "Swelling with golden brilliance, nearly complete before the night."
    elif age < 16.61:
        phase_name = "Full Moon"
        description = "A radiant, fully illuminated orb casting soft silver shadows on Earth."
    elif age < 20.30:
        phase_name = "Waning Gibbous"
        description = "A generous, waning glow rising later into the quiet night."
    elif age < 23.99:
        phase_name = "Last Quarter"
        description = "The left half lit, high in the predawn sky as morning approached."
    else:
        phase_name = "Waning Crescent"
        description = "A slender, graceful crescent bidding farewell just before sunrise."

    return MoonPhaseInfo(
        phase_name=phase_name,
        illumination_pct=illumination_pct,
        age_days=moon_age_days,
        description=description
    )

def calculate_cosmic_stats(days_alive: int, seconds_alive: int):
    """Calculates Earth orbits and cosmic distance traveled through space."""
    # Earth orbital velocity around Sun is ~29.78 km/s
    # Average Earth-Moon distance is ~384,400 km
    # Synodic lunar month is ~29.530588 days
    orbits = round(days_alive / 365.2422, 2)
    # Distance in km = seconds * 29.78 km/s
    distance_km = round(seconds_alive * 29.78, 0)
    # Earth-Moon round trips (~768,800 km) or one-way (~384,400 km)
    moon_trips = round(distance_km / 384400.0, 0)
    full_moons = int(days_alive / 29.530588)

    return {
        "earth_orbits": orbits,
        "space_distance_km": distance_km,
        "moon_trips": moon_trips,
        "full_moons_seen": full_moons
    }
