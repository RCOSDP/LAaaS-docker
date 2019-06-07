FROM composer AS builder
WORKDIR /build
COPY composer.json .
RUN composer install --no-dev
RUN composer dumpautoload -o

FROM php:7.3-alpine

RUN apk update && \
    apk --no-cache upgrade && \
    apk --no-cache add postgresql-dev && \
    docker-php-ext-install pdo pdo_pgsql pgsql mbstring

WORKDIR /dump
COPY --from=builder /build/vendor ./vendor
COPY . .
