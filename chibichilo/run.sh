#!/usr/bin/env bash
set -e

if [ $# != 3 ] || ([ $1 != "xapi" ] && [ $1 != "caliper" ]); then
  echo "Usage: run.sh [xapi|caliper] <PATH_TO_LOG> <LMS_DOMAIN>"
  exit 1
fi

if [ ! -f "$2" ]; then
  echo "Log file not found."
  exit 1
fi

CONTAINER=chibichilo-$1
if [ $1 = "xapi" ]; then
  SCRIPT="cat - > /app/videojs.csv; npm start"
elif [ $1 = "caliper" ]; then
  SCRIPT="cat | python3 log_processor_for_caliper.py; php app/run.php /videojs.csv"
fi
PATH_TO_LOG=$2
LMS_DOMAIN=$3

if [ -f "$PATH_TO_LOG" ] ; then
  cat "$PATH_TO_LOG" | \
    docker compose run -T -e LMS_DOMAIN=${LMS_DOMAIN} log-processor | \
    docker exec -i ${CONTAINER} sh -c "${SCRIPT}"
fi
