/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'assign_plugin_config', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    assignment: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    plugin: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    subtype: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: config.db.prefix + 'assign_plugin_config'
  });
};
