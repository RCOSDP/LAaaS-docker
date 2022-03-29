const config = require('./config/app');
const Sequelize = require('sequelize');

const dbConfig = new Sequelize(
  config.db.lms.database,
  config.db.lms.username,
  config.db.lms.password,
  {
    host: config.db.lms.host,
    port: config.db.lms.port,
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    logging: false
});

module.exports = dbConfig;
