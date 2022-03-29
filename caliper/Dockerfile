FROM composer:1.9 AS builder

LABEL version="2.2.0"

WORKDIR /stage
COPY . .
RUN composer install --no-dev && \
    composer build
WORKDIR tenantcreator
RUN composer install --no-dev

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
COPY --from=builder /stage /app

ENTRYPOINT [ "/app/caliper-cli" ]
CMD ["generate"]
