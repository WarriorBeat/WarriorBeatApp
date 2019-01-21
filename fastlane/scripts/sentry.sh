#!/bin/bash

# Handles Sentry Properties and Releases

set -e

ROOT=$(git rev-parse --show-toplevel)

SENTRY_IOS="$ROOT/ios/sentry.properties"
SENTRY_AND="$ROOT/android/sentry.properties"
SENTRY_FILES=($SENTRY_IOS $SENTRY_AND)

SENTRY_KEYS=("defaults.url" "defaults.org" "defaults.project" "auth.token" "cli.executable")
SENTRY_VALS=("https://sentry.io/" "warriorbeat" "warriorbeatapp" $SENTRY_AUTH_TOKEN "node_modules/@sentry/cli/bin/sentry-cli")

# Injects Sentry Properties from Environment
load() {
    printf "Injecting Sentry Properties...\n"
    for file in "${SENTRY_FILES[@]}"; do
        printf "Properties File => $file\n"
        if [ ! -f $file ]; then
        printf "File not found, creating...\n"
            touch $file
        fi
        # Clear File Contents
        echo "" > $file
        for i in "${!SENTRY_KEYS[@]}"; do
            printf "%s=%s\n" "${SENTRY_KEYS[$i]}" "${SENTRY_VALS[$i]}" >> $file
        done
        printf "Sentry Properties injected.\n\n"
    done
}

# Associates commits and Finalizes release on sentry
release() {
    printf "Creating Sentry Release...\n"
    # Get Version ID
    VERSION_PREFIX=$1
    VERSION_ID=$(git describe --tags `git rev-list --tags --max-count=1`)
    VERSION="${VERSION_PREFIX}-${VERSION_ID#'v'}"

    # Associate commits and finalize release
    sentry-cli releases set-commits --auto "$VERSION"
    sentry-cli releases finalize "$VERSION"
    sentry-cli releases list  --no-abbrev
}

# Handle args
for arg in "$@"
do
    case $arg in
        "load" ) load;;
        "release" ) release "$2";;
    esac
done