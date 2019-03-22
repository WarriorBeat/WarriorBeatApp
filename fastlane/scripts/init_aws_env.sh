#!/usr/bin/env bash

# Headless Init of AWS Environment

set -e
IFS='|'

ROOT=$(git rev-parse --show-toplevel)
AWSCONFIG=~/.aws/config
AWSCREDS=~/.aws/credentials

# Create AWS Config
if [ ! -f $AWSCREDS ]; then
    printf "Creating AWS Config...\n"
    mkdir ~/.aws
    # credentials
    printf "[default]\naws_access_key_id = %s\naws_secret_access_key = %s\n" "$AWS_ACCESS_KEY_ID" "$AWS_SECRET_ACCESS_KEY" > $AWSCREDS
    # config
    printf "[default]\nregion = %s\n" "$AWS_DEFAULT_REGION" > $AWSCONFIG
    printf "Config Generated.\n"
fi

# Push Root Directory
pushd $ROOT

# Env Name
AMPLIFY="{\
\"envName\":\"dev\"\
}"

# Execute Headless
amplify init \
--amplify $AMPLIFY \
--yes

# Sync Env
amplify env pull

# Pull Latest Exports File
curl "$AWS_EXPORTS_URL" -o aws-exports.js

# Return 
popd
