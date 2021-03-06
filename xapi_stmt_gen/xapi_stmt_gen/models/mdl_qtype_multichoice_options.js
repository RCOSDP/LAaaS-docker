/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'qtype_multichoice_options', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    questionid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    layout: {
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
      defaultValue: '1'
    },
    correctfeedback: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    correctfeedbackformat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    partiallycorrectfeedback: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    partiallycorrectfeedbackformat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    incorrectfeedback: {
      type: DataTypes.TEXT,
      allowNull: false
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
    tableName: config.db.prefix + 'qtype_multichoice_options'
  });
};
