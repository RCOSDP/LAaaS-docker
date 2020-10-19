/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'course_request', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    shortname: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    summaryformat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    category: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    requester: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: config.db.prefix + 'course_request'
  });
};
