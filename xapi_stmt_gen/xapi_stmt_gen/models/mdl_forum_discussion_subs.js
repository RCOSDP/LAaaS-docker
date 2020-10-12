/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'forum_discussion_subs', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    forum: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    userid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    discussion: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    preference: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '1'
    }
  }, {
    tableName: config.db.prefix + 'forum_discussion_subs'
  });
};
