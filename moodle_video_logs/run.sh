#!/bin/bash

dir_name="moodle_video_logs"
path_to_log=$1
lms_domain=$2

if [ $# != 2 ] ; then
  echo "Usage: run.sh <path_to_log> <lms_domain>"
  exit 1
fi

if [ -f "$path_to_log" ] ; then
  cat "$path_to_log" | \
    docker run -i -e LMS_DOMAIN=${lms_domain} ${dir_name}_log_processor | \
    docker exec -i xapi_video_logs sh -c "cat - > /usr/local/src/xapi_stmt_gen/videojs.csv; npm start"
  cat "$path_to_log" | \
    docker run -i -e LMS_DOMAIN=${lms_domain} ${dir_name}_log_processor | \
    docker exec -i caliper_video_logs sh -c \
      "cat | python3 log_processor_for_caliper.py; php app/run.php /videojs.csv"
fi
