'use strict';
const generator = require('./generator');
const log4js = require('log4js');
const logger = log4js.getLogger();

generator().then(() => {
}).catch((err) => {
  logger.error(err);
});
