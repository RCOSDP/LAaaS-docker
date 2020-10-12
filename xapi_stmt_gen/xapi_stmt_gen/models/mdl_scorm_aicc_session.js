/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'scorm_aicc_session', {
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
    scormid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    hacpsession: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    scoid: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: '0'
    },
    scormmode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    scormstatus: {
      type: DataTypes.STRING,
      allowNull: true
    },
    attempt: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    lessonstatus: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sessiontime: {
      type: DataTypes.STRING,
      allowNull: true
    },
    timecreated: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    timemodified: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'scorm_aicc_session'
  });
};
