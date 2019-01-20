#!/bin/bash

# Loads Env Vars into Gradle Properties

set -e

# Setup Gradle Properties
GRADLE_PROP="~/.gradle/gradle.properties"

PROPS=("RELEASE_STORE_FILE" "RELEASE_KEY_ALIAS" "RELEASE_STORE_PASSWORD" "RELEASE_KEY_PASSWORD")
PROP_VALS=($RELEASE_STORE_FILE $RELEASE_KEY_ALIAS $RELEASE_STORE_PASSWORD $RELEASE_KEY_PASSWORD)

# Create file if needed
if [ ! -d "~/.gradle" ]; then
    mkdir "~/.gradle"
    touch $GRADLE_PROP
fi


# Export Properties to gradle.properties
printf "" > $GRADLE_PROP
for i in "${!PROPS[@]}"; do
  printf "%s=%s\n" "${PROPS[$i]}" "${PROP_VALS[$i]}" >> $GRADLE_PROP
done
