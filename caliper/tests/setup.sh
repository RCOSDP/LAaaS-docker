#!/bin/bash

# Create DB for tests

set -e
. .env.testing

createuser -d $DB_LOG_USERNAME -p $DB_LOG_PORT
createdb $DB_LOG_DATABASE -U $DB_LOG_USERNAME -p $DB_LOG_PORT
psql $DB_LOG_DATABASE -U $DB_LOG_USERNAME -p $DB_LOG_PORT << EOSQL
CREATE TABLE execution_logs (
  id serial,
  last_id bigint,
  translated bigint,
  failed bigint,
  date text
);

CREATE TABLE failed_logs (
  id serial,
  execution_id bigint,
  model text,
  model_id text
);
EOSQL

createuser -d $DB_USERNAME -p $DB_PORT
createdb $DB_DATABASE -U $DB_USERNAME -p $DB_PORT
psql $DB_DATABASE -U $DB_USERNAME -p $DB_PORT << EOSQL
CREATE TABLE logstore_standard_log (
  id serial,
  eventname text,
  userid text,
  component text,
  target text,
  objecttable text,
  objectid bigint,
  action text,
  crud text,
  edulevel bigint,
  contextid bigint,
  contextlevel bigint,
  contextinstanceid bigint,
  courseid bigint,
  relateduserid text,
  timecreated bigint,
  ip text
);

CREATE TABLE "user" (
  id serial,
  username text,
  firstname text,
  lastname text,
  description text,
  email text,
  timemodified bigint,
  timecreated bigint
);

CREATE TABLE assign_submission (
  id serial,
  assignment bigint,
  userid text,
  timecreated bigint,
  timemodified bigint,
  status text,
  attemptnumber bigint,
  latest bigint
);

CREATE TABLE assign (
  id serial,
  course bigint,
  name text,
  intro text,
  duedate bigint,
  allowsubmissionsfromdate text,
  grade bigint,
  timemodified bigint,
  gradingduedate bigint,
  maxattempts bigint
);

CREATE TABLE assign_grades (
  id serial,
  assignment bigint,
  userid text,
  timecreated bigint,
  timemodified bigint,
  grader text,
  grade bigint,
  attemptnumber bigint
);

CREATE TABLE assignfeedback_comments (
  id serial,
  assignment bigint,
  grade bigint,
  commenttext text,
  commentformat bigint
);

CREATE TABLE forum (
  id serial,
  course bigint,
  type text,
  name text,
  intro text,
  timemodified bigint,
  timecreated bigint
);

CREATE TABLE forum_subscriptions (
  id serial,
  userid text,
  forum bigint
);

CREATE TABLE forum_discussions (
  id serial,
  course bigint,
  forum bigint,
  name text,
  userid text,
  usermodified text
);

CREATE TABLE quiz (
  id serial,
  course bigint,
  name text,
  intro text,
  introformat bigint,
  timeopen bigint,
  timeclose bigint,
  timelimit bigint,
  overduehandling text,
  preferredbehaviour text,
  attempts bigint,
  grade double precision,
  timemodified bigint,
  timecreated bigint
);

CREATE TABLE quiz_attempts (
  id serial,
  quiz bigint,
  userid text,
  attempt bigint,
  uniqueid bigint,
  layout text,
  state text,
  timestart bigint,
  timefinish bigint,
  timemodified bigint
);

CREATE TABLE course (
  id serial,
  category bigint,
  fullname text,
  timemodified bigint,
  timecreated bigint
);

CREATE TABLE course_categories (
  id serial,
  name text,
  timemodified bigint,
  timecreated bigint
);
EOSQL
