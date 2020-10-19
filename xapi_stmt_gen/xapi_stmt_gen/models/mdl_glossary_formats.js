/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'glossary_formats', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    popupformatname: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    visible: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    showgroup: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    showtabs: {
      type: DataTypes.STRING,
      allowNull: true
    },
    defaultmode: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    defaulthook: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    sortkey: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    sortorder: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: config.db.prefix + 'glossary_formats'
  });
};
