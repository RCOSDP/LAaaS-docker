/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'quiz_feedback', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    quizid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    feedbacktext: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    feedbacktextformat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    mingrade: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: '0'
    },
    maxgrade: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'quiz_feedback'
  });
};
