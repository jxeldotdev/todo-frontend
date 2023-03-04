FROM node:14-alpine AS build

WORKDIR /app
COPY package*.json yarn* ./
RUN apk update && apk add python3 make g++
RUN yarn install
ADD ./ .
RUN yarn run build

FROM python:3.8-alpine AS aws-cli-build
ENV AWSCLI_VERSION=2.11.0
RUN apk add tar gzip --no-cache 
RUN apk add --no-cache \
    curl \
    make \
    cmake \
    gcc \
    g++ \
    libc-dev \
    libffi-dev \
    openssl-dev \
    && curl https://awscli.amazonaws.com/awscli-${AWSCLI_VERSION}.tar.gz | tar -xz \
    && cd awscli-${AWSCLI_VERSION} \
    && ./configure --prefix=/opt/aws-cli/ --with-download-deps \
    && make \
    && make install

FROM nginx:stable-alpine
RUN apk --no-cache add groff
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/ /usr/share/nginx/html
COPY --from=aws-cli-build /opt/aws-cli/ /opt/aws-cli/
ADD docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
COPY ./scripts/deploy.sh /usr/local/bin/deploy.sh
RUN chmod +x /usr/local/bin/deploy.sh /usr/local/bin/docker-entrypoint.sh
ENTRYPOINT [ "/usr/local/bin/docker-entrypoint.sh" ]