@echo off
echo ============================================
echo DEBUG GOOGLE SIGN-IN CONFIGURATION
echo ============================================
echo.

echo [1] Checking Android keystore SHA-1...
echo.
cd android\app
keytool -list -v -keystore debug.keystore -alias androiddebugkey -storepass android -keypass android | findstr /i "SHA1"
echo.

echo [2] Checking package name in AndroidManifest.xml...
echo.
type src\main\AndroidManifest.xml | findstr /i "package"
echo.

echo [3] Checking applicationId in build.gradle...
echo.
type build.gradle | findstr /i "applicationId"
echo.

echo [4] Checking strings.xml configuration...
echo.
type src\main\res\values\strings.xml
echo.

echo ============================================
echo INSTRUCTIONS:
echo ============================================
echo 1. Copy the SHA1 fingerprint above
echo 2. Go to: https://console.cloud.google.com/apis/credentials
echo 3. Find your Android OAuth Client ID
echo 4. Verify configuration:
echo    - Package name: com.upark
echo    - SHA-1: [paste the SHA1 from above]
echo.
echo 5. If Android OAuth Client doesn't exist, CREATE NEW:
echo    - Application type: Android
echo    - Name: UPark Android
echo    - Package name: com.upark
echo    - SHA-1: [paste the SHA1 from above]
echo.
echo 6. After saving, WAIT 5-10 minutes for Google to propagate changes
echo.
echo ============================================
pause
