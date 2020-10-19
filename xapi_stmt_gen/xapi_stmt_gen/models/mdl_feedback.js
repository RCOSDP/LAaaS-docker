/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'feedback', {
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
    anonymous: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    email_notification: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    multiple_submit: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    autonumbering: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    site_after_submit: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    page_after_submit: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    page_after_submitformat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    publish_stats: {
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
    tableName: config.db.prefix + 'feedback'
  });
};
