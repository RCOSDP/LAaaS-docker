/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'editor_atto_autosave', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    elementid: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    contextid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    pagehash: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    userid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    drafttext: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    draftid: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    pageinstance: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    timemodified: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'editor_atto_autosave'
  });
};
