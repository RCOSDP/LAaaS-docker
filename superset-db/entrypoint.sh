#!/usr/bin/env bash

if [ -z "$(ls -A $PGDATA)" ]; then
  SETUP_PORT=5433
  initdb -E UTF8 --locale=C
  cp /init/pg_hba.conf /init/postgresql.conf "$PGDATA"/
  pg_ctl -o "-p $SETUP_PORT" -w start
  /init/setup.sh $SETUP_PORT
  pg_ctl -o "-p $SETUP_PORT" -w -m smart stop
fi

exec "$@"
