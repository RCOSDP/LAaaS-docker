FROM composer:2.0.8 AS builder
WORKDIR /build
COPY composer.json .
COPY composer.lock .
RUN composer install --no-dev
RUN composer dumpautoload -o

FROM php:7.3-alpine

LABEL version="1.0.0"

RUN echo "https://dl-cdn.alpinelinux.org/alpine/v3.13/community" >> /etc/apk/repositories
RUN apk update && \
    apk --update-cache add gcc g++ python3 python3-dev py3-numpy py3-pandas

WORKDIR /dump
COPY --from=builder /build/vendor ./vendor
COPY . .
