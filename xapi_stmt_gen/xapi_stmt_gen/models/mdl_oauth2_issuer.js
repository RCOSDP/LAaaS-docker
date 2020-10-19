/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'oauth2_issuer', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
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
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    baseurl: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    clientid: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    clientsecret: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    loginscopes: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    loginscopesoffline: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    loginparams: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    loginparamsoffline: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    alloweddomains: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    scopessupported: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    enabled: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    showonloginpage: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    basicauth: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    sortorder: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    requireconfirmation: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    }
  }, {
    tableName: config.db.prefix + 'oauth2_issuer'
  });
};
