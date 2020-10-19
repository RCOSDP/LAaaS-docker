/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'question_calculated_options', {
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
    synchronize: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    single: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    shuffleanswers: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    correctfeedback: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    correctfeedbackformat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    partiallycorrectfeedback: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    partiallycorrectfeedbackformat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    incorrectfeedback: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    incorrectfeedbackformat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    answernumbering: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'abc'
    },
    shownumcorrect: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'question_calculated_options'
  });
};
