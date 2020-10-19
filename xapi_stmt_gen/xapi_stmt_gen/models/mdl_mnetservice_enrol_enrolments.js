/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'mnetservice_enrol_enrolments', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    hostid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    userid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    remotecourseid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    rolename: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    enroltime: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    enroltype: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: config.db.prefix + 'mnetservice_enrol_enrolments'
  });
};
