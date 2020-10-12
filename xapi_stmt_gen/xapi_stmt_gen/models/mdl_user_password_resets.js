/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'user_password_resets', {
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
    timerequested: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    timererequested: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: config.db.prefix + 'user_password_resets'
  });
};
