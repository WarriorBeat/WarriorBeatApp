#!/bin/bash

# Downloads Android SDK Licenses for Travis CI
set -e

LICENSE="$ANDROID_HOME/licenses/android-sdk-license"

# Download if it isn't cached
if [ ! -f $LICENSE ]; then
    printf "Android SDK Licenses not found, downloading...\n"
    pushd $ANDROID_HOME
    curl -sS --fail $SDK_LICENSE_URL > licenses.zip
    unzip licenses.zip
    rm licenses.zip
    popd
else
    printf "Android SDK Licenses appear to be cached, skipping download...\n"
fi