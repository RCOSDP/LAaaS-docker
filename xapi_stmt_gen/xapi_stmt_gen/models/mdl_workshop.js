/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'workshop', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    course: {
      type: DataTypes.BIGINT,
      allowNull: false
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
    instructauthors: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    instructauthorsformat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    instructreviewers: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    instructreviewersformat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    timemodified: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    phase: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '0'
    },
    useexamples: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '0'
    },
    usepeerassessment: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '0'
    },
    useselfassessment: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '0'
    },
    grade: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: '80'
    },
    gradinggrade: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: '20'
    },
    strategy: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    evaluation: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    gradedecimals: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '0'
    },
    submissiontypetext: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    submissiontypefile: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    nattachments: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '1'
    },
    submissionfiletypes: {
      type: DataTypes.STRING,
      allowNull: true
    },
    latesubmissions: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '0'
    },
    maxbytes: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: '100000'
    },
    examplesmode: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '0'
    },
    submissionstart: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: '0'
    },
    submissionend: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: '0'
    },
    assessmentstart: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: '0'
    },
    assessmentend: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: '0'
    },
    phaseswitchassessment: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    conclusion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    conclusionformat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    overallfeedbackmode: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '1'
    },
    overallfeedbackfiles: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '0'
    },
    overallfeedbackfiletypes: {
      type: DataTypes.STRING,
      allowNull: true
    },
    overallfeedbackmaxbytes: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: '100000'
    }
  }, {
    tableName: config.db.prefix + 'workshop'
  });
};
