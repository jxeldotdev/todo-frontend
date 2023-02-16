FROM node:14-alpine AS build

WORKDIR /app
COPY package*.json yarn* ./
RUN apk add python3 make
RUN yarn install
ADD ./ .
RUN yarn run build

# FROM nginx:stable-alpine
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# COPY --from=build /app/dist/ /usr/share/nginx/html

ADD docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT [ "/usr/local/bin/docker-entrypoint.sh" ]