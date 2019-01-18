#!/usr/bin/env bash

# Associates commits and finalizes release on Sentry

# Get Version ID
VERSION_PREFIX=$1
VERSION_ID=$(git describe --tags `git rev-list --tags --max-count=1`)
VERSION="${VERSION_PREFIX}-${VERSION_ID#'v'}"

# Associate commits and finalize release
sentry-cli releases set-commits --auto "$VERSION"
sentry-cli releases finalize "$VERSION"
sentry-cli releases list  --no-abbrev