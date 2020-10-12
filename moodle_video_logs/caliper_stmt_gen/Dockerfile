FROM composer AS builder
WORKDIR /build
COPY composer.json .
RUN composer install --no-dev
RUN composer dumpautoload -o

FROM php:7.1-alpine

RUN apk update && \
    apk --update-cache add gcc g++ python3 python3-dev

RUN pip3 install --upgrade pip && \
    pip3 install numpy pandas

WORKDIR /dump
COPY --from=builder /build/vendor ./vendor
COPY . .
