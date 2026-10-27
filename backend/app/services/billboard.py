import sqlite3
import urllib.parse
from datetime import date
from typing import Optional
from ..models.capsule import SongInfo
from ..config import DB_PATH

def get_top_song(dt: date) -> Optional[SongInfo]:
    """Retrieves the Billboard / top song for the given date from SQLite or nearest week fallback."""
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        
        target_str = dt.isoformat()
        
        # 1. Check for exact date match
        cursor.execute("SELECT chart_date, title, artist FROM billboard WHERE chart_date = ?;", (target_str,))
        row = cursor.fetchone()
        
        is_exact = True
        fallback_note = None

        if not row:
            is_exact = False
            # Find the closest date before or after
            cursor.execute("""
            SELECT chart_date, title, artist,
                   ABS(strftime('%s', chart_date) - strftime('%s', ?)) AS diff
            FROM billboard
            ORDER BY diff ASC
            LIMIT 1;
            """, (target_str,))
            row = cursor.fetchone()
            if row:
                fallback_note = f"Exact week chart missing; matched nearest landmark hit ({row[0]})."

        conn.close()

        if row:
            chart_date, title, artist = row[0], row[1], row[2]
            query_str = urllib.parse.quote_plus(f"{title} {artist}")
            youtube_url = f"https://www.youtube.com/results?search_query={query_str}"
            spotify_url = f"https://open.spotify.com/search/{query_str}"
            
            return SongInfo(
                title=title,
                artist=artist,
                chart_date=chart_date,
                is_exact_week=is_exact,
                fallback_note=fallback_note,
                youtube_url=youtube_url,
                spotify_url=spotify_url
            )
    except Exception as e:
        print(f"Billboard query error: {e}")

    # Ultimate graceful fallback
    return SongInfo(
        title="Stayin' Alive",
        artist="Bee Gees",
        chart_date=dt.isoformat(),
        is_exact_week=False,
        fallback_note="Default classic hit.",
        youtube_url="https://www.youtube.com/results?search_query=Bee+Gees+Stayin+Alive",
        spotify_url="https://open.spotify.com/search/Bee%20Gees%20Stayin%20Alive"
    )
