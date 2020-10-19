/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'registration_hubs', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    hubname: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    huburl: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    confirmed: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    secret: {
      type: DataTypes.STRING,
      allowNull: true
    },
    timemodified: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'registration_hubs'
  });
};
