# EPOCH PowerShell Launcher
Write-Host "========================================================" -ForegroundColor Green
Write-Host "      STARTING EPOCH FULL-STACK WEB APPLICATION" -ForegroundColor Yellow
Write-Host "========================================================" -ForegroundColor Green

# 1. Start Backend in separate window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot/backend'; .\venv\Scripts\Activate.ps1; uvicorn app.main:app --reload --port 8000"

Start-Sleep -Seconds 2

# 2. Start Frontend in separate window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot/frontend'; npm run dev"

Write-Host ""
Write-Host "Both services are launching in separate windows:" -ForegroundColor Cyan
Write-Host "  Frontend: http://localhost:5173" -ForegroundColor Green
Write-Host "  Backend:  http://localhost:8000 (Docs: http://localhost:8000/docs)" -ForegroundColor Green
Write-Host "========================================================" -ForegroundColor Green
