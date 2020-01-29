FROM node:10.15-alpine

WORKDIR /opt

# install dependecies
RUN apk update
RUN apk add --no-cache make bash

RUN npm i -g grenache-grape
