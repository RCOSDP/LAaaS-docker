/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'cache_filters', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    filter: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    version: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    md5key: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    rawtext: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    timemodified: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'cache_filters'
  });
};
