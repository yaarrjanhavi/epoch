import sqlite3
from datetime import date
from typing import Optional
from ..models.capsule import MovieInfo
from ..config import DB_PATH

def get_top_movie(dt: date) -> Optional[MovieInfo]:
    """Retrieves top movie of the week & year from SQLite with trivia."""
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        
        cursor.execute("SELECT year_title, week_title, trivia FROM boxoffice WHERE year = ?;", (dt.year,))
        row = cursor.fetchone()
        
        if not row:
            # Nearest year
            cursor.execute("""
            SELECT year, year_title, week_title, trivia, ABS(year - ?) AS diff
            FROM boxoffice
            ORDER BY diff ASC
            LIMIT 1;
            """, (dt.year,))
            r = cursor.fetchone()
            if r:
                row = (r[1], r[2], r[3])

        conn.close()

        if row:
            return MovieInfo(
                year_title=row[0],
                week_title=row[1],
                year=dt.year,
                trivia=row[2]
            )
    except Exception as e:
        print(f"Box office query error: {e}")

    return MovieInfo(
        year_title="Star Wars",
        week_title="Star Wars",
        year=dt.year,
        trivia="A galactic classic that revolutionized cinema and special effects."
    )
