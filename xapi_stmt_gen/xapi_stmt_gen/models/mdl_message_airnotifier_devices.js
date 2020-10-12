/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'message_airnotifier_devices', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userdeviceid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    enable: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    }
  }, {
    tableName: config.db.prefix + 'message_airnotifier_devices'
  });
};
