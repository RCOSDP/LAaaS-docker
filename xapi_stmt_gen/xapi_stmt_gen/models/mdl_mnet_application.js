/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'mnet_application', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    display_name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    xmlrpc_server_url: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    sso_land_url: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    sso_jump_url: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: config.db.prefix + 'mnet_application'
  });
};
