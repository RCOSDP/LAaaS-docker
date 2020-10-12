/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'analytics_train_samples', {
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
    analysableid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    timesplitting: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    fileid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    sampleids: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    timecreated: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'analytics_train_samples'
  });
};
