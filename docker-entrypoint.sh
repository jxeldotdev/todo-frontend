#!/bin/sh

if ! env | grep -q BACKEND_PROTO; then
    BACKEND_PROTO="http"
fi
if ! env | grep -q BACKEND_PORT; then
    BACKEND_PORT="80"
fi
if ! env | grep -q BACKEND_HOST; then
    BACKEND_HOST="localhost"
fi

sed -i "s/http:\/\/localhost:8080/$BACKEND_PROTO:\/\/$BACKEND_HOST:$BACKEND_PORT/" /usr/share/nginx/html/config.json

echo "Updated Backend API URL at /usr/share/nginx/html/config.json to $BACKEND_PROTO://$BACKEND_HOST:$BACKEND_PORT"

exec nginx