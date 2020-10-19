/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'mnet_rpc', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    functionname: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    xmlrpcpath: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    plugintype: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    pluginname: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    enabled: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    help: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    profile: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    classname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    static: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: config.db.prefix + 'mnet_rpc'
  });
};
