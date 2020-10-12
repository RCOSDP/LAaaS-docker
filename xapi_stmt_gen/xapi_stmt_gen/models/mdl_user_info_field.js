/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'user_info_field', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    shortname: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'shortname'
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    datatype: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    descriptionformat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    categoryid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    sortorder: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    required: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    locked: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    visible: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    forceunique: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    signup: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    defaultdata: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    defaultdataformat: {
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
    }
  }, {
    tableName: config.db.prefix + 'user_info_field'
  });
};
