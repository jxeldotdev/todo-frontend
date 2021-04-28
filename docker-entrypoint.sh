#!/bin/sh

case "$@" in 
    test)
        echo "Command $@ not implemented yet" 1>&2
        exit 1
        ;;
    serve)
        npm run serve
        ;;
    build)
        npm run build
        ;;
    *)
        ;;
esac