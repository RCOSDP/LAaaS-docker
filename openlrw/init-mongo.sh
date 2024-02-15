#!/bin/bash

echo 'Create OpenLRW user'

mongo admin \
  -u "${MONGO_INITDB_ROOT_USERNAME}" \
  -p "${MONGO_INITDB_ROOT_PASSWORD}" \
  --eval "db = db.getSiblingDB('$OPENLRW_DATABASE');db.createUser({user: '$OPENLRW_USERNAME',pwd: '$OPENLRW_PASSWORD',roles:[{role:'dbOwner',db: '$OPENLRW_DATABASE'}]});"