/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'course_completion_criteria', {
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
    criteriatype: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    module: {
      type: DataTypes.STRING,
      allowNull: true
    },
    moduleinstance: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    courseinstance: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    enrolperiod: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    timeend: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    gradepass: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    role: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    tableName: config.db.prefix + 'course_completion_criteria'
  });
};
