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

# POSIX Compatibility
if hash gsed 2>/dev/null; then
    ssed='gsed'
else
    ssed='sed'
fi

if [[ $CLEAN = 1 ]]; then
    printf "Removing $1 App Secret from: $CONFIG \n"
    echo
    $ssed -i 's/'$SECRET'/APP_SECRET\$/g' $CONFIG
    grep --color=always "APP_SECRET" $CONFIG
else
    printf "Inserting $1 App Secret into: $CONFIG \n"
    echo
    $ssed -i 's/APP_SECRET\$/'$SECRET'/g' $CONFIG
    grep --color=always $SECRET $CONFIG
fi

