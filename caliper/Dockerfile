FROM composer:1.9 AS builder
WORKDIR /stage
COPY . .
RUN composer install --no-dev && \
    composer build

FROM php:7.3-alpine AS runtime
WORKDIR /app
RUN apk update &&\
    apk --no-cache add sqlite postgresql-dev autoconf &&\
    docker-php-ext-install \
        pdo \
        mysqli pdo_mysql\
        pgsql pdo_pgsql\
        mbstring &&\
    docker-php-ext-enable pdo pdo_pgsql pdo_mysql
COPY --from=builder /stage/builds/caliper-cli /app

ENTRYPOINT [ "/app/caliper-cli" ]
CMD ["generate"]