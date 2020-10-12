/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'log_queries', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    qtype: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sqltext: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    sqlparams: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    error: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    info: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    backtrace: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    exectime: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    timelogged: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    tableName: config.db.prefix + 'log_queries'
  });
};
