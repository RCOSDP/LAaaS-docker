/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'logstore_standard_log', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    eventname: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    component: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    target: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    objecttable: {
      type: DataTypes.STRING,
      allowNull: true
    },
    objectid: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    crud: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    edulevel: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    contextid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    contextlevel: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    contextinstanceid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    userid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    courseid: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    relateduserid: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    anonymous: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    other: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    timecreated: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    origin: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ip: {
      type: DataTypes.STRING,
      allowNull: true
    },
    realuserid: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    tableName: config.db.prefix + 'logstore_standard_log'
  });
};
