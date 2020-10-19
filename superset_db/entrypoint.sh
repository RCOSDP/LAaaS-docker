#!/usr/bin/env bash

if [ -z "$(ls -A $PGDATA)" ]; then
  initdb -E UTF8 --locale=C
  cp /init/pg_hba.conf /init/postgresql.conf "$PGDATA"/
  pg_ctl -w start
  psql -f /init/setup.sql
  pg_ctl -w stop
fi

exec "$@"
