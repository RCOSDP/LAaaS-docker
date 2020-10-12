/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'block_rss_client', {
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
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    preferredtitle: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    shared: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    skiptime: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    skipuntil: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'block_rss_client'
  });
};
