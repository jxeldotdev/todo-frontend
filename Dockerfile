FROM node:lts-alpine as deps

RUN apk add --no-cache \
        python3 \
        py3-pip \
    && pip3 install --upgrade pip \
    && pip3 install \
        awscli \
    && rm -rf /var/cache/apk/* \
    && mkdir -p /usr/local/src/app/


ADD package-lock.json package.json /usr/local/src/app/

WORKDIR /usr/local/src/app

RUN npm install 

FROM deps

ADD docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

RUN chmod +x /usr/local/bin/docker-entrypoint.sh

