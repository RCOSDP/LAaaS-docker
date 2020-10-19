/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'lesson_branch', {
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
    pageid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    retry: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    flag: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    timeseen: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    nextpageid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'lesson_branch'
  });
};
