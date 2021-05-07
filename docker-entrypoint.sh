#!/bin/sh
set -eu

DIR=/usr/local/src/app/
cd $DIR

extract_node_modules() {

    if [ ! -d $DIR/node_modules ]
    then
        echo "node_modules dir does not exist, extracting compressed archive"
        tar -xzf $DIR/node_modules.tar.gz $DIR
        return 1
    else
        echo "node_modules directory is present, removing archive"
        rm -vf "$DIR/node_modules.tar.gz"
    fi
}


# TODO: UNZIP NODE_MODULES
case "$@" in 

    test)
        extract_node_modules
        npm run lint
        npm run test:unit
        ;;
    serve)
        extract_node_modules
        npm run serve
        ;;
    nginx)
        exit 1
        ;;
    build)
        extract_node_modules
        npm run build
        ;;
    deploy)
        # TODO: deploy to s3 using aws cli
        exit 1
        ;;
    *)
        extract_node_modules
        $@
        ;;
esac