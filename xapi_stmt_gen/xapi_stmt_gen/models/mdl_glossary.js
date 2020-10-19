/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'glossary', {
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
      defaultValue: ''
    },
    intro: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    introformat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    allowduplicatedentries: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    displayformat: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'dictionary'
    },
    mainglossary: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    showspecial: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    showalphabet: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    showall: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    allowcomments: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    allowprintview: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    usedynalink: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    defaultapproval: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    approvaldisplayformat: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'default'
    },
    globalglossary: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    entbypage: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '10'
    },
    editalways: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    rsstype: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    rssarticles: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    assessed: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    assesstimestart: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    assesstimefinish: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    scale: {
      type: DataTypes.BIGINT,
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
    completionentries: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'glossary'
  });
};
