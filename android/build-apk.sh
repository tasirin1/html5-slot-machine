#!/bin/bash
# Manual APK build script - works without Gradle
set -e

echo "=== Android APK Builder ==="

# Configuration
ANDROID_SDK="${ANDROID_HOME:-/usr/local/lib/android/sdk}"
JAVA_HOME="${JAVA_HOME:-/usr/lib/jvm/java-17-openjdk-arm64}"
export PATH="$JAVA_HOME/bin:$ANDROID_SDK/cmdline-tools/latest/bin:$ANDROID_SDK/build-tools/34.0.0:$ANDROID_SDK/platform-tools:$PATH"
export ANDROID_HOME="$ANDROID_SDK"

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
APP_DIR="$PROJECT_DIR/app"
SRC_DIR="$APP_DIR/src/main"
BUILD_DIR="$PROJECT_DIR/build-out"
DIST_DIR="$PROJECT_DIR/../dist"

echo "Project: $PROJECT_DIR"
echo "Android SDK: $ANDROID_SDK"
echo "Java: $(java -version 2>&1 | head -1)"

# Clean
rm -rf "$BUILD_DIR"
mkdir -p "$BUILD_DIR/classes"
mkdir -p "$BUILD_DIR/dex"
mkdir -p "$BUILD_DIR/apk"
mkdir -p "$BUILD_DIR/apk/assets/www"
mkdir -p "$BUILD_DIR/apk/META-INF"
mkdir -p "$BUILD_DIR/libs"
OUTPUT_DIR="$PROJECT_DIR/output"
mkdir -p "$OUTPUT_DIR"

# Download NanoHTTPd
NANO_JAR="$BUILD_DIR/libs/nanohttpd.jar"
if [ ! -f "$NANO_JAR" ]; then
    echo "Downloading NanoHTTPd..."
    curl -sL -o "$NANO_JAR" "https://repo1.maven.org/maven2/org/nanohttpd/nanohttpd/2.3.1/nanohttpd-2.3.1.jar"
fi

ANDROID_JAR="$ANDROID_SDK/platforms/android-34/android.jar"

# Step 1: Compile Java sources
echo ""
echo "=== Compile Java ==="
find "$SRC_DIR/java" -name "*.java" > "$BUILD_DIR/sources.txt"
javac -d "$BUILD_DIR/classes" \
    -cp "$NANO_JAR:$ANDROID_JAR" \
    -source 17 -target 17 \
    @"$BUILD_DIR/sources.txt" 2>&1
echo "Java compilation OK"

# Step 2: Convert to DEX
echo ""
echo "=== DEX ==="
java -cp "$ANDROID_SDK/build-tools/34.0.0/lib/d8.jar" \
    com.android.tools.r8.D8 \
    --lib "$ANDROID_JAR" \
    --output "$BUILD_DIR/dex" \
    --min-api 24 \
    $(find "$BUILD_DIR/classes" -name "*.class") 2>&1
echo "DEX conversion OK"

# Step 3: Copy assets
echo ""
echo "=== Assets ==="
if [ -d "$DIST_DIR" ]; then
    cp -r "$DIST_DIR/"* "$BUILD_DIR/apk/assets/www/"
    # Download bootstrap locally
    curl -sL -o "$BUILD_DIR/apk/assets/www/bootstrap-reboot.min.css" \
        "https://unpkg.com/bootstrap@5.2.3/dist/css/bootstrap-reboot.min.css"
    # Replace CDN link with local
    sed -i 's|https://unpkg.com/bootstrap@5.2.3/dist/css/bootstrap-reboot.min.css|bootstrap-reboot.min.css|' \
        "$BUILD_DIR/apk/assets/www/index.html" 2>/dev/null || true
else
    echo "WARNING: No dist directory found at $DIST_DIR"
    mkdir -p "$BUILD_DIR/apk/assets/www"
    echo "<html><body><h1>Slot Machine</h1></body></html>" > "$BUILD_DIR/apk/assets/www/index.html"
fi
echo "Assets OK"

# Step 4: Compile resources with AAPT2
echo ""
echo "=== Resources ==="
mkdir -p "$BUILD_DIR/compiled_res"

AAPT2="$ANDROID_SDK/build-tools/34.0.0/aapt2"
MANIFEST="$SRC_DIR/AndroidManifest.xml"
RES_DIR="$SRC_DIR/res"

# Handle the manual manifest
if [ ! -f "$MANIFEST" ]; then
    echo "ERROR: AndroidManifest.xml not found!"
    exit 1
fi

# Compile resources
echo "Compiling resources..."
"$AAPT2" compile --dir "$RES_DIR" -o "$BUILD_DIR/compiled_res/resources.zip" 2>&1
echo "Linking resources..."
"$AAPT2" link \
    -I "$ANDROID_JAR" \
    --manifest "$MANIFEST" \
    --auto-add-overlay \
    -o "$BUILD_DIR/apk/resources.ap_" \
    "$BUILD_DIR/compiled_res/resources.zip" 2>&1
echo "Resources OK"

# Step 5: Assemble APK
echo ""
echo "=== Assemble APK ==="
cd "$BUILD_DIR/apk"
# Extract compiled resources
unzip -q resources.ap_
rm -f resources.ap_

# Copy DEX files
cp "$BUILD_DIR/dex/"*.dex .

# Create minimal MANIFEST.MF
cat > META-INF/MANIFEST.MF << 'MANIFEST'
Manifest-Version: 1.0
Created-By: Manual Build

MANIFEST

# Create unsigned APK
echo "Creating unsigned APK..."
find . -type f | sort | zip -0 -X "$OUTPUT_DIR/unsigned.apk" -@ 2>&1

# Align
echo "Aligning..."
"$ANDROID_SDK/build-tools/34.0.0/zipalign" -f -p -v 4 \
    "$OUTPUT_DIR/unsigned.apk" "$OUTPUT_DIR/aligned.apk" 2>&1

echo "APK assembled OK"

# Step 6: Sign
echo ""
echo "=== Sign ==="
if [ ! -f "$BUILD_DIR/debug.keystore" ]; then
    keytool -genkey -v \
        -keystore "$BUILD_DIR/debug.keystore" \
        -alias androiddebugkey \
        -storepass android \
        -keypass android \
        -keyalg RSA \
        -keysize 2048 \
        -validity 10000 \
        -dname "CN=Android Debug, O=Android, C=US" 2>&1
fi

APKSIGNER="$ANDROID_SDK/build-tools/34.0.0/lib/apksigner.jar"
java -jar "$APKSIGNER" sign \
    --ks "$BUILD_DIR/debug.keystore" \
    --ks-pass pass:android \
    --key-pass pass:android \
    --ks-key-alias androiddebugkey \
    --v1-signing-enabled true \
    --v2-signing-enabled true \
    --out "$OUTPUT_DIR/app-debug.apk" \
    "$OUTPUT_DIR/aligned.apk" 2>&1

echo ""
echo "============================================"
echo "BUILD COMPLETE!"
echo "APK: $OUTPUT_DIR/app-debug.apk"
ls -lh "$OUTPUT_DIR/app-debug.apk"
