#!/bin/bash

# Delete DB for tests

. .env.testing

dropdb $DB_LOG_DATABASE -p $DB_LOG_PORT
dropuser $DB_LOG_USERNAME -p $DB_LOG_PORT
dropdb $DB_DATABASE -p $DB_PORT
dropuser $DB_USERNAME -p $DB_PORT
