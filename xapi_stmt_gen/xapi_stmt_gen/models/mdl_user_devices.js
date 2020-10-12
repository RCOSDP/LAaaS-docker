/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'user_devices', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    appid: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    platform: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    version: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    pushid: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    uuid: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    timecreated: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    timemodified: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    tableName: config.db.prefix + 'user_devices'
  });
};
