/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'scorm_scoes', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    scorm: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    manifest: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    organization: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    parent: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    identifier: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    launch: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    scormtype: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    sortorder: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'scorm_scoes'
  });
};
