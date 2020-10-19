/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'external_tokens', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    privatetoken: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tokentype: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    externalserviceid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    sid: {
      type: DataTypes.STRING,
      allowNull: true
    },
    contextid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    creatorid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '1'
    },
    iprestriction: {
      type: DataTypes.STRING,
      allowNull: true
    },
    validuntil: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    timecreated: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    lastaccess: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    tableName: config.db.prefix + 'external_tokens'
  });
};
