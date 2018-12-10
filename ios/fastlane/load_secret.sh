#!/usr/bin/env bash

# Insert App Secret
IOSCONFIG=../AppCenter-Config.plist

if [[ $1 = "clean" ]]; then
    sed -i '' 's/'$IOS_APP_SECRET'/IOS_APP_SECRET\$/g' $IOSCONFIG
else
    sed -i '' 's/IOS_APP_SECRET\$/'$IOS_APP_SECRET'/g' $IOSCONFIG
fi