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

case "$@" in
    web)
        sed -i "s/http:\/\/localhost:8080/$BACKEND_PROTO:\/\/$BACKEND_HOST:$BACKEND_PORT/" /usr/share/nginx/html/config.json
        echo "Updated Backend API URL at /usr/share/nginx/html/config.json to $BACKEND_PROTO://$BACKEND_HOST:$BACKEND_PORT"
        exec nginx -g 'daemon off;'
        ;;
    deploy)
        exec /usr/local/bin/deploy.sh
        ;;
    test)
        exec pytest -vvv
        ;;
    sh)
        exec /bin/sh
        ;;
    *)
        echo "Unknown command specified - command was $@" 1>&2
        echo "Available commands: web, deploy, test, sh" 1>&2
        exit 1 
        ;;
esac