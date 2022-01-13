const config = require('./config/app');
const Sequelize = require('sequelize');

const dbConfig = new Sequelize(
  config.db.la.database,
  config.db.la.username,
  config.db.la.password,
  {
    host: config.db.la.host,
    port: config.db.la.port,
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
