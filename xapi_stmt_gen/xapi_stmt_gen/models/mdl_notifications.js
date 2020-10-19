/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'notifications', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    useridfrom: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    useridto: {
      type: DataTypes.BIGINT,
      allowNull: false
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
      allowNull: false,
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
    component: {
      type: DataTypes.STRING,
      allowNull: true
    },
    eventtype: {
      type: DataTypes.STRING,
      allowNull: true
    },
    contexturl: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    contexturlname: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    timeread: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    timecreated: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    tableName: config.db.prefix + 'notifications'
  });
};
