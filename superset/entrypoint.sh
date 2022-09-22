#!/usr/bin/env bash

if [ "${#}" -ne 0 ]; then
  exec "${@}"
else
  gunicorn \
    -w 10 \
    --worker-connections 1000 \
    --timeout 120 \
    -b 0.0.0.0:8088 \
    --limit-request-line 0 \
    --limit-request-field_size 0 \
    "superset.app:create_app()"
fi
