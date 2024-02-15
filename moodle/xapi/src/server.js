'use strict';
const generator = require('./generator');
const laDB = require('./la-db-config');
const lmsDB = require('./lms-db-config');
const log4js = require('log4js');
const logger = log4js.getLogger();

generator().then(() => {
  laDB.close();
  lmsDB.close();
}).catch((err) => {
  logger.error(err);
  laDB.close();
  lmsDB.close();
});
