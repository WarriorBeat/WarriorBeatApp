#!/usr/bin/env bash

# Inserts App Secret 

# Script Path
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

CLEAN_SECRET=0
for arg in "$@"
do
    case $arg in 
        "android" ) SECRET="$ANDROID_APP_SECRET";;
        "ios" ) SECRET="$IOS_APP_SECRET";;
        "--clean" ) CLEAN_SECRET=1;;
    esac
done

CONFIG="${@: -1}"

# POSIX Compatibility
ssed=$($DIR/compat.sh sed)

if [[ $CLEAN_SECRET = 1 ]]; then
    printf "\nRemoving $1 App Secret from: $CONFIG \n"
    $ssed -i 's/'$SECRET'/APP_SECRET\$/g' $CONFIG
    grep --color=always "APP_SECRET" $CONFIG
else
    printf "\nInserting $1 App Secret into: $CONFIG \n"
    $ssed -i 's/APP_SECRET\$/'$SECRET'/g' $CONFIG
    grep --color=always $SECRET $CONFIG
fi

