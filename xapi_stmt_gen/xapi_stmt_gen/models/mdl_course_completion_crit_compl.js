/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'course_completion_crit_compl', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    course: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    criteriaid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    gradefinal: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    unenroled: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    timecompleted: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    tableName: config.db.prefix + 'course_completion_crit_compl'
  });
};
