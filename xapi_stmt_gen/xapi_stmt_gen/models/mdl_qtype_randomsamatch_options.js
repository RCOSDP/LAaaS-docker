/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'qtype_randomsamatch_options', {
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
    choose: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '4'
    },
    subcats: {
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
    shownumcorrect: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'qtype_randomsamatch_options'
  });
};
