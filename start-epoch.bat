@echo off
echo ========================================================
echo       STARTING EPOCH FULL-STACK WEB APPLICATION
echo ========================================================

echo Starting FastAPI Backend on http://127.0.0.1:8000 ...
start "EPOCH Backend" cmd /k "cd backend && venv\Scripts\activate && uvicorn app.main:app --reload --port 8000"

timeout /t 2 /nobreak >nul

echo Starting Vite Frontend on http://127.0.0.1:5173 ...
start "EPOCH Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================================
echo  Both services launched!
echo  Frontend URL: http://localhost:5173
echo  Backend Docs: http://localhost:8000/docs
echo ========================================================
