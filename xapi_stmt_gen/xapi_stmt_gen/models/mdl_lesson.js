/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'lesson', {
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
      allowNull: true
    },
    introformat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    practice: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    modattempts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    usepassword: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    dependency: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    conditions: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    grade: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    custom: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    ongoing: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    usemaxgrade: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    maxanswers: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '4'
    },
    maxattempts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '5'
    },
    review: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    nextpagedefault: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    feedback: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    minquestions: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    maxpages: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    timelimit: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    retake: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    activitylink: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    mediafile: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    mediaheight: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '100'
    },
    mediawidth: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '650'
    },
    mediaclose: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    slideshow: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    width: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '640'
    },
    height: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '480'
    },
    bgcolor: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '#FFFFFF'
    },
    displayleft: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    displayleftif: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    progressbar: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    available: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    deadline: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    timemodified: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    completionendreached: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '0'
    },
    completiontimespent: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: '0'
    },
    allowofflineattempts: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'lesson'
  });
};
