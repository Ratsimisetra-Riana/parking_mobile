@echo off
echo ============================================
echo OBTENIR LE SHA-1 CERTIFICATE FINGERPRINT
echo ============================================
echo.
echo Tentative 1: Avec JAVA_HOME...
echo.

if defined JAVA_HOME (
    "%JAVA_HOME%\bin\keytool.exe" -list -v -keystore android\app\debug.keystore -alias androiddebugkey -storepass android -keypass android | findstr /i "SHA1"
    if %ERRORLEVEL% EQU 0 goto success
)

echo.
echo Tentative 2: Recherche JDK dans Program Files...
echo.

for /d %%i in ("C:\Program Files\Java\jdk*") do (
    if exist "%%i\bin\keytool.exe" (
        "%%i\bin\keytool.exe" -list -v -keystore android\app\debug.keystore -alias androiddebugkey -storepass android -keypass android | findstr /i "SHA1"
        if %ERRORLEVEL% EQU 0 goto success
    )
)

for /d %%i in ("C:\Program Files\Eclipse Adoptium\jdk*") do (
    if exist "%%i\bin\keytool.exe" (
        "%%i\bin\keytool.exe" -list -v -keystore android\app\debug.keystore -alias androiddebugkey -storepass android -keypass android | findstr /i "SHA1"
        if %ERRORLEVEL% EQU 0 goto success
    )
)

echo.
echo Tentative 3: Avec Android Studio JBR...
echo.

if exist "C:\Program Files\Android\Android Studio\jbr\bin\keytool.exe" (
    "C:\Program Files\Android\Android Studio\jbr\bin\keytool.exe" -list -v -keystore android\app\debug.keystore -alias androiddebugkey -storepass android -keypass android | findstr /i "SHA1"
    if %ERRORLEVEL% EQU 0 goto success
)

echo.
echo Erreur: ERREUR: Impossible de trouver keytool
echo.
echo Solutions:
echo 1. Installez un JDK: https://adoptium.net/
echo 2. Ou utilisez Android Studio: File ^> Settings ^> Build Tools ^> Gradle
echo    et notez le chemin du JDK
echo.
echo Ensuite, executez manuellement:
echo "CHEMIN_VERS_JDK\bin\keytool.exe" -list -v -keystore android\app\debug.keystore -alias androiddebugkey -storepass android -keypass android
goto end

:success
echo.
echo ============================================
echo  SHA-1 récupéré avec succès!
echo ============================================
echo.
echo Copiez le SHA1 ci-dessus et allez sur:
echo https://console.cloud.google.com/apis/credentials
echo.
echo Créez ou modifiez un OAuth Client ID Android:
echo - Package name: com.upark
echo - SHA-1: [COLLEZ ICI]
echo.

:end
pause
