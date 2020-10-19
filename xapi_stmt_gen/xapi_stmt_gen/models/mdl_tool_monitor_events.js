/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'tool_monitor_events', {
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
    link: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    courseid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    timecreated: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    tableName: config.db.prefix + 'tool_monitor_events'
  });
};
