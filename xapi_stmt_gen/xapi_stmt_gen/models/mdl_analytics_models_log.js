/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'analytics_models_log', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    modelid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    version: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    target: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    indicators: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    timesplitting: {
      type: DataTypes.STRING,
      allowNull: true
    },
    score: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: '0'
    },
    info: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    dir: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    timecreated: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    usermodified: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    tableName: config.db.prefix + 'analytics_models_log'
  });
};
