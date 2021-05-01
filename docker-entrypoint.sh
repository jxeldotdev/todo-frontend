#!/bin/sh

case "$@" in 

    test)
        npm run lint
        npm run test:unit
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