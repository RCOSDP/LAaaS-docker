/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'mnet_session', {
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
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    mnethostid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    useragent: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    confirm_timeout: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    session_id: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    expires: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'mnet_session'
  });
};
