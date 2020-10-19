/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'competency', {
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
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    descriptionformat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    idnumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    competencyframeworkid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    parentid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    sortorder: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    ruletype: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ruleoutcome: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    ruleconfig: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    scaleid: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    scaleconfiguration: {
      type: DataTypes.TEXT,
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
    tableName: config.db.prefix + 'competency'
  });
};
