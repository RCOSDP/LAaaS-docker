/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'badge_backpack', {
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    backpackurl: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    backpackuid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    autosync: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: config.db.prefix + 'badge_backpack'
  });
};
