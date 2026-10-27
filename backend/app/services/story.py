import os
import random
from typing import Dict, Any

async def generate_birthday_story(capsule_data: Dict[str, Any]) -> str:
    """Generates a warm, playful, slightly nerdy ~150-word narrative using LLM or rich procedural generator."""
    name = capsule_data.get("name", "Friend")
    birth_date = capsule_data.get("birth_date", "1998-05-14")
    stats = capsule_data.get("stats", {})
    world = capsule_data.get("world", {})

    day_of_week = stats.get("day_of_week", "a quiet day")
    days_alive = stats.get("days_alive", 10000)
    moon = stats.get("moon_phase", {}).get("phase_name", "Waxing Crescent")
    space_distance = stats.get("space_distance_km", 25000000000)
    orbits = stats.get("earth_orbits", 25)

    song_title = world.get("top_song", {}).get("title", "a classic tune") if world.get("top_song") else "a classic tune"
    song_artist = world.get("top_song", {}).get("artist", "") if world.get("top_song") else ""
    movie_title = world.get("top_movie", {}).get("year_title", "a cinematic triumph") if world.get("top_movie") else "a cinematic hit"

    # Check for LLM API key
    openai_key = os.getenv("OPENAI_API_KEY")
    if openai_key:
        try:
            import httpx
            prompt = (
                f"Write a warm, playful, slightly nerdy personalized time-capsule birthday story of exactly 130-160 words "
                f"for {name}, born on {birth_date} (a {day_of_week}). "
                f"They have been alive for {days_alive:,} days and orbited the sun {orbits} times ({space_distance:,.0f} km through space). "
                f"The moon was in {moon} phase. The top radio song was '{song_title}' by {song_artist}, and cinemas were showing '{movie_title}'. "
                f"Capture the magic of time, life's strange beauty, and end on an uplifting note. Do not use corporate or cliché AI language."
            )
            async with httpx.AsyncClient(timeout=8.0) as client:
                res = await client.post(
                    "https://api.openai.com/v1/chat/completions",
                    headers={"Authorization": f"Bearer {openai_key}"},
                    json={
                        "model": "gpt-4o-mini",
                        "messages": [{"role": "user", "content": prompt}],
                        "temperature": 0.85
                    }
                )
                if res.status_code == 200:
                    text = res.json()["choices"][0]["message"]["content"].strip()
                    return text
        except Exception as e:
            print(f"LLM API generation fallback: {e}")

    # Rich, human, beautifully tailored narrative variations
    artist_clause = f" by {song_artist}" if song_artist else ""
    
    variations = [
        (
            f"On a gentle {day_of_week} in {birth_date[:4]}, the universe made room for {name}. "
            f"Up above, a {moon.lower()} hung quietly in the evening sky, while car radios were busy blasting '{song_title}'{artist_clause} "
            f"and cinemas were packed with people lining up to watch '{movie_title}'. "
            f"Nobody in the room that day knew that over the next {days_alive:,} days, you would complete {orbits} full celestial laps around the Sun, "
            f"hurtling across {space_distance / 1e9:.1f} billion kilometers of cosmic vacuum at 30 kilometers per second without ever spilling a morning cup of coffee. "
            f"You have inhaled tens of millions of breaths, outlasted tech fads, and witnessed history quietly rewrite itself. "
            f"Every single day has a story, {name}—and this strange, wondrous timeline has always been yours."
        ),
        (
            f"When {name} arrived on {birth_date}, Earth was already spinning at breakneck speed, but for one magical moment, things clicked into place. "
            f"A {moon.lower()} illuminated the night, cassette players were spinning '{song_title}'{artist_clause}, and marquee lights flickered with '{movie_title}'. "
            f"Fast forward {days_alive:,} days: you've now charted over {space_distance / 1e9:.1f} billion kilometers of deep space alongside Earth, "
            f"quietly compiling an extraordinary personal archive of laughter, heartbeats, and small triumphs. "
            f"The world has changed beyond recognition since that {day_of_week}, but you've been right here, turning ordinary calendar squares into lived adventure. "
            f"Here's to the miles behind you, {name}, and all the uncharted orbits still ahead."
        ),
        (
            f"Rewind the clocks to {birth_date}: the world was humming along to '{song_title}'{artist_clause}, "
            f"'{movie_title}' was captivating theater audiences, and under a peaceful {moon.lower()}, {name} stepped onto the stage. "
            f"Since that exact {day_of_week}, your heart has faithfully tapped out over a hundred million beats, while the planet carried you through {orbits} cosmic seasons. "
            f"You are older than more than half the humans walking the Earth today, carrying an era of memories that no search engine can ever index. "
            f"Time doesn't just pass, {name}—it gathers around the people who live it fully. "
            f"Welcome back to your beginning."
        )
    ]

    return random.choice(variations)
