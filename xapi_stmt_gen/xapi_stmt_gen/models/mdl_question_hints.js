/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'question_hints', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    questionid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    hint: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    hintformat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    shownumcorrect: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    clearwrong: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    options: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: config.db.prefix + 'question_hints'
  });
};
