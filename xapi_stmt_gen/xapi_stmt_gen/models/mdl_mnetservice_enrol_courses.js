/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'mnetservice_enrol_courses', {
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
    remoteid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    categoryid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    categoryname: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    sortorder: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    shortname: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    idnumber: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    summaryformat: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '0'
    },
    startdate: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    roleid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    rolename: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: config.db.prefix + 'mnetservice_enrol_courses'
  });
};
