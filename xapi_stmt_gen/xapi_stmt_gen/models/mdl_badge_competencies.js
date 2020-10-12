/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'badge_competencies', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    badgeid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    targetname: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    targeturl: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    targetdescription: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    targetframework: {
      type: DataTypes.STRING,
      allowNull: true
    },
    targetcode: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: config.db.prefix + 'badge_competencies'
  });
};
