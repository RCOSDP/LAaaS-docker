/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'question_attempts', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    questionusageid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    slot: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    behaviour: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    questionid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    variant: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '1'
    },
    maxmark: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    minfraction: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    maxfraction: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: '1'
    },
    flagged: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    questionsummary: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    rightanswer: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    responsesummary: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    timemodified: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    tableName: config.db.prefix + 'question_attempts'
  });
};
