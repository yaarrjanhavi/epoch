from datetime import date, datetime, timedelta
from typing import List
from ..models.compare import CompareResponse, MilestoneAlignment
from .stats_calc import get_western_zodiac, get_chinese_zodiac

def compare_two_dates(name1: str, d1: date, name2: str, d2: date) -> CompareResponse:
    today = date.today()

    p1_days = max(0, (today - d1).days)
    p2_days = max(0, (today - d2).days)

    if d1 < d2:
        older = name1
        diff_days = (d2 - d1).days
    elif d2 < d1:
        older = name2
        diff_days = (d1 - d2).days
    else:
        older = "Cosmic Twins (Same Day!)"
        diff_days = 0

    diff_years = round(diff_days / 365.25, 2)
    combined_days = p1_days + p2_days

    # Next combined milestone (rounded up to next 5,000 or 10,000 days)
    # Since both people age 1 day per calendar day, combined days grow by 2 each day!
    next_milestone_target = ((combined_days // 5000) + 1) * 5000
    days_to_milestone = (next_milestone_target - combined_days)
    # Calendar days needed = days_to_milestone / 2
    calendar_days_needed = (days_to_milestone + 1) // 2
    next_milestone_date = (today + timedelta(days=calendar_days_needed)).strftime("%B %d, %Y")

    # Shared weekday
    w1 = d1.strftime("%A")
    w2 = d2.strftime("%A")
    same_weekday = (w1 == w2)

    # Shared zodiacs
    z1 = get_western_zodiac(d1.month, d1.day)
    z2 = get_western_zodiac(d2.month, d2.day)
    same_w_zodiac = (z1.sign == z2.sign)

    cz1 = get_chinese_zodiac(d1.year)
    cz2 = get_chinese_zodiac(d2.year)
    same_c_zodiac = (cz1.animal == cz2.animal)

    # Cosmic distance diff (approx 29.78 km/s * 86400 = ~2.57 million km/day)
    cosmic_diff_km = round(diff_days * 86400 * 29.78, 0)

    # Shared milestones alignment
    shared: List[MilestoneAlignment] = []
    
    # 1. First shared day on Earth
    first_shared_date = max(d1, d2)
    shared.append(MilestoneAlignment(
        title="First Coexisting Day on Earth",
        date=first_shared_date.strftime("%B %d, %Y"),
        description=f"The very first sunrise {name1} and {name2} both walked the same planet."
    ))

    # 2. Combined 10,000 / 20,000 / 30,000 days
    milestone_combined_date = today - timedelta(days=(combined_days - 10000) // 2) if combined_days >= 10000 else today + timedelta(days=(10000 - combined_days) // 2)
    shared.append(MilestoneAlignment(
        title="Combined 10,000 Days Lived",
        date=milestone_combined_date.strftime("%B %d, %Y"),
        description=f"{name1} and {name2} collectively logged 10,000 rotations of planet Earth."
    ))

    # Synastry blurb
    blurbs = []
    if diff_days == 0:
        blurbs.append(f"Incredible! {name1} and {name2} entered the universe on the exact same date.")
    else:
        blurbs.append(f"{older} has a {diff_days:,}-day head start exploring the solar system.")

    if same_weekday:
        blurbs.append(f"Both born on a {w1}—cosmically synchronized rhythm!")
    if same_w_zodiac:
        blurbs.append(f"Both share the sign of {z1.sign} ({z1.symbol}).")
    if same_c_zodiac:
        blurbs.append(f"Both share the Chinese Zodiac Year of the {cz1.animal}.")

    fun_blurb = " ".join(blurbs)

    return CompareResponse(
        person1_name=name1,
        person1_date=d1.isoformat(),
        person2_name=name2,
        person2_date=d2.isoformat(),
        older_person=older,
        age_difference_days=diff_days,
        age_difference_years=diff_years,
        combined_days_lived=combined_days,
        next_combined_milestone_days=next_milestone_target,
        next_combined_milestone_date=next_milestone_date,
        same_weekday=same_weekday,
        weekday_shared=w1 if same_weekday else None,
        same_western_zodiac=same_w_zodiac,
        same_chinese_zodiac=same_c_zodiac,
        cosmic_distance_diff_km=cosmic_diff_km,
        shared_milestones=shared,
        fun_synastry_blurb=fun_blurb
    )
