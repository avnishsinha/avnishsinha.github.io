@echo off
echo ========================================
echo   Portfolio Website Deployment Script
echo ========================================
echo.

echo [1/5] Adding all files to git...
git add .

echo [2/5] Creating commit...
set /p commit_message="Enter commit message (or press Enter for default): "
if "%commit_message%"=="" set commit_message=Update portfolio website

git commit -m "%commit_message%"

echo [3/5] Pushing to GitHub...
git push origin main

echo [4/5] Checking deployment status...
echo Your website will be available at: https://avnishsinha.github.io
echo.

echo [5/5] Deployment complete!
echo.
echo ========================================
echo   🚀 Website deployed successfully!
echo ========================================
echo.
echo You can view your live website at:
echo https://avnishsinha.github.io
echo.
echo It may take a few minutes for changes to appear online.
echo.
pause
