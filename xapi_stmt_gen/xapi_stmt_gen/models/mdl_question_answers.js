/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'question_answers', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    question: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    answerformat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    fraction: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: '0'
    },
    feedback: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    feedbackformat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'question_answers'
  });
};
