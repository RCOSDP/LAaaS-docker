/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'choice', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    course: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    intro: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    introformat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    publish: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    showresults: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    display: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    allowupdate: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    allowmultiple: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    showunanswered: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    includeinactive: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    limitanswers: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    timeopen: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    timeclose: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    showpreview: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    timemodified: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    completionsubmit: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'choice'
  });
};
