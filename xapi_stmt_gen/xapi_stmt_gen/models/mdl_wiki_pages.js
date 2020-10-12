/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'wiki_pages', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    subwikiid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'title'
    },
    cachedcontent: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    timecreated: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    timemodified: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    timerendered: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    userid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    pageviews: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    readonly: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'wiki_pages'
  });
};
