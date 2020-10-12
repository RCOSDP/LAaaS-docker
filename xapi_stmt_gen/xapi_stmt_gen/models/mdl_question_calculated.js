/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'question_calculated', {
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
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    tolerance: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '0.0'
    },
    tolerancetype: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '1'
    },
    correctanswerlength: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '2'
    },
    correctanswerformat: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '2'
    }
  }, {
    tableName: config.db.prefix + 'question_calculated'
  });
};
