/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.lms.prefix + 'course', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    category: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    sortorder: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    shortname: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    idnumber: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    summaryformat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    format: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'topics'
    },
    showgrades: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    newsitems: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    startdate: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    enddate: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    marker: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    maxbytes: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    legacyfiles: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    showreports: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    visible: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    visibleold: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    groupmode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    groupmodeforce: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    defaultgroupingid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    lang: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    calendartype: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    theme: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    timecreated: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    timemodified: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    requested: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    enablecompletion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    completionnotify: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    cacherev: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.lms.prefix + 'course'
  });
};
