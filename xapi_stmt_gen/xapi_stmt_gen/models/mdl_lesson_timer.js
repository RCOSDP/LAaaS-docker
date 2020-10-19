/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'lesson_timer', {
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
    userid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    starttime: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    lessontime: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    completed: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '0'
    },
    timemodifiedoffline: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'lesson_timer'
  });
};
