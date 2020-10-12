/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'competency_framework', {
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
    idnumber: {
      type: DataTypes.STRING,
      allowNull: true
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
    scaleid: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    scaleconfiguration: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    visible: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    taxonomies: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
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
    tableName: config.db.prefix + 'competency_framework'
  });
};
