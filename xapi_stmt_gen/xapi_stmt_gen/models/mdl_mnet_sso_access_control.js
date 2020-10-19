/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'mnet_sso_access_control', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    mnet_host_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    accessctrl: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'allow'
    }
  }, {
    tableName: config.db.prefix + 'mnet_sso_access_control'
  });
};
