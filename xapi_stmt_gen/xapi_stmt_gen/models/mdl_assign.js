/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'assign', {
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
      allowNull: false
    },
    introformat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    alwaysshowdescription: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    nosubmissions: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    submissiondrafts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    sendnotifications: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    sendlatenotifications: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    duedate: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    allowsubmissionsfromdate: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    grade: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    timemodified: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    requiresubmissionstatement: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    completionsubmit: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    cutoffdate: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    gradingduedate: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    teamsubmission: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    requireallteammemberssubmit: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    teamsubmissiongroupingid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    blindmarking: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    revealidentities: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    attemptreopenmethod: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'none'
    },
    maxattempts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '-1'
    },
    markingworkflow: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    markingallocation: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    sendstudentnotifications: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    preventsubmissionnotingroup: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'assign'
  });
};
