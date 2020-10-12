/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'mnet_host2service', {
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
    serviceid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    publish: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    subscribe: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'mnet_host2service'
  });
};
