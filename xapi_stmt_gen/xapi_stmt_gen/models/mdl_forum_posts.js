/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'forum_posts', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    discussion: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    parent: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    userid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    created: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    modified: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    mailed: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    messageformat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    messagetrust: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    attachment: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    totalscore: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    mailnow: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    deleted: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'forum_posts'
  });
};
