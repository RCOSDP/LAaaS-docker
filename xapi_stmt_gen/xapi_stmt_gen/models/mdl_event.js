/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'event', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    format: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    categoryid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    courseid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    groupid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    userid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    repeatid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    modulename: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    instance: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    eventtype: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    timestart: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    timeduration: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    timesort: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    visible: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    uuid: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    sequence: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '1'
    },
    timemodified: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    subscriptionid: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    priority: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    location: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: config.db.prefix + 'event'
  });
};
