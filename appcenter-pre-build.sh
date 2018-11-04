#!/usr/bin/env bash

# Install awsamplifycli
yarn global add awsmobile-cli@1.1.5 --force

# Setup AWS User
echo "Setting up AWS Credentials..."
mkdir ~/.aws
AWSCRED=~/.aws/credentials
echo "[default]" > $AWSCRED
echo "aws_access_key_id = $AWS_ACCESS_KEY" >> $AWSCRED
echo "aws_secret_access_key = $AWS_SECRET_KEY" >> $AWSCRED

# Setup AWS Config
AWSCONFIG=~/.aws/config
echo "Creating AWS Config..."
echo "[default]" > $AWSCONFIG
echo "region = us-east-1" >> $AWSCONFIG

# Log AWS Setup
echo "AWS Setup Complete"
echo "AWS Credentials: "
cat $AWSCRED
echo ""
echo "AWS Config: "
cat $AWSCONFIG

# Create .env 
DOTENV=./.env
echo "Creating .env file..."
echo "API_DEV=$API_DEV" > $DOTENV
echo "NODE_PATH=$NODE_PATH" >> $DOTENV
echo ".env File: "
cat $DOTENV


# Init AWSMobile Project
echo Initializing AWSMobile Project...
export AWS_PROFILE=default
awsmobile init $AWS_PROJECT_ID -y

# Pull AWSMobile
echo y | awsmobile pull
