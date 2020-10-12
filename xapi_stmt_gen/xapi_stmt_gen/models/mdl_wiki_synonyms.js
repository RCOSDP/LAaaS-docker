/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'wiki_synonyms', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    subwikiid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    pageid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    pagesynonym: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Pagesynonym'
    }
  }, {
    tableName: config.db.prefix + 'wiki_synonyms'
  });
};
