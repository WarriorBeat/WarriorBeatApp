#!/usr/bin/env bash

# Inserts App Secret 

CLEAN=0
for arg in "$@"
do
    case $arg in 
        "android" ) SECRET="$ANDROID_APP_SECRET";;
        "ios" ) SECRET="$IOS_APP_SECRET";;
        "--clean" ) CLEAN=1;;
    esac
done

CONFIG="${@: -1}"

if [[ $CLEAN = 1 ]]; then
    echo "Removing $1 App Secret from: $CONFIG"
    echo
    sed -i 's/'$SECRET'/APP_SECRET\$/g' $CONFIG
    grep --color=always -z "APP_SECRET" $CONFIG
else
    echo "Inserting $1 App Secret into: $CONFIG \n"
    echo
    sed -i 's/APP_SECRET\$/'$SECRET'/g' $CONFIG
    grep --color=always -z $SECRET $CONFIG
fi

