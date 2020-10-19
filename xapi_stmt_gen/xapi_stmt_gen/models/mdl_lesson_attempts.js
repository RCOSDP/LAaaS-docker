/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'lesson_attempts', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    lessonid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    pageid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    userid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    answerid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    retry: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    correct: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    useranswer: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    timeseen: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'lesson_attempts'
  });
};
