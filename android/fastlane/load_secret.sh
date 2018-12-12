#!/usr/bin/env bash

# Insert App Secret
ANDROIDCONFIG=../app/src/main/assets/appcenter-config.json

if [[ $1 = "clean" ]]; then
    sed -i '' 's/'$ANDROID_APP_SECRET'/ANDROID_APP_SECRET\$/g' $ANDROIDCONFIG
else
    sed -i '' 's/ANDROID_APP_SECRET\$/'$ANDROID_APP_SECRET'/g' $ANDROIDCONFIG
fi