/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'analytics_predictions', {
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
    contextid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    sampleid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    rangeindex: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    prediction: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    predictionscore: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    calculations: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    timecreated: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    timestart: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    timeend: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    tableName: config.db.prefix + 'analytics_predictions'
  });
};
