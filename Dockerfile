FROM node:14.17.1 as build

MAINTAINER "Divya Phani Tejaswi <divya.phani@vapprtech.com>"

WORKDIR /crm_content_ws

COPY package.json /crm_content_ws

COPY package-lock.json /crm_content_ws

RUN apt update && apt install -y curl && rm -rf /var/lib/apt/lists/*

RUN apt-get update && apt-get install -y gnupg

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -

RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt update && apt install -y yarn

RUN apt install --no-install-recommends yarn

RUN yarn --version

COPY . /crm_content_ws

RUN yarn install

RUN yarn start

EXPOSE 1337

CMD yarn develop

