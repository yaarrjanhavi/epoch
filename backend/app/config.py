import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ROOT_DIR = os.path.dirname(BASE_DIR)

# Resolve DB_PATH with robust fallback for local and serverless environments (e.g. Vercel)
DB_PATH = os.getenv("EPOCH_DB_PATH")

if not DB_PATH or not os.path.exists(DB_PATH):
    potential_paths = [
        os.path.join(ROOT_DIR, "data", "epoch.db"),
        os.path.join(os.getcwd(), "data", "epoch.db"),
        "/var/task/data/epoch.db",
        os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "data", "epoch.db")),
    ]
    for p in potential_paths:
        if os.path.isfile(p):
            DB_PATH = p
            break

if not DB_PATH:
    DB_PATH = os.path.join(ROOT_DIR, "data", "epoch.db")
