/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'tag', {
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
    tagcollid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    rawname: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    isstandard: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    descriptionformat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    flag: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '0'
    },
    timemodified: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    tableName: config.db.prefix + 'tag'
  });
};
