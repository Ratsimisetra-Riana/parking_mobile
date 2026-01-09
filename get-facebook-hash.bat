@echo off
echo ========================================
echo   FACEBOOK KEY HASH GENERATOR
echo ========================================
echo.

REM Chercher keytool dans le JDK
set KEYTOOL_PATH=
for /f "delims=" %%i in ('where keytool 2^>nul') do set KEYTOOL_PATH=%%i

if "%KEYTOOL_PATH%"=="" (
    echo [ERREUR] keytool introuvable dans PATH
    echo Ajoutez le JDK bin au PATH ou modifiez ce script
    pause
    exit /b 1
)

echo [OK] keytool trouve: %KEYTOOL_PATH%
echo.

set DEBUG_KEYSTORE=%USERPROFILE%\.android\debug.keystore

if not exist "%DEBUG_KEYSTORE%" (
    echo [ERREUR] Debug keystore introuvable: %DEBUG_KEYSTORE%
    pause
    exit /b 1
)

echo [OK] Debug keystore trouve
echo.
echo Generation du Key Hash Facebook...
echo.

REM Extraire le certificat et générer le hash Facebook
keytool -exportcert -alias androiddebugkey -keystore "%DEBUG_KEYSTORE%" -storepass android -keypass android | certutil -encode -f > temp_cert.txt

echo.
echo ========================================
echo   KEY HASH FACEBOOK
echo ========================================
echo.
echo COPIEZ ce hash dans Facebook Developer Console:
echo Parametres ^> Plateformes Android ^> Hachages de cles
echo.

REM Afficher le certificat encodé
type temp_cert.txt

del temp_cert.txt

echo.
echo ========================================
echo NOTE: Pour Facebook, convertissez en Base64:
echo Utilisez un outil en ligne ou OpenSSL
echo ========================================
echo.
pause
