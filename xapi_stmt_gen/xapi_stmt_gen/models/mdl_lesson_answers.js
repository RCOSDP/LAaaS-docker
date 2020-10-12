/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'lesson_answers', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    lessonid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    pageid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    jumpto: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    grade: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    score: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    flags: {
      type: DataTypes.INTEGER,
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
    answer: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    answerformat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    response: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    responseformat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'lesson_answers'
  });
};
