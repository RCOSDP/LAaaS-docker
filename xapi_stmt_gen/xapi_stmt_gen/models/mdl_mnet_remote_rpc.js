/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'mnet_remote_rpc', {
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
      allowNull: false
    }
  }, {
    tableName: config.db.prefix + 'mnet_remote_rpc'
  });
};
