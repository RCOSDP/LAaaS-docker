/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'tool_policy_versions', {
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
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    audience: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    archived: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    usermodified: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    timecreated: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    timemodified: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    policyid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    agreementstyle: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    optional: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    revision: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    summaryformat: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    contentformat: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: config.db.prefix + 'tool_policy_versions'
  });
};
