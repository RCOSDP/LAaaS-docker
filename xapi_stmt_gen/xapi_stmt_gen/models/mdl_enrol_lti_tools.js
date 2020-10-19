/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'enrol_lti_tools', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    enrolid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    contextid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    institution: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    lang: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'en'
    },
    timezone: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '99'
    },
    maxenrolled: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    maildisplay: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '2'
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    gradesync: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    gradesynccompletion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    membersync: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    membersyncmode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    roleinstructor: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    rolelearner: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    secret: {
      type: DataTypes.TEXT,
      allowNull: true
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
    tableName: config.db.prefix + 'enrol_lti_tools'
  });
};
