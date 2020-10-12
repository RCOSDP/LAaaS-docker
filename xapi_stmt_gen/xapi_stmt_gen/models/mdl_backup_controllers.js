/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'backup_controllers', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    backupid: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    operation: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'backup'
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    itemid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    format: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    interactive: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    purpose: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    execution: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    executiontime: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    checksum: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    timecreated: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    timemodified: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    controller: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: config.db.prefix + 'backup_controllers'
  });
};
