/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'tool_usertours_steps', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    tourid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    targettype: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    targetvalue: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    sortorder: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    configdata: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: config.db.prefix + 'tool_usertours_steps'
  });
};
