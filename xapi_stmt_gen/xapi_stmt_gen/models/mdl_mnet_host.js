/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'mnet_host', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    deleted: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    wwwroot: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    ip_address: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    public_key: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    public_key_expires: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    transport: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    portno: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    last_connect_time: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    last_log_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    force_theme: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    theme: {
      type: DataTypes.STRING,
      allowNull: true
    },
    applicationid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '1'
    },
    sslverification: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'mnet_host'
  });
};
