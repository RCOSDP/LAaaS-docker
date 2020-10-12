/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'enrol_lti_lti2_consumer', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    consumerkey256: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    consumerkey: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    secret: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    ltiversion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    consumername: {
      type: DataTypes.STRING,
      allowNull: true
    },
    consumerversion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    consumerguid: {
      type: DataTypes.STRING,
      allowNull: true
    },
    profile: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    toolproxy: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    settings: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    protected: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    enabled: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    enablefrom: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    enableuntil: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    lastaccess: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    created: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    updated: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    tableName: config.db.prefix + 'enrol_lti_lti2_consumer'
  });
};
