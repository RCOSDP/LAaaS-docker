/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'message_conversations', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    type: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '1'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    convhash: {
      type: DataTypes.STRING,
      allowNull: true
    },
    component: {
      type: DataTypes.STRING,
      allowNull: true
    },
    itemtype: {
      type: DataTypes.STRING,
      allowNull: true
    },
    itemid: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    contextid: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    enabled: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    timecreated: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    timemodified: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    tableName: config.db.prefix + 'message_conversations'
  });
};
