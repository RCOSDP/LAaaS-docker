/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'question_statistics', {
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
    timemodified: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    questionid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    slot: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    subquestion: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    variant: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    s: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    effectiveweight: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    negcovar: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    discriminationindex: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    discriminativeefficiency: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    sd: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    facility: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    subquestions: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    maxmark: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    positions: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    randomguessscore: {
      type: DataTypes.DOUBLE,
      allowNull: true
    }
  }, {
    tableName: config.db.prefix + 'question_statistics'
  });
};
