/* Create database used to store data analysis results done with JupyterHub */
CREATE DATABASE jupyter;

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
  --uri 'mongodb://learninglocker_mongo:27017',
  host 'learninglocker_mongo',
  port '27017',
  db 'learninglocker',
  collection 'users'
);
CREATE FOREIGN TABLE xapi_statements (
 "_id" VARCHAR NOT NULL,
 "active" BOOLEAN,
 "client_id" VARCHAR,
 "lrs._id" VARCHAR NOT NULL,
 "lrs_id" VARCHAR,
 "statement.actor.account.homePage" VARCHAR,
 "statement.actor.account.name" VARCHAR,
 "statement.actor.objectType" VARCHAR,
 "statement.authority.mbox" VARCHAR,
 "statement.authority.name" VARCHAR,
 "statement.authority.objectType" VARCHAR,
 "statement.context.contextActivities.parent.definition.name" VARCHAR,
 "statement.context.contextActivities.parent.definition.name.type" VARCHAR,
 "statement.context.contextActivities.parent.id" VARCHAR,
 "statement.context.contextActivities.parent.objectType" VARCHAR,
 "statement.context.platform" VARCHAR,
 "statement.context.statement.id" VARCHAR,
 "statement.context.statement.objectType" VARCHAR,
 "statement.id" VARCHAR,
 "statement.object.definition.description.en" VARCHAR,
 "statement.object.definition.name.en" VARCHAR,
 "statement.object.definition.type" VARCHAR,
 "statement.object.definition.moreInfo" VARCHAR,
 "statement.object.id" VARCHAR,
 "statement.object.objectType" VARCHAR,
 "statement.result.score.scaled" INTEGER,
 "statement.result.score.raw" INTEGER,
 "statement.result.score.min" INTEGER,
 "statement.result.score.max" INTEGER,
 "statement.result.success" BOOLEAN,
 "statement.result.completion" BOOLEAN,
 "statement.result.duration" VARCHAR,
 "statement.stored" VARCHAR,
 "statement.timestamp" VARCHAR,
 "statement.verb.display.en" VARCHAR,
 "statement.verb.display.ja" VARCHAR,
 "statement.verb.id" VARCHAR,
 "statement.version" VARCHAR,
 "stored" TIMESTAMP,
 "timestamp" TIMESTAMP,
 "voided" BOOLEAN
) SERVER mongodb_learninglocker_server OPTIONS (
  --uri 'mongodb://learninglocker_mongo:27017',
  host 'learninglocker_mongo',
  port '27017',
  db 'learninglocker',
  collection 'statements'
);

/* Create database that stores Caliper statements */
CREATE DATABASE openlrw;
\c openlrw
CREATE EXTENSION multicorn;
CREATE SERVER mongodb_openlrw_server FOREIGN DATA WRAPPER multicorn OPTIONS (
  wrapper 'yam_fdw.Yamfdw'
);
CREATE FOREIGN TABLE caliper_statements (
 "_id" VARCHAR NOT NULL,
 "userId" VARCHAR,
 "organizationId" VARCHAR,
 "tenantId" VARCHAR,
 "event._id" VARCHAR,
 "event.context" VARCHAR,
 "event.type" VARCHAR,
 "event.agent._id" VARCHAR,
 "event.agent.type" VARCHAR,
 "event.agent.name" VARCHAR,
 "event.agent.description" VARCHAR,
 "event.action" VARCHAR,
 "event.object._id" VARCHAR,
 "event.object.type" VARCHAR,
 "event.object.name" VARCHAR,
 "event.object.currentTime" VARCHAR,
 "event.object.extensions.courseId" VARCHAR,
 "event.object.extensions.nonce" VARCHAR,
 "event.object.extensions.videoplayerlog" VARCHAR,
 "event.target._id" VARCHAR,
 "event.target.type" VARCHAR,
 "event.target.currentTime" VARCHAR,
 "event.edApp._id" VARCHAR,
 "event.edApp.type" VARCHAR,
 "event.generated._id" VARCHAR,
 "event.generated.type" VARCHAR,
 "event.eventTime" TIMESTAMP
) SERVER mongodb_openlrw_server OPTIONS (
  --uri 'mongodb://openlrw_mongo:27017',
  host 'openlrw_mongo',
  port '27017',
  db 'caliper',
  user 'caliper',
  password 'caliper',
  collection 'mongoEvent'
);
