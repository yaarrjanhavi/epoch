import asyncio
from datetime import date, datetime
from typing import Optional, Dict, Any
from fastapi import FastAPI, Query, HTTPException, Request, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from .models.capsule import (
    TimeCapsuleResponse, LifeStats, WorldOnDay, DataScienceExtras
)
from .models.compare import CompareResponse
from .services.stats_calc import compute_life_stats
from .services.billboard import get_top_song
from .services.boxoffice import get_top_movie
from .services.wikimedia import fetch_on_this_day
from .services.weather import fetch_historical_weather
from .services.economy import get_money_machine
from .services.names import get_name_popularity
from .services.population import get_birthday_rarity, get_world_population, get_then_vs_now
from .services.culture import get_world_leaders, get_culture_and_sports, generate_life_timeline
from .services.story import generate_birthday_story
from .services.compare import compare_two_dates
from .services.cache import global_cache

app = FastAPI(
    title="EPOCH API",
    description="Backend services for EPOCH — Personalized Retro-Terminal Time Capsule",
    version="1.0.0"
)

# Enable CORS for frontend Vite dev server and production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def parse_and_validate_date(date_str: str) -> date:
    try:
        dt = date.fromisoformat(date_str)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid date format. Expected YYYY-MM-DD.")
    
    if dt.year < 1900:
        raise HTTPException(status_code=400, detail="Birthdate must be 1900 or later.")
    
    today = date.today()
    if dt > today:
        raise HTTPException(status_code=400, detail="Birthdate must be in the past.")

    return dt

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "app": "EPOCH",
        "timestamp": datetime.now().isoformat()
    }

@app.get("/api/stats", response_model=LifeStats)
def get_stats_endpoint(
    date: str = Query(..., description="Birth date YYYY-MM-DD"),
    country: str = Query("Worldwide", description="Country name for life expectancy")
):
    dt = parse_and_validate_date(date)
    return compute_life_stats(dt, country=country)

@app.get("/api/name-popularity")
def get_name_popularity_endpoint(
    name: str = Query(..., description="First name"),
    year: int = Query(2000, description="Birth year")
):
    return get_name_popularity(name, year)

@app.get("/api/capsule", response_model=TimeCapsuleResponse)
async def get_time_capsule(
    date: str = Query(..., description="Birth date YYYY-MM-DD"),
    name: str = Query("Time Traveler", description="User's name"),
    country: str = Query("Worldwide", description="Selected region / country")
):
    dt = parse_and_validate_date(date)
    cache_key = f"capsule_{name}_{dt.isoformat()}_{country}"
    cached = global_cache.get(cache_key)
    if cached:
        return cached

    # Compute Stats
    stats = compute_life_stats(dt, country=country)

    # Gather data across independent services concurrently
    events_task = asyncio.create_task(fetch_on_this_day(dt.month, dt.day))
    weather_task = asyncio.create_task(fetch_historical_weather(dt, country=country))

    # Synchronous DB queries (fast SQLite)
    top_song = get_top_song(dt)
    top_movie = get_top_movie(dt)
    world_leaders = get_world_leaders(dt.year)
    money_machine = get_money_machine(dt.year, country=country)
    pop_then, pop_now = get_world_population(dt.year)
    tech_info, sports_info, headlines = get_culture_and_sports(dt.year)
    bday_rarity = get_birthday_rarity(dt.month, dt.day)
    name_pop = get_name_popularity(name, dt.year)
    timeline_events = generate_life_timeline(dt.year)
    then_vs_now = get_then_vs_now(dt.year)

    # Await concurrent web/cache tasks with safety
    try:
        events, twins = await events_task
    except Exception as e:
        print(f"Error resolving events: {e}")
        events, twins = [], []

    try:
        weather = await weather_task
    except Exception as e:
        print(f"Error resolving weather: {e}")
        weather = None

    world_on_day = WorldOnDay(
        top_song=top_song,
        top_movie=top_movie,
        history_highlights=events,
        birthday_twins=twins,
        world_leaders=world_leaders,
        monthly_headlines=headlines,
        sports_champion=sports_info,
        tech_of_the_time=tech_info,
        money_machine=money_machine,
        world_population_then=pop_then,
        world_population_now=pop_now,
        weather=weather
    )

    extras = DataScienceExtras(
        birthday_popularity=bday_rarity,
        name_popularity=name_pop,
        life_timeline=timeline_events,
        then_vs_now=then_vs_now,
        birthday_story=None  # Can be generated on demand or populated
    )

    # Generate initial birthday story
    story_payload = {
        "name": name,
        "birth_date": dt.isoformat(),
        "stats": stats.model_dump(),
        "world": world_on_day.model_dump()
    }
    extras.birthday_story = await generate_birthday_story(story_payload)

    response = TimeCapsuleResponse(
        name=name,
        birth_date=dt.isoformat(),
        country=country,
        stats=stats,
        world=world_on_day,
        extras=extras
    )

    global_cache.set(cache_key, response, ttl=3600)
    return response

@app.post("/api/story")
async def generate_story_endpoint(payload: Dict[str, Any] = Body(...)):
    story = await generate_birthday_story(payload)
    return {"story": story}

@app.get("/api/compare", response_model=CompareResponse)
def compare_endpoint(
    date1: str = Query(..., description="First person's birth date"),
    date2: str = Query(..., description="Second person's birth date"),
    name1: str = Query("Person 1", description="First person's name"),
    name2: str = Query("Person 2", description="Second person's name")
):
    d1 = parse_and_validate_date(date1)
    d2 = parse_and_validate_date(date2)
    return compare_two_dates(name1, d1, name2, d2)
