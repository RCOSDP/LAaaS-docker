/* Create database used to execute analytical models in customized Superset */
CREATE DATABASE superset;

/* Create database that stores xAPI statements */
CREATE DATABASE learninglocker;
\c learninglocker
CREATE EXTENSION multicorn;
CREATE SERVER mongodb_learninglocker_server FOREIGN DATA WRAPPER multicorn OPTIONS (
  wrapper 'yam_fdw.Yamfdw'
);
CREATE FOREIGN TABLE users (
  "_id" TEXT NOT NULL,
  "created_at" TIMESTAMP,
  "email" TEXT,
  "name" TEXT,
  "password" TEXT,
  "remember_token" TEXT,
  "role" TEXT,
  "updated_at" TIMESTAMP,
  "verified" TEXT
) SERVER mongodb_learninglocker_server OPTIONS (
  --uri 'mongodb://learning_locker:27017',
  host 'learning_locker',
  port '27017',
  db 'learninglocker',
  collection 'users'
);
CREATE FOREIGN TABLE statements (
 "_id" TEXT NOT NULL,
 "active" BOOLEAN,
 "client_id" TEXT,
 "lrs._id" TEXT NOT NULL,
 "lrs_id" TEXT,
 "statement.actor.account.homePage" TEXT,
 "statement.actor.account.name" TEXT,
 "statement.actor.objectType" TEXT,
 "statement.authority.mbox" TEXT,
 "statement.authority.name" TEXT,
 "statement.authority.objectType" TEXT,
 "statement.context.contextActivities.parent.definition.name" TEXT,
 "statement.context.contextActivities.parent.definition.name.type" TEXT,
 "statement.context.contextActivities.parent.id" TEXT,
 "statement.context.contextActivities.parent.objectType" TEXT,
 "statement.context.platform" TEXT,
 "statement.context.statement.id" TEXT,
 "statement.context.statement.objectType" TEXT,
 "statement.id" TEXT,
 "statement.object.definition.description.en-US" TEXT,
 "statement.object.definition.name.en-US" TEXT,
 "statement.object.definition.type" TEXT,
 "statement.object.id" TEXT,
 "statement.object.objectType" TEXT,
 "statement.result.completion" VARCHAR,
 "statement.result.score.max" VARCHAR,
 "statement.result.score.min" VARCHAR,
 "statement.result.score.raw" VARCHAR,
 "statement.result.score.scaled" VARCHAR,
 "statement.result.success" VARCHAR,
 "statement.stored" TEXT,
 "statement.timestamp" TEXT,
 "statement.verb.display.en-US" TEXT,
 "statement.verb.id" TEXT,
 "statement.version" TEXT,
 "stored" TIMESTAMP,
 "timestamp" TIMESTAMP,
 "voided" BOOLEAN
) SERVER mongodb_learninglocker_server OPTIONS (
  --uri 'mongodb://learning_locker:27017',
  host 'learning_locker',
  port '27017',
  db 'learninglocker',
  collection 'statements'
);
