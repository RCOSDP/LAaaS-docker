/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'external_functions', {
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
    classname: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    methodname: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    classpath: {
      type: DataTypes.STRING,
      allowNull: true
    },
    component: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    capabilities: {
      type: DataTypes.STRING,
      allowNull: true
    },
    services: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: config.db.prefix + 'external_functions'
  });
};
