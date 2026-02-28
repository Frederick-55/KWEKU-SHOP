# RetailConnect – Capacitor (Play Store) Setup

Step-by-step guide to build and publish the app on Google Play.

## Prerequisites

- **Node.js** (v16+)
- **Android Studio** (for Android builds)
- **Java JDK 17** (required by Android)

## 1. Install Dependencies

```bash
cd retailconnect
npm install
npm install @capacitor/core @capacitor/cli
```

## 2. Add Android Platform

```bash
npx cap add android
npx cap sync
```

This creates the `android/` folder.

## 3. Open in Android Studio

```bash
npx cap open android
```

Android Studio will open. Wait for Gradle sync to complete.

## 4. Test on Emulator / Device

- **Emulator**: Tools → Device Manager → Create Virtual Device
- **Physical device**: Enable USB debugging, connect, run ▶️

## 5. Build Release APK / AAB for Play Store

### Create signing key (first time only)

```bash
keytool -genkey -v -keystore retailconnect.keystore -alias retailconnect -keyalg RSA -keysize 2048 -validity 10000
```

### Build Signed Bundle (AAB – required by Play Store)

1. In Android Studio: **Build → Generate Signed Bundle / APK**
2. Choose **Android App Bundle**
3. Select or create keystore
4. Build **release** variant

Output: `android/app/release/app-release.aab`

## 6. Publish to Play Store

1. Go to [Google Play Console](https://play.google.com/console)
2. Create app (or use existing)
3. Upload `app-release.aab` to Production or Internal testing
4. Fill store listing, content rating, privacy policy
5. Submit for review

## App ID

Configured in `capacitor.config.json`:
- **appId**: `com.retailconnect.gh`
- **appName**: RetailConnect

Change these before publishing if needed.
