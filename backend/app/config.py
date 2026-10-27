import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ROOT_DIR = os.path.dirname(BASE_DIR)
DATA_DIR = os.getenv("EPOCH_DATA_DIR", os.path.join(ROOT_DIR, "data"))
DB_PATH = os.getenv("EPOCH_DB_PATH", os.path.join(DATA_DIR, "epoch.db"))
