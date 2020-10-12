/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'data_fields', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    dataid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    required: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    param1: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    param2: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    param3: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    param4: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    param5: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    param6: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    param7: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    param8: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    param9: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    param10: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: config.db.prefix + 'data_fields'
  });
};
