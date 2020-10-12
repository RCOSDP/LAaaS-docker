/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'mnet_log', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    hostid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    remoteid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    time: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    userid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    ip: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    course: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    coursename: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    module: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    cmid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    info: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: config.db.prefix + 'mnet_log'
  });
};
