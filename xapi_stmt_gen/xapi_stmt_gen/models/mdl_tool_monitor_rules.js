/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'tool_monitor_rules', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    descriptionformat: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    userid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    courseid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    plugin: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    eventname: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    template: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    templateformat: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    frequency: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    timewindow: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    timemodified: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    timecreated: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    tableName: config.db.prefix + 'tool_monitor_rules'
  });
};
