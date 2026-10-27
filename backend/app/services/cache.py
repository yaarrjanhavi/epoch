import time
from typing import Any, Optional, Dict

class SimpleCache:
    """In-memory cache with TTL in seconds."""
    def __init__(self, default_ttl: int = 3600):
        self._store: Dict[str, Dict[str, Any]] = {}
        self.default_ttl = default_ttl

    def get(self, key: str) -> Optional[Any]:
        item = self._store.get(key)
        if not item:
            return None
        if time.time() > item["expires_at"]:
            del self._store[key]
            return None
        return item["value"]

    def set(self, key: str, value: Any, ttl: Optional[int] = None):
        t = ttl if ttl is not None else self.default_ttl
        self._store[key] = {
            "value": value,
            "expires_at": time.time() + t
        }

    def clear(self):
        self._store.clear()

global_cache = SimpleCache(default_ttl=7200)
