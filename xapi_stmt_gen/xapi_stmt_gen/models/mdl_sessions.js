/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'sessions', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    state: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    sid: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    userid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    sessdata: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    timecreated: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    timemodified: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    firstip: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lastip: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: config.db.prefix + 'sessions'
  });
};
