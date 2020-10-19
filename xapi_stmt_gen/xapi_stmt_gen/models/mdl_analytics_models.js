/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'analytics_models', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    enabled: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    trained: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
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
    predictionsprocessor: {
      type: DataTypes.STRING,
      allowNull: true
    },
    version: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    timecreated: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    timemodified: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    usermodified: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    tableName: config.db.prefix + 'analytics_models'
  });
};
