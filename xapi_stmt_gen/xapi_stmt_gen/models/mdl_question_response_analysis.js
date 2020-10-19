/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'question_response_analysis', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    hashcode: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    whichtries: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    timemodified: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    questionid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    variant: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    subqid: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    aid: {
      type: DataTypes.STRING,
      allowNull: true
    },
    response: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    credit: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  }, {
    tableName: config.db.prefix + 'question_response_analysis'
  });
};
