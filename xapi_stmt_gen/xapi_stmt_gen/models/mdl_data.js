/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'data', {
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
    comments: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    timeavailablefrom: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    timeavailableto: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    timeviewfrom: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    timeviewto: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    requiredentries: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    requiredentriestoview: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    maxentries: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    rssarticles: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    singletemplate: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    listtemplate: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    listtemplateheader: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    listtemplatefooter: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    addtemplate: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    rsstemplate: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    rsstitletemplate: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    csstemplate: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    jstemplate: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    asearchtemplate: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    approval: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    manageapproved: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    scale: {
      type: DataTypes.BIGINT,
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
    defaultsort: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    defaultsortdir: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    editany: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    notification: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    timemodified: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    config: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    completionentries: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'data'
  });
};
