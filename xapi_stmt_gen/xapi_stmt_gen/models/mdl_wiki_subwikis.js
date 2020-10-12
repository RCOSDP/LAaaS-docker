/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'wiki_subwikis', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    wikiid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    groupid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    userid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'wiki_subwikis'
  });
};
