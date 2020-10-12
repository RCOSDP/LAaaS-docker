/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'messages', {
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
    conversationid: {
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
    timecreated: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    tableName: config.db.prefix + 'messages'
  });
};
