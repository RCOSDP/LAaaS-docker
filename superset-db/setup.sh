#!/usr/bin/env bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
/* Create database used to store data analysis results done with JupyterHub */
CREATE DATABASE jupyter;

/* Create database that stores xAPI statements */
CREATE DATABASE learninglocker;
\c learninglocker
CREATE EXTENSION multicorn;
CREATE SERVER mongodb_learninglocker_server FOREIGN DATA WRAPPER multicorn OPTIONS (
  wrapper 'yam_fdw.Yamfdw'
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
 "statement.actor.name" VARCHAR,
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
 "statement.result.score.raw" DOUBLE PRECISION,
 "statement.result.score.min" DOUBLE PRECISION,
 "statement.result.score.max" DOUBLE PRECISION,
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
  host '$LRS_HOST',
  port '$LRS_PORT',
  db '$LRS_DB',
  user '$LRS_DB_USER',
  password '$LRS_DB_PASSWORD',
  collection '$LRS_COLLECTION'
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
 "event.object.description" VARCHAR,
 "event.object.maxAttempts" VARCHAR,
 "event.object.maxScore" VARCHAR,
 "event.object.dateToStartOn" TIMESTAMP,
 "event.object.dateToSubmit" TIMESTAMP,
 "event.object.count" VARCHAR,
 "event.object.assignable._id" VARCHAR,
 "event.object.assignable.type" VARCHAR,
 "event.object.isPartOf._id" VARCHAR,
 "event.object.isPartOf.type" VARCHAR,
 "event.object.isPartOf.name" VARCHAR,
 "event.object.isPartOf.category" VARCHAR,
 "event.object.isPartOf.isPartOf._id" VARCHAR,
 "event.object.isPartOf.isPartOf.type" VARCHAR,
 "event.object.isPartOf.isPartOf.name" VARCHAR,
 "event.object.currentTime" VARCHAR,
 "event.object.extensions.courseId" VARCHAR,
 "event.object.extensions.nonce" VARCHAR,
 "event.object.extensions.videoplayerlog" VARCHAR,
 "event.target._id" VARCHAR,
 "event.target.type" VARCHAR,
 "event.target.currentTime" VARCHAR,
 "event.edApp._id" VARCHAR,
 "event.edApp.type" VARCHAR,
 "event.edApp.name" VARCHAR,
 "event.edApp.description" VARCHAR,
 "event.generated._id" VARCHAR,
 "event.generated.type" VARCHAR,
 "event.generated.scoreGiven" VARCHAR,
 "event.generated.comment" VARCHAR,
 "event.generated.count" VARCHAR,
 "event.generated.duration" VARCHAR,
 "event.generated.scoredBy._id" VARCHAR,
 "event.generated.scoredBy.type" VARCHAR,
 "event.generated.scoredBy.name" VARCHAR,
 "event.generated.scoredBy.description" VARCHAR,
 "event.eventTime" TIMESTAMP
) SERVER mongodb_openlrw_server OPTIONS (
  host '$LRW_HOST',
  port '$LRW_PORT',
  db '$LRW_DB',
  user '$LRW_DB_USER',
  password '$LRW_DB_PASSWORD',
  collection '$LRW_COLLECTION'
);
EOSQL
