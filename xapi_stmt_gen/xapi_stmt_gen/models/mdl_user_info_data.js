/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'user_info_data', {
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
    fieldid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    data: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    dataformat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'user_info_data'
  });
};
