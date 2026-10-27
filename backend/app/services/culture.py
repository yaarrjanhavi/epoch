import sqlite3
from typing import List, Dict, Any, Optional, Tuple
from ..models.capsule import WorldLeader, LifeTimelineEvent
from ..config import DB_PATH

US_PRESIDENTS = [
    (1900, 1901, "William McKinley"),
    (1901, 1909, "Theodore Roosevelt"),
    (1909, 1913, "William Howard Taft"),
    (1913, 1921, "Woodrow Wilson"),
    (1921, 1923, "Warren G. Harding"),
    (1923, 1929, "Calvin Coolidge"),
    (1929, 1933, "Herbert Hoover"),
    (1933, 1945, "Franklin D. Roosevelt"),
    (1945, 1953, "Harry S. Truman"),
    (1953, 1961, "Dwight D. Eisenhower"),
    (1961, 1963, "John F. Kennedy"),
    (1963, 1969, "Lyndon B. Johnson"),
    (1969, 1974, "Richard Nixon"),
    (1974, 1977, "Gerald Ford"),
    (1977, 1981, "Jimmy Carter"),
    (1981, 1989, "Ronald Reagan"),
    (1989, 1993, "George H. W. Bush"),
    (1993, 2001, "Bill Clinton"),
    (2001, 2009, "George W. Bush"),
    (2009, 2017, "Barack Obama"),
    (2017, 2021, "Donald Trump"),
    (2021, 2025, "Joe Biden"),
    (2025, 2029, "Donald Trump")
]

UK_PRIME_MINISTERS = [
    (1940, 1945, "Winston Churchill"),
    (1945, 1951, "Clement Attlee"),
    (1951, 1955, "Winston Churchill"),
    (1955, 1957, "Anthony Eden"),
    (1957, 1963, "Harold Macmillan"),
    (1964, 1970, "Harold Wilson"),
    (1970, 1974, "Edward Heath"),
    (1974, 1976, "Harold Wilson"),
    (1976, 1979, "James Callaghan"),
    (1979, 1990, "Margaret Thatcher"),
    (1990, 1997, "John Major"),
    (1997, 2007, "Tony Blair"),
    (2007, 2010, "Gordon Brown"),
    (2010, 2016, "David Cameron"),
    (2016, 2019, "Theresa May"),
    (2019, 2022, "Boris Johnson"),
    (2022, 2022, "Liz Truss"),
    (2022, 2024, "Rishi Sunak"),
    (2024, 2029, "Keir Starmer")
]

UN_SECRETARIES = [
    (1946, 1952, "Trygve Lie"),
    (1953, 1961, "Dag Hammarskjöld"),
    (1961, 1971, "U Thant"),
    (1972, 1981, "Kurt Waldheim"),
    (1982, 1991, "Javier Pérez de Cuéllar"),
    (1992, 1996, "Boutros Boutros-Ghali"),
    (1997, 2006, "Kofi Annan"),
    (2007, 2016, "Ban Ki-moon"),
    (2017, 2027, "António Guterres")
]

def get_world_leaders(year: int) -> List[WorldLeader]:
    leaders: List[WorldLeader] = []

    # US President
    for start, end, name in US_PRESIDENTS:
        if start <= year <= end:
            leaders.append(WorldLeader(office="US President", name=name, country="United States"))
            break

    # UK PM
    for start, end, name in UK_PRIME_MINISTERS:
        if start <= year <= end:
            leaders.append(WorldLeader(office="UK Prime Minister", name=name, country="United Kingdom"))
            break

    # UN Sec Gen
    for start, end, name in UN_SECRETARIES:
        if start <= year <= end:
            leaders.append(WorldLeader(office="UN Secretary-General", name=name, country="United Nations"))
            break

    if not leaders:
        leaders.append(WorldLeader(office="US President", name="Franklin D. Roosevelt", country="United States"))
        leaders.append(WorldLeader(office="UK Prime Minister", name="Winston Churchill", country="United Kingdom"))

    return leaders

def get_culture_and_sports(year: int) -> Tuple[Dict[str, Any], Dict[str, str], List[str]]:
    row = None
    internet_then = 0.0
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()

        cursor.execute("""
        SELECT tech_gadget, tech_desc, sports_event, sports_winner, sports_details, headline_news
        FROM culture WHERE year = ?;
        """, (year,))
        row = cursor.fetchone()

        cursor.execute("SELECT internet_users_pct FROM economy WHERE year = ?;", (year,))
        econ_row = cursor.fetchone()
        if econ_row:
            internet_then = econ_row[0]

        conn.close()
    except Exception as e:
        print(f"Culture DB query error: {e}")

    if row:
        gadget, g_desc, s_event, s_winner, s_detail, headline = row
    else:
        gadget, g_desc = "Transistor Radio & Vinyl", "Classic home electronics.", "World Cup", "Historic Champion", "Memorable tournament.", "Milestone moments in history."

    tech_info = {
        "gadget": gadget,
        "description": g_desc,
        "internet_users_pct": internet_then
    }

    sports_info = {
        "event": s_event,
        "winner": s_winner,
        "details": s_detail
    }

    headlines = [h.strip() for h in headline.split(";") if h.strip()]

    return tech_info, sports_info, headlines

HISTORICAL_ANCHORS = {
    1969: "Apollo 11 lands first humans on the Moon.",
    1977: "First commercial personal computers and Star Wars debut.",
    1989: "Fall of the Berlin Wall; Tim Berners-Lee invents the World Wide Web.",
    1995: "Commercial internet explosion and launch of Windows 95.",
    1999: "World rings in the new millennium; Y2K computer bug averted.",
    2001: "Wikipedia launches; modern digital interconnected age begins.",
    2007: "First Apple iPhone announced; mobile smartphone revolution starts.",
    2012: "Curiosity touches down on Mars; Higgs boson discovered.",
    2016: "Gravitational waves detected by LIGO for the first time.",
    2020: "Global transition to remote connection; Perseverance rover flies to Mars.",
    2022: "James Webb Space Telescope returns deepest infrared views of cosmos.",
    2024: "SpaceX Starship executes historic booster catch on launch tower.",
    2026: "Humanoid robotics and quantum error-corrected processors enter the mainstream."
}

def generate_life_timeline(birth_year: int) -> List[LifeTimelineEvent]:
    events: List[LifeTimelineEvent] = []
    current_year = 2026

    # Milestone ages
    key_ages = [
        (0, "Year Zero: You entered the cosmos"),
        (5, "Kindergarten era & discovering the world"),
        (10, "Double digits: Childhood milestones"),
        (16, "Sweet sixteen: Independence & new horizons"),
        (18, "Adulthood unlocked"),
        (21, "Key of the door: Full adult independence"),
        (25, "Quarter-century mark: Quarter-life clarity"),
        (30, "The thirties: Flourishing confidence"),
        (40, "Four decades of life wisdom"),
        (50, "Half a century: Golden jubilee"),
        (60, "Six decades: Elder master of experience")
    ]

    for age, milestone_text in key_ages:
        year = birth_year + age
        if year > current_year:
            continue

        # Look up world event closest to this year
        closest_world_year = min(HISTORICAL_ANCHORS.keys(), key=lambda y: abs(y - year))
        world_event = HISTORICAL_ANCHORS[closest_world_year]

        events.append(LifeTimelineEvent(
            year=year,
            age=age,
            user_milestone=milestone_text,
            world_event=world_event,
            category="milestone"
        ))

    # Add today if not already covered
    current_age = current_year - birth_year
    if not any(e.year == current_year for e in events):
        events.append(LifeTimelineEvent(
            year=current_year,
            age=current_age,
            user_milestone="Today: Viewing your Epoch time capsule",
            world_event="AI, quantum computing, and human space exploration redefine the frontier.",
            category="now"
        ))

    return events
