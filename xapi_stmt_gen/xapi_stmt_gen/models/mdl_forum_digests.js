/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'forum_digests', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    forum: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    maildigest: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '-1'
    }
  }, {
    tableName: config.db.prefix + 'forum_digests'
  });
};
