@echo off
echo ==========================================
echo      Starting ExpressHR Application
echo ==========================================

:: Start Backend
echo Starting Backend Server (Port 2580)...
start "ExpressHR Backend" cmd /k "cd hrms-backend && mvn spring-boot:run"

:: Wait a few seconds for backend to initialize (optional but helpful)
timeout /t 5

:: Start Frontend
echo Starting Frontend Client (Port 8520)...
start "ExpressHR Frontend" cmd /k "cd hrms-frontend && npm run dev"

echo ==========================================
echo Application Started!
echo Backend: http://localhost:2580
echo Frontend: http://localhost:8520
echo ==========================================
pause
