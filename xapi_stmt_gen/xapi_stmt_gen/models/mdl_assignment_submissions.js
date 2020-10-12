/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'assignment_submissions', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    assignment: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    userid: {
      type: DataTypes.BIGINT,
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
    numfiles: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    data1: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    data2: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    grade: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    submissioncomment: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    format: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    teacher: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    timemarked: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    mailed: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'assignment_submissions'
  });
};
