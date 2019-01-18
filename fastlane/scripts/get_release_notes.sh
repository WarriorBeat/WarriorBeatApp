#!/usr/bin/env bash

# Generates Releases notes from changelog

# Script Path
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# POSIX Compatibility
ssed=$($DIR/compat.sh sed)
hhead=$($DIR/compat.sh head)

PREV_VERSION=$(git describe --abbrev=0 --tags `git rev-list --tags --skip=1 --max-count=1`)
VERSION=$(git describe --tags `git rev-list --tags --max-count=1`)
CHANGELOG_PATH=$1

RELEASE_NOTES=$($ssed -n "/$(echo $VERSION)/,/$(echo $PREV_VERSION)/ p" $CHANGELOG_PATH | $hhead -n -2)
echo "$RELEASE_NOTES"