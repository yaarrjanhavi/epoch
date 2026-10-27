from typing import List, Optional
from pydantic import BaseModel


class MilestoneAlignment(BaseModel):
    title: str
    date: str
    description: str


class CompareResponse(BaseModel):
    person1_name: str
    person1_date: str
    person2_name: str
    person2_date: str
    older_person: str
    age_difference_days: int
    age_difference_years: float
    combined_days_lived: int
    next_combined_milestone_days: int
    next_combined_milestone_date: str
    same_weekday: bool
    weekday_shared: Optional[str] = None
    same_western_zodiac: bool
    same_chinese_zodiac: bool
    cosmic_distance_diff_km: float
    shared_milestones: List[MilestoneAlignment]
    fun_synastry_blurb: str
