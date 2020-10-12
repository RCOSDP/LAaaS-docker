/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'scorm', {
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
    scormtype: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'local'
    },
    reference: {
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
    version: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    maxgrade: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: '0'
    },
    grademethod: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    whatgrade: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    maxattempt: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '1'
    },
    forcecompleted: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    forcenewattempt: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    lastattemptlock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    masteryoverride: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    displayattemptstatus: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    displaycoursestructure: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    updatefreq: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    sha1hash: {
      type: DataTypes.STRING,
      allowNull: true
    },
    md5hash: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    revision: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    launch: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    skipview: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    hidebrowse: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    hidetoc: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    nav: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    navpositionleft: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: '-100'
    },
    navpositiontop: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: '-100'
    },
    auto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    popup: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    options: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    width: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '100'
    },
    height: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '600'
    },
    timeopen: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    timeclose: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    timemodified: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    completionstatusrequired: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    completionscorerequired: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    completionstatusallscos: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    displayactivityname: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    autocommit: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'scorm'
  });
};
