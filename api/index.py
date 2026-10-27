import sys
import os
import traceback

current_dir = os.path.dirname(os.path.abspath(__file__))
root_dir = os.path.dirname(current_dir)
backend_dir = os.path.join(root_dir, "backend")

for p in [root_dir, backend_dir, "/var/task", "/var/task/backend"]:
    if os.path.exists(p) and p not in sys.path:
        sys.path.insert(0, p)

try:
    from backend.app.main import app
except Exception as e:
    err_tb = traceback.format_exc()
    print("FATAL IMPORT ERROR IN API:", err_tb)
    from fastapi import FastAPI
    from fastapi.responses import JSONResponse
    
    app = FastAPI(title="EPOCH Fallback")
    
    @app.api_route("/{full_path:path}", methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD"])
    async def fallback_handler(full_path: str):
        return JSONResponse(
            status_code=500,
            content={
                "error": "Backend initialization failed",
                "detail": str(e),
                "traceback": err_tb,
                "sys_path": sys.path[:5]
            }
        )
