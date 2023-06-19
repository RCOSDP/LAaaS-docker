#!/bin/bash

# Delete DB for tests

. .env.testing

dropdb $DB_LOG_DATABASE -p $DB_LOG_PORT
dropuser $DB_LOG_USERNAME -p $DB_LOG_PORT
dropdb $DB_EPPN_DATABASE -p $DB_EPPN_PORT
dropuser $DB_EPPN_USERNAME -p $DB_EPPN_PORT
dropdb $DB_DATABASE -p $DB_PORT
dropuser $DB_USERNAME -p $DB_PORT
