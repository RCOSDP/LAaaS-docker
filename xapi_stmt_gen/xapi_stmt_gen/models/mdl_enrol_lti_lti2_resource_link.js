/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'enrol_lti_lti2_resource_link', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    contextid: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    consumerid: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    ltiresourcelinkkey: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    settings: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    primaryresourcelinkid: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    shareapproved: {
      type: DataTypes.INTEGER,
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
    tableName: config.db.prefix + 'enrol_lti_lti2_resource_link'
  });
};
