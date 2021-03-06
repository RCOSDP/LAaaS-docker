/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'enrol_lti_lti2_context', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    consumerid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    lticontextkey: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    settings: {
      type: DataTypes.TEXT,
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
    tableName: config.db.prefix + 'enrol_lti_lti2_context'
  });
};
