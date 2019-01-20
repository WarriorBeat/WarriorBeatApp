#!/usr/bin/env bash

# Setup Travis CI

ENV_DIR=$1

ENV_MAIN="$ENV_DIR/.env"
ENV_DEV="$ENV_DIR/.env.dev"
ENV_STAGING="$ENV_DIR/.env.staging"
ENV_RELEASE="$ENV_DIR/.env.release"

ENVIRONS=($ENV_DEV $ENV_STAGING $ENV_RELEASE)

# Create Env Files
touch $ENV_MAIN
for file in "${ENVIRONS[@]}"; do
  echo "export NODE_PATH=${NODE_PATH}" > $file
  echo "export API_DEV=${API_DEV}" >> $file
  cat $file
done

echo $NODE_PATH