/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'workshop_assessments', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    submissionid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    reviewerid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    weight: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '1'
    },
    timecreated: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: '0'
    },
    timemodified: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: '0'
    },
    grade: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    gradinggrade: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    gradinggradeover: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    gradinggradeoverby: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    feedbackauthor: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    feedbackauthorformat: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '0'
    },
    feedbackauthorattachment: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '0'
    },
    feedbackreviewer: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    feedbackreviewerformat: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'workshop_assessments'
  });
};
