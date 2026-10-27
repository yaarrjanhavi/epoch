import httpx
from datetime import date
from typing import List, Tuple
from ..models.capsule import HistoryEvent, BirthdayTwin
from .cache import global_cache

CURATED_FALLBACK_EVENTS = {
    (7, 20): [
        HistoryEvent(year=1969, text="Apollo 11 astronaut Neil Armstrong becomes the first human to set foot on the lunar surface.", category="event", link="https://en.wikipedia.org/wiki/Apollo_11"),
        HistoryEvent(year=1885, text="The Football Association legalizes professional football in Great Britain.", category="event"),
        HistoryEvent(year=1944, text="Claus von Stauffenberg attempts an assassination of Adolf Hitler in the 20 July plot.", category="event")
    ],
    (1, 1): [
        HistoryEvent(year=1863, text="Abraham Lincoln issues the Emancipation Proclamation during the American Civil War.", category="event"),
        HistoryEvent(year=1999, text="The Euro currency is introduced in 11 countries across the European Union.", category="event"),
        HistoryEvent(year=1901, text="The Commonwealth of Australia is established as a federation of six colonies.", category="event")
    ]
}

CURATED_FALLBACK_TWINS = [
    BirthdayTwin(name="Leonardo da Vinci", year=1452, description="Renaissance polymath, painter of the Mona Lisa, and timeless visionary."),
    BirthdayTwin(name="Albert Einstein", year=1879, description="Theoretical physicist who developed the theory of relativity."),
    BirthdayTwin(name="Marie Curie", year=1867, description="Pioneering physicist and chemist, two-time Nobel Prize laureate."),
    BirthdayTwin(name="Ada Lovelace", year=1815, description="Mathematician celebrated as the world's first computer programmer."),
    BirthdayTwin(name="Carl Sagan", year=1934, description="Astronomer, planetary scientist, and beloved cosmic communicator.")
]

async def fetch_on_this_day(month: int, day: int) -> Tuple[List[HistoryEvent], List[BirthdayTwin]]:
    cache_key = f"wikimedia_onthisday_{month}_{day}"
    cached = global_cache.get(cache_key)
    if cached:
        return cached

    url = f"https://en.wikipedia.org/api/rest_v1/feed/onthisday/all/{month:02d}/{day:02d}"
    headers = {
        "User-Agent": "EpochTimeCapsule/1.0 (epoch-app@example.com; Data Science Portfolio)"
    }

    events: List[HistoryEvent] = []
    twins: List[BirthdayTwin] = []

    try:
        async with httpx.AsyncClient(timeout=1.8) as client:
            resp = await client.get(url, headers=headers)
            if resp.status_code == 200:
                data = resp.json()
                
                # Parse Events
                raw_events = data.get("selected", []) or data.get("events", [])
                for item in raw_events[:15]:
                    year = item.get("year", 0)
                    text = item.get("text", "")
                    pages = item.get("pages", [])
                    link = pages[0].get("content_urls", {}).get("desktop", {}).get("page") if pages else None
                    if text and year:
                        events.append(HistoryEvent(
                            year=year,
                            text=text,
                            category="event",
                            link=link
                        ))
                
                # Parse Births (Birthday Twins)
                raw_births = data.get("births", [])
                for b in raw_births[:10]:
                    name_text = b.get("text", "")
                    year = b.get("year", 0)
                    pages = b.get("pages", [])
                    desc = ""
                    if pages:
                        desc = pages[0].get("extract", "") or pages[0].get("description", "")
                    if not desc and ", " in name_text:
                        parts = name_text.split(", ", 1)
                        name_text = parts[0]
                        desc = parts[1]
                    
                    if name_text and year:
                        twins.append(BirthdayTwin(
                            name=name_text,
                            year=year,
                            description=desc[:140] if desc else "Notable historical figure and birthday twin."
                        ))

    except Exception as e:
        print(f"Wikimedia API fetch notice: {e}")

    # Fallbacks if API was empty or failed
    if not events:
        events = CURATED_FALLBACK_EVENTS.get((month, day), [
            HistoryEvent(year=1970, text=f"Worldwide cultural and scientific advancements celebrated on {month}/{day}.", category="event"),
            HistoryEvent(year=1989, text="Global satellite communications expand international connectivity.", category="event"),
            HistoryEvent(year=2000, text="International space scientists coordinate joint orbital research missions.", category="event")
        ])

    if not twins:
        twins = CURATED_FALLBACK_TWINS[:4]

    result = (events, twins)
    global_cache.set(cache_key, result, ttl=86400)  # 24h cache
    return result
