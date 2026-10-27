import sys
import os

# Ensure backend and root paths are available
current_dir = os.path.dirname(os.path.abspath(__file__))
root_dir = os.path.dirname(current_dir)
backend_dir = os.path.join(root_dir, "backend")

for p in [root_dir, backend_dir, "/var/task", "/var/task/backend"]:
    if os.path.exists(p) and p not in sys.path:
        sys.path.insert(0, p)

from backend.app.main import app
