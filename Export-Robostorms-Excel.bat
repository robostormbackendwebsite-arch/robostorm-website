@echo off
title Robostorms Database to Excel Exporter
color 0A
echo ====================================================================
echo    ROBOSTORMS TECHNOLOGY PVT. LTD. - DATABASE EXCEL EXPORTER
echo ====================================================================
echo.
echo Connecting to live database and generating 3-Tab Excel sheet...
echo.

cd /d "C:\Users\admin\Downloads\robostorms"
call npm run export:excel

echo.
echo ====================================================================
echo Excel file has been updated directly on your Desktop!
echo ====================================================================
pause
