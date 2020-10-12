/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'competency_template', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    shortname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    contextid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    descriptionformat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    visible: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    duedate: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    timecreated: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    timemodified: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    usermodified: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    tableName: config.db.prefix + 'competency_template'
  });
};
