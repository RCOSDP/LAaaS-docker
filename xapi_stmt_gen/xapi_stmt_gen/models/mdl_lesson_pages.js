/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'lesson_pages', {
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
    prevpageid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    nextpageid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    qtype: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    qoption: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    layout: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    display: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    timecreated: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    timemodified: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    contents: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    contentsformat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'lesson_pages'
  });
};
