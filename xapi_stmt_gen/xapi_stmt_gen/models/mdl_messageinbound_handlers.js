/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'messageinbound_handlers', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    component: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    classname: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    defaultexpiration: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '86400'
    },
    validateaddress: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    enabled: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'messageinbound_handlers'
  });
};
