/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'tag_coll', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isdefault: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    component: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sortorder: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    searchable: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    customurl: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: config.db.prefix + 'tag_coll'
  });
};
