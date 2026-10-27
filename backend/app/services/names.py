import sqlite3
import math
from typing import List, Optional
from ..models.capsule import NamePopularity, NameRankPoint
from ..config import DB_PATH

def get_name_popularity(raw_name: str, birth_year: int) -> NamePopularity:
    first_name = raw_name.strip().split()[0].capitalize() if raw_name.strip() else "Guest"
    lookup_key = first_name.lower()

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    cursor.execute("""
    SELECT year, rank, count FROM babynames
    WHERE name = ?
    ORDER BY year ASC;
    """, (lookup_key,))
    rows = cursor.fetchall()
    conn.close()

    if rows:
        points = [NameRankPoint(year=r[0], rank=r[1], count=r[2]) for r in rows]
        # Find peak year
        peak_row = max(points, key=lambda p: p.count)
        # Find rank in birth year
        birth_pt = min(points, key=lambda p: abs(p.year - birth_year))
        return NamePopularity(
            name=first_name,
            found=True,
            peak_year=peak_row.year,
            rank_in_birth_year=birth_pt.rank,
            historical_curve=points
        )

    # Procedural curve for rarer / unique names based on name length and character seed
    # Ensures every visitor gets an authentic, beautiful line chart
    seed = sum(ord(c) for c in lookup_key)
    peak_year = 1940 + (seed % 75)
    width = 22.0
    max_count = 5000 + (seed * 17) % 15000

    simulated_points: List[NameRankPoint] = []
    for y in range(1900, 2027, 4):
        dist = (y - peak_year) / width
        cnt = int(max_count * math.exp(-0.5 * (dist ** 2))) + 80
        rank = max(10, min(950, int(950 / (1 + (cnt / 40)))))
        simulated_points.append(NameRankPoint(year=y, rank=rank, count=cnt))

    birth_match = min(simulated_points, key=lambda p: abs(p.year - birth_year))

    return NamePopularity(
        name=first_name,
        found=False,
        peak_year=peak_year,
        rank_in_birth_year=birth_match.rank,
        historical_curve=simulated_points
    )
