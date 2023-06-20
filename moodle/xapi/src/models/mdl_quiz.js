/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.lms.prefix + 'quiz', {
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
    timelimit: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    overduehandling: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'autoabandon'
    },
    graceperiod: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    preferredbehaviour: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    canredoquestions: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    attempts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    attemptonlast: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    grademethod: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    decimalpoints: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '2'
    },
    questiondecimalpoints: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '-1'
    },
    reviewattempt: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    reviewcorrectness: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    reviewmarks: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    reviewspecificfeedback: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    reviewgeneralfeedback: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    reviewrightanswer: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    reviewoverallfeedback: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    questionsperpage: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    navmethod: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'free'
    },
    shuffleanswers: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    sumgrades: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: '0'
    },
    grade: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: '0'
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
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    subnet: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    browsersecurity: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    delay1: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    delay2: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    showuserpicture: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    showblocks: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    completionattemptsexhausted: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '0'
    },
    completionpass: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '0'
    },
    allowofflineattempts: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.lms.prefix + 'quiz',
    timestamps: false
  });
};
