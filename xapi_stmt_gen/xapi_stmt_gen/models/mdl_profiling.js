/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'profiling', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    runid: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    data: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    totalexecutiontime: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    totalcputime: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    totalcalls: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    totalmemory: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    runreference: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    runcomment: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    timecreated: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    tableName: config.db.prefix + 'profiling'
  });
};
