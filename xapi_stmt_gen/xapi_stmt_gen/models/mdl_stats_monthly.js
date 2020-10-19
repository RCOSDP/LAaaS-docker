/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'stats_monthly', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    courseid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    timeend: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    roleid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    stattype: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'activity'
    },
    stat1: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    stat2: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'stats_monthly'
  });
};
