#!/bin/sh

if ! aws; then
    echo "Unable to find AWS CLI installed, exiting." 1>&2
    exit 1
fi

for var in (AWS_ACCESS_KEY_ID)

# Deploy to S3
BUCKET_NAME=""
LOCAITON=""

aws s3 sync --delete --acl public-read $LOCATION s3://$BUCKET_NAME