/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'forum_read', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    forumid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    discussionid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    postid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    firstread: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    lastread: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'forum_read'
  });
};
