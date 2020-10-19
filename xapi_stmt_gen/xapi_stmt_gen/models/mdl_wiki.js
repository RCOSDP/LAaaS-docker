/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'wiki', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    course: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Wiki'
    },
    intro: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    introformat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
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
    firstpagetitle: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'First Page'
    },
    wikimode: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'collaborative'
    },
    defaultformat: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'creole'
    },
    forceformat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    editbegin: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    editend: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'wiki'
  });
};
