/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'lti', {
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
      allowNull: true
    },
    introformat: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '0'
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
    typeid: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    toolurl: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    securetoolurl: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    instructorchoicesendname: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    instructorchoicesendemailaddr: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    instructorchoiceallowroster: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    instructorchoiceallowsetting: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    instructorcustomparameters: {
      type: DataTypes.STRING,
      allowNull: true
    },
    instructorchoiceacceptgrades: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    grade: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '100'
    },
    launchcontainer: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    resourcekey: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    debuglaunch: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    showtitlelaunch: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    showdescriptionlaunch: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    servicesalt: {
      type: DataTypes.STRING,
      allowNull: true
    },
    icon: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    secureicon: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: config.db.prefix + 'lti'
  });
};
