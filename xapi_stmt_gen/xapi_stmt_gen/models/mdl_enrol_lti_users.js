/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'enrol_lti_users', {
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
    toolid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    serviceurl: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    sourceid: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    consumerkey: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    consumersecret: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    membershipsurl: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    membershipsid: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    lastgrade: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    lastaccess: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    timecreated: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    tableName: config.db.prefix + 'enrol_lti_users'
  });
};
