/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'analytics_indicator_calc', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    starttime: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    endtime: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    contextid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    sampleorigin: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    sampleid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    indicator: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    value: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    timecreated: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    tableName: config.db.prefix + 'analytics_indicator_calc'
  });
};
