#!/usr/bin/env pwsh
# ========================================
# SCRIPT DE BUILD APK RELEASE
# ========================================
# Genere l'APK de production pret a distribuer
# Usage: .\build-release-apk.ps1
# ========================================

Write-Host "`n=== BUILD APK RELEASE - PARKING MOBILE ===`n" -ForegroundColor Cyan

# Verifier qu'on est dans le bon repertoire
if (-not (Test-Path "android\app\build.gradle")) {
    Write-Host "[ERREUR] Veuillez executer ce script depuis la racine du projet parking_mobile" -ForegroundColor Red
    exit 1
}

# Verifier que Node modules sont installes
if (-not (Test-Path "node_modules")) {
    Write-Host "[INFO] node_modules non trouve. Installation des dependances...`n" -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "`n[ERREUR] Erreur lors de l'installation des dependances" -ForegroundColor Red
        exit 1
    }
}

# Build Release APK (sans clean pour preserver le cache debug)
Write-Host "`n[BUILD] Generation de l'APK Release...`n" -ForegroundColor Cyan
Write-Host "[INFO] Cela peut prendre 2-5 minutes...`n" -ForegroundColor Gray

Set-Location android
.\gradlew assembleRelease

if ($LASTEXITCODE -ne 0) {
    Write-Host "`n[ERREUR] Erreur lors de la generation de l'APK" -ForegroundColor Red
    Set-Location ..
    exit 1
}

Set-Location ..

# Verifier que les APK ont ete generes (avec splits ABI)
$apkFolder = "android\app\build\outputs\apk\release"
$allApkFiles = Get-ChildItem -Path $apkFolder -Filter "*.apk" -ErrorAction SilentlyContinue
# Filtrer uniquement les APK ARM (ignorer x86/x86_64 pour emulateurs)
$apkFiles = $allApkFiles | Where-Object { $_.Name -match "arm" }

if ($apkFiles.Count -gt 0) {
    Write-Host "`n[SUCCESS] BUILD REUSSI !`n" -ForegroundColor Green
    Write-Host "[APK] Fichiers generes (optimises par architecture):`n" -ForegroundColor Cyan
    
    foreach ($apk in $apkFiles) {
        $apkSize = [math]::Round($apk.Length / 1MB, 2)
        $archType = if ($apk.Name -match "arm64") { "[ARM64] Smartphones modernes 2017+" } else { "[ARMv7] Anciens appareils" }
        
        Write-Host "   Fichier: $($apk.Name)" -ForegroundColor White
        Write-Host "   Taille:  $apkSize MB" -ForegroundColor Yellow
        Write-Host "   Type:    $archType`n" -ForegroundColor Gray
    }
    
    Write-Host "[INSTALL] Pour installer sur un appareil connecte:" -ForegroundColor Cyan
    Write-Host "   ARM64 (recommande): adb install $apkFolder\app-arm64-v8a-release.apk" -ForegroundColor White
    Write-Host "   ARMv7 (ancien):     adb install $apkFolder\app-armeabi-v7a-release.apk`n" -ForegroundColor Gray
    
    Write-Host "[?] Ouvrir le dossier des APK?" -ForegroundColor Cyan
    $response = Read-Host "   (O/N)"
    if ($response -eq "O" -or $response -eq "o") {
        Invoke-Item $apkFolder
    }
} else {
    Write-Host "`n[ERREUR] APK non trouve dans le dossier de sortie" -ForegroundColor Red
    exit 1
}

Write-Host "`n[DONE] Termine !`n" -ForegroundColor Green
