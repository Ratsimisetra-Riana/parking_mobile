#!/usr/bin/env pwsh
# ========================================
# 📦 SCRIPT DE BUILD APK RELEASE
# ========================================
# Génère l'APK de production prêt à distribuer
# Usage: .\build-release-apk.ps1
# ========================================

Write-Host "`n BUILD APK RELEASE - PARKING MOBILE`n" -ForegroundColor Cyan

# Vérifier qu'on est dans le bon répertoire
if (-not (Test-Path "android\app\build.gradle")) {
    Write-Host " Erreur: Veuillez exécuter ce script depuis la racine du projet parking_mobile" -ForegroundColor Red
    exit 1
}

# Vérifier que Node modules sont installés
if (-not (Test-Path "node_modules")) {
    Write-Host "  node_modules non trouvé. Installation des dépendances...`n" -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "`n Erreur lors de l'installation des dépendances" -ForegroundColor Red
        exit 1
    }
}

# Nettoyer les builds précédents
Write-Host "🧹 Nettoyage des builds précédents...`n" -ForegroundColor Yellow
Set-Location android
.\gradlew clean
if ($LASTEXITCODE -ne 0) {
    Write-Host "`n Erreur lors du nettoyage" -ForegroundColor Red
    Set-Location ..
    exit 1
}

# Build Release APK
Write-Host "`n Génération de l'APK Release...`n" -ForegroundColor Cyan
Write-Host " Cela peut prendre 2-5 minutes...`n" -ForegroundColor Gray

.\gradlew assembleRelease

if ($LASTEXITCODE -ne 0) {
    Write-Host "`n Erreur lors de la génération de l'APK" -ForegroundColor Red
    Set-Location ..
    exit 1
}

Set-Location ..

# Vérifier que l'APK a été généré
$apkPath = "android\app\build\outputs\apk\release\app-release.apk"
if (Test-Path $apkPath) {
    $apkSize = [math]::Round((Get-Item $apkPath).Length / 1MB, 2)
    
    Write-Host "`n BUILD RÉUSSI !`n" -ForegroundColor Green
    Write-Host " APK généré:" -ForegroundColor Cyan
    Write-Host "   Fichier: $apkPath" -ForegroundColor White
    Write-Host "   Taille:  $apkSize MB`n" -ForegroundColor White
    
    Write-Host " Pour installer sur un appareil connecté:" -ForegroundColor Yellow
    Write-Host "   adb install $apkPath`n" -ForegroundColor Gray
    
    Write-Host " Ouvrir le dossier de l'APK?" -ForegroundColor Cyan
    $response = Read-Host "   (O/N)"
    if ($response -eq "O" -or $response -eq "o") {
        Invoke-Item "android\app\build\outputs\apk\release"
    }
} else {
    Write-Host "`n APK non trouvé dans le dossier de sortie" -ForegroundColor Red
    exit 1
}

Write-Host "`n Terminé !`n" -ForegroundColor Green
