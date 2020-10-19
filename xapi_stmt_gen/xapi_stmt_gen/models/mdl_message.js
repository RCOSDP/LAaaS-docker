/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'message', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    useridfrom: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    useridto: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    subject: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    fullmessage: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    fullmessageformat: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '0'
    },
    fullmessagehtml: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    smallmessage: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    notification: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '0'
    },
    contexturl: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    contexturlname: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    timecreated: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    timeuserfromdeleted: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    timeusertodeleted: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    component: {
      type: DataTypes.STRING,
      allowNull: true
    },
    eventtype: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: config.db.prefix + 'message'
  });
};
