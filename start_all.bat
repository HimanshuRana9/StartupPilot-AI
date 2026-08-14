@echo off
echo ========================================================
echo   Starting StartupPilot AI (Backend + Frontend)
echo ========================================================
echo.

start "StartupPilot FastAPI Backend" cmd /k "cd backend && python start.py"
start "StartupPilot Next.js Frontend" cmd /k "cd frontend && npm run dev"

echo Startup Services Launched!
echo Backend:  http://127.0.0.1:8000
echo Frontend: http://localhost:3000
echo.
pause
