#!/usr/bin/env bash

# Handles Sentry Properties and Releases

set -e

ROOT=$(git rev-parse --show-toplevel)

SENTRY_IOS="$ROOT/ios/sentry.properties"
SENTRY_AND="$ROOT/android/sentry.properties"
SENTRY_FILES=($SENTRY_IOS $SENTRY_AND)

SENTRY_KEYS=("defaults.url" "defaults.org" "defaults.project" "auth.token" "cli.executable")
SENTRY_VALS=("https://sentry.io/" "warriorbeat" "warriorbeatapp" $SENTRY_AUTH_TOKEN "node_modules/@sentry/cli/bin/sentry-cli")

SENTRY_ARTIFACTS="$ROOT/dist"

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
    printf "Preparing Sentry Release...\n"
    # Get Args
    VERSION=$1
    SENTRY_ENV=$2
    DIST=$3
    DSYM_FILE="$SENTRY_ARTIFACTS/warriorbeatapp.app.dSYM.zip"

    # Associate commits
    sentry-cli releases set-commits --auto "$VERSION"

    # Upload Sourcemaps
    PROJECT_SLUG="${SENTRY_VALS[2]}"
    sentry_output="
    -------------------------------
    Uploading Sourcemaps:
      Project Slug: ${PROJECT_SLUG}
      Version: ${VERSION}
      Dist: ${DIST}
      Artifacts: ${SENTRY_ARTIFACTS}
      DSYM: ${DSYM_FILE}
    -------------------------------
    "
    printf "$sentry_output"
    sentry-cli releases -p "$PROJECT_SLUG" files "$VERSION" upload-sourcemaps \
    --dist "$DIST" \
    --strip-common-prefix \
    --rewrite "$SENTRY_ARTIFACTS" \
    --validate

    # DSYM File
    sentry-cli upload-dif -p "$PROJECT_SLUG" "$DSYM_FILE"

    # Set Environment
    sentry-cli releases deploys "$VERSION" new -e "$SENTRY_ENV"
    sentry-cli releases list --no-abbrev
    printf "Sentry Release Ready to Finalize\n"
}

# Handle args
for arg in "$@"
do
    case $arg in
        "load" ) load;;
        "release" ) release "$2" "$3" "$4";;
    esac
done