#!/usr/bin/env bash

USERNAME="${ADMIN_USERNAME:-admin}"
FIRSTNAME="${ADMIN_FIRSTNAME:-admin}"
LASTNAME="${ADMIN_LASTNAME:-user}"
EMAIL="${ADMIN_EMAIL:-admin@fab.org}"
PASSWORD="${ADMIN_PASSWORD:-admin}"

. /venv/bin/activate
superset db upgrade
superset fab create-admin \
  --username $USERNAME \
  --firstname $FIRSTNAME \
  --lastname $LASTNAME \
  --email $EMAIL \
  --password $PASSWORD
superset init
./create-data-sources.py $USERNAME $PASSWORD
