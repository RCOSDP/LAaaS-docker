/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'analytics_used_files', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    modelid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    fileid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    time: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'analytics_used_files'
  });
};
