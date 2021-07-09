FROM node:lts-alpine as build

RUN mkdir -p /usr/local/src/app/

WORKDIR /usr/local/src/app

ADD src tests babel.config.js jest.config.js package*.json cypress.json .eslintrc.js /usr/local/src/app/

RUN npm ci

# RUN npm run build

RUN tar -czf node_modules.tar.gz ./node_modules && rm -rf ./node_modules

# TODO:
# Remove node modules, run build after installing, then setup nginx for serving
# GitHub Actions will cache node modules - this way the docker image can be way smaller as devs will use volumes with node_modules installed :)

FROM build

ADD docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT [ "/usr/local/bin/docker-entrypoint.sh" ] 
