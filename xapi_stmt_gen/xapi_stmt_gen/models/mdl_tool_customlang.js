/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'tool_customlang', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    lang: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    componentid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    stringid: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    original: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    master: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    local: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    timemodified: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    timecustomized: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    outdated: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '0'
    },
    modified: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'tool_customlang'
  });
};
