#!/bin/bash

# Headless Init of AWS Environment

set -e
IFS='|'

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


# Env Name
AMPLIFY="{\
\"envName\":\"dev\"\
}"

# Execute Headless
amplify init \
--amplify $AMPLIFY \
--yes
