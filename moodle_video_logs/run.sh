#!/bin/bash

dir_name="moodle_video_logs"
path_to_log=$1

if [[ -f "$path_to_log" ]]; then
  cat "$path_to_log" | \
    docker run -i ${dir_name}_log_processor | \
    docker exec -i xapi_video_logs sh -c "cat - > /usr/local/src/xapi_stmt_gen/videojs.csv; npm start"
  cat "$path_to_log" | \
    docker run -i ${dir_name}_log_processor | \
    docker exec -i caliper_video_logs sh -c \
      "cat | python3 log_processor_for_caliper.py; php app/run.php /videojs.csv"
fi
