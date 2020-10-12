/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'portfolio_log', {
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
    time: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    portfolio: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    caller_class: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    caller_file: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    caller_component: {
      type: DataTypes.STRING,
      allowNull: true
    },
    caller_sha1: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    tempdataid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    returnurl: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    continueurl: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: config.db.prefix + 'portfolio_log'
  });
};
