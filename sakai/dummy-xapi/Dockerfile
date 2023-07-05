FROM node:12.22.0

LABEL version="1.0.0"

WORKDIR /usr/local/src
RUN mkdir dummy-xapi

WORKDIR /usr/local/src/dummy-xapi
COPY dummy-xapi .
RUN npm i
