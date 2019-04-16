#!/usr/bin/env bash

# Generates Releases notes from changelog
NOTES="`pwd`/notes.md"
if [ -f "$NOTES" ]; then
	rm "$NOTES"
fi
npx conventional-changelog -p metahub -i "$NOTES" -s -r 2
RELEASE_NOTES=`cat "$NOTES"`
rm "$NOTES"
printf "$RELEASE_NOTES\n"
