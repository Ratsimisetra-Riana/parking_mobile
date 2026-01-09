# Script PowerShell pour extraire le SHA-1 du keystore Android

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "DEBUG GOOGLE SIGN-IN CONFIGURATION" -ForegroundColor Cyan
Write-Host "============================================`n" -ForegroundColor Cyan

# 1. Vérifier les informations du projet
Write-Host "[1] Package Name (ApplicationId):" -ForegroundColor Yellow
$packageName = Select-String -Path "android\app\build.gradle" -Pattern 'applicationId\s+"([^"]+)"' | ForEach-Object { $_.Matches.Groups[1].Value }
Write-Host "    $packageName`n" -ForegroundColor Green

# 2. Vérifier le Web Client ID configuré
Write-Host "[2] Web Client ID configuré:" -ForegroundColor Yellow
$webClientId = Select-String -Path "android\app\src\main\res\values\strings.xml" -Pattern 'default_web_client_id">([^<]+)<' | ForEach-Object { $_.Matches.Groups[1].Value }
Write-Host "    $webClientId`n" -ForegroundColor Green

# 3. Instructions pour obtenir le SHA-1
Write-Host "[3] Pour obtenir le SHA-1 Certificate Fingerprint:" -ForegroundColor Yellow
Write-Host "    Exécutez CETTE commande dans CMD (pas PowerShell):" -ForegroundColor White
Write-Host "`n    cd android\app" -ForegroundColor Cyan
Write-Host "    `"%JAVA_HOME%\bin\keytool.exe`" -list -v -keystore debug.keystore -alias androiddebugkey -storepass android -keypass android`n" -ForegroundColor Cyan

Write-Host "    OU si JAVA_HOME n'est pas défini, utilisez le chemin complet de votre JDK:" -ForegroundColor White
Write-Host '    "C:\Program Files\Java\jdk-XX\bin\keytool.exe" -list -v -keystore debug.keystore -alias androiddebugkey -storepass android -keypass android' -ForegroundColor Cyan
Write-Host ""

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "ÉTAPES POUR CONFIGURER GOOGLE CONSOLE" -ForegroundColor Cyan
Write-Host "============================================`n" -ForegroundColor Cyan

Write-Host "1. Allez sur: https://console.cloud.google.com/apis/credentials" -ForegroundColor White
Write-Host ""
Write-Host "2. CHERCHEZ si un 'OAuth 2.0 Client ID' de type ANDROID existe déjà" -ForegroundColor White
Write-Host "   - Si OUI: Cliquez dessus et vérifiez:" -ForegroundColor Yellow
Write-Host "     * Package name = $packageName" -ForegroundColor Green
Write-Host "     * SHA-1 certificate fingerprint = [coller le SHA1 obtenu avec keytool]" -ForegroundColor Green
Write-Host ""
Write-Host "   - Si NON: Cliquez 'CREATE CREDENTIALS' > 'OAuth client ID'" -ForegroundColor Yellow
Write-Host "     * Application type: Android" -ForegroundColor Green
Write-Host "     * Name: UPark Android" -ForegroundColor Green
Write-Host "     * Package name: $packageName" -ForegroundColor Green
Write-Host "     * SHA-1 certificate fingerprint: [coller le SHA1 obtenu avec keytool]" -ForegroundColor Green
Write-Host ""
Write-Host "3. Le Web Client ID à utiliser dans le code React Native est:" -ForegroundColor White
Write-Host "   918409349260-m2ijsmke5se2eish42ijqunhod4bmuqb.apps.googleusercontent.com" -ForegroundColor Green
Write-Host "   (C'est celui que vous avez créé pour 'Web application', PAS l'Android)" -ForegroundColor Yellow
Write-Host ""
Write-Host "4. Après avoir sauvegardé, ATTENDEZ 5-10 minutes pour la propagation" -ForegroundColor White
Write-Host ""
Write-Host "5. Nettoyez et reconstruisez l'app:" -ForegroundColor White
Write-Host "   cd android && .\gradlew clean && cd .." -ForegroundColor Cyan
Write-Host "   npx react-native run-android" -ForegroundColor Cyan
Write-Host ""
Write-Host "============================================`n" -ForegroundColor Cyan

Read-Host "Appuyez sur Entrée pour continuer"
