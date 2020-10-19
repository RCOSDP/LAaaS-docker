/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'lti_tool_settings', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    toolproxyid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    course: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    coursemoduleid: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    settings: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    timecreated: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    timemodified: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    tableName: config.db.prefix + 'lti_tool_settings'
  });
};
