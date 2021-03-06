/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'resource', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    course: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    intro: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    introformat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    tobemigrated: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    legacyfiles: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    legacyfileslast: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    display: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    displayoptions: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    filterfiles: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    revision: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    timemodified: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'resource'
  });
};
