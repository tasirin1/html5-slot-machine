#!/bin/bash
set -e

export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-arm64
export ANDROID_HOME=/opt/android
export PATH=$JAVA_HOME/bin:/opt/android/cmdline-tools/latest/bin:$PATH

BASE_DIR="$(cd "$(dirname "$0")" && pwd)"
SRC_DIR="$BASE_DIR/app/src/main"
WEB_DIST="/root/proyek/html5-slot-machine/dist"
BUILD_DIR="$BASE_DIR/build-manual"
OUTPUT_DIR="$BUILD_DIR/output"

echo "=== Android Manual Build ==="
echo "Build dir: $BUILD_DIR"

# Clean
rm -rf "$BUILD_DIR"
mkdir -p "$BUILD_DIR/classes"
mkdir -p "$BUILD_DIR/dex"
mkdir -p "$BUILD_DIR/apk"
mkdir -p "$BUILD_DIR/apk/META-INF"
mkdir -p "$BUILD_DIR/libs"
mkdir -p "$OUTPUT_DIR"

# Download NanoHTTPd if not present
NANO_JAR="$BUILD_DIR/libs/nanohttpd.jar"
if [ ! -f "$NANO_JAR" ]; then
    echo "=== Downloading NanoHTTPd ==="
    curl -sL -o "$NANO_JAR" "https://repo1.maven.org/maven2/org/nanohttpd/nanohttpd/2.3.1/nanohttpd-2.3.1.jar" 2>&1
    echo "NanoHTTPd downloaded: $(file "$NANO_JAR")"
fi

# Get android.jar
ANDROID_JAR="$ANDROID_HOME/platforms/android-34/android.jar"
echo "Android JAR: $ANDROID_JAR"

echo ""
echo "=== Step 1: Compile Java ==="
find "$SRC_DIR/java" -name "*.java" > "$BUILD_DIR/sources.txt"
javac \
    -d "$BUILD_DIR/classes" \
    -cp "$NANO_JAR:$ANDROID_JAR" \
    -source 17 -target 17 \
    @"$BUILD_DIR/sources.txt" 2>&1
echo "Java compilation OK"

echo ""
echo "=== Step 2: Convert to DEX ==="
java -cp "$ANDROID_HOME/build-tools/34.0.0/lib/d8.jar" \
    com.android.tools.r8.D8 \
    --lib "$ANDROID_JAR" \
    --output "$BUILD_DIR/dex" \
    --min-api 24 \
    $(find "$BUILD_DIR/classes" -name "*.class") 2>&1
echo "DEX conversion OK"

echo ""
echo "=== Step 3: Copy assets ==="
# Copy web assets
cp -r "$WEB_DIST/"* "$BUILD_DIR/apk/assets/www/"
echo "Assets copied"

echo ""
echo "=== Step 4: Compile resources with AAPT2 ==="
# Create output directories for compiled resources
mkdir -p "$BUILD_DIR/compiled_res"
mkdir -p "$BUILD_DIR/linked_res"

# First, compile resources
ANDROID_MANIFEST="$SRC_DIR/AndroidManifest.xml"
RES_DIR="$SRC_DIR/res"

# Compile the manifest
/usr/bin/qemu-x86_64-static "$ANDROID_HOME/build-tools/34.0.0/aapt2.orig" compile \
    --dir "$RES_DIR" \
    -o "$BUILD_DIR/compiled_res/resources.zip" 2>&1
echo "Resources compiled"

# Link resources
/usr/bin/qemu-x86_64-static "$ANDROID_HOME/build-tools/34.0.0/aapt2.orig" link \
    -I "$ANDROID_JAR" \
    --manifest "$ANDROID_MANIFEST" \
    --auto-add-overlay \
    -o "$BUILD_DIR/apk/resources.ap_" \
    "$BUILD_DIR/compiled_res/resources.zip" 2>&1
echo "Resources linked"

echo ""
echo "=== Step 5: Assemble APK ==="
cd "$BUILD_DIR/apk"

# Copy DEX files
cp "$BUILD_DIR/dex/"*.dex .

# Extract resources.ap_ to get AndroidManifest.xml and resources
unzip -q resources.ap_
rm -f resources.ap_

# Remove original manifest if exists
rm -f AndroidManifest.xml

# Copy the compiled AndroidManifest.binary
# Actually, the manifest is in the resources archive already

# Ensure META-INF has MANIFEST.MF
cat > META-INF/MANIFEST.MF << 'MANIFEST'
Manifest-Version: 1.0
Created-By: Manual Build

MANIFEST

# Create APK (ZIP with specific alignment)
cd "$BUILD_DIR/apk"
find . -type f | sort | zip -0 -X "$OUTPUT_DIR/unsigned.apk" -@ 2>&1
echo "APK assembled"

echo ""
echo "=== Step 6: Zipalign ==="
/usr/bin/qemu-x86_64-static "$ANDROID_HOME/build-tools/34.0.0/zipalign.orig" \
    -f -p -v 4 \
    "$OUTPUT_DIR/unsigned.apk" "$OUTPUT_DIR/aligned.apk" 2>&1 || \
    cp "$OUTPUT_DIR/unsigned.apk" "$OUTPUT_DIR/aligned.apk"
echo "APK aligned"

echo ""
echo "=== Step 7: Generate debug keystore ==="
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
    echo "Debug keystore created"
fi

echo ""
echo "=== Step 8: Sign APK ==="
java -jar "$ANDROID_HOME/build-tools/34.0.0/lib/apksigner.jar" sign \
    --ks "$BUILD_DIR/debug.keystore" \
    --ks-pass pass:android \
    --key-pass pass:android \
    --ks-key-alias androiddebugkey \
    --v1-signing-enabled true \
    --v2-signing-enabled true \
    --v3-signing-enabled true \
    --v4-signing-enabled false \
    --out "$OUTPUT_DIR/slot-machine-debug.apk" \
    "$OUTPUT_DIR/aligned.apk" 2>&1
echo "APK signed"

echo ""
echo "=== BUILD COMPLETE ==="
echo "APK: $OUTPUT_DIR/slot-machine-debug.apk"
ls -lh "$OUTPUT_DIR/slot-machine-debug.apk"
