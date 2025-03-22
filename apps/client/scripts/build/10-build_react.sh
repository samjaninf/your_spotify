#!/bin/sh
set -e

echo "NODE_ENV is '$NODE_ENV'"

if [[ "$NODE_ENV" != "development" ]]
then
    yarn build
fi
