/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'lesson_overrides', {
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
    groupid: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    userid: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    available: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    deadline: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    timelimit: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    review: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    maxattempts: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    retake: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: config.db.prefix + 'lesson_overrides'
  });
};
