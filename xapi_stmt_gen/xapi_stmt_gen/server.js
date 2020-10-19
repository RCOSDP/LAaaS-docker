'use strict';
const db = require('./db-config');
const generator = require('./generator');
const log4js = require('log4js');
const logger = log4js.getLogger();

generator().then(() => {
  db.close();
}).catch((err) => {
  logger.error(err);
  db.close();
});
