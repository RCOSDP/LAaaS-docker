#!/usr/bin/env bash

if [ "${#}" -ne 0 ]; then
  exec "${@}"
else
  gunicorn \
    -w 2 \
    --timeout 60 \
    -b 0.0.0.0:8088 \
    --limit-request-line 0 \
    --limit-request-field_size 0 \
    superset:app
fi
