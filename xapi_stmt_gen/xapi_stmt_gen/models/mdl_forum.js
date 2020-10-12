/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'forum', {
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
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'general'
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
    maxbytes: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    maxattachments: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '1'
    },
    forcesubscribe: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    trackingtype: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
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
    timemodified: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    warnafter: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    blockafter: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    blockperiod: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    completiondiscussions: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    completionreplies: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    completionposts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    displaywordcount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    lockdiscussionafter: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'forum'
  });
};
