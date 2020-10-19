/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'question_truefalse', {
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
    trueanswer: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    falseanswer: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'question_truefalse'
  });
};
