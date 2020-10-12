/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'enrol_lti_lti2_tool_proxy', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    toolproxykey: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    consumerid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    toolproxy: {
      type: DataTypes.TEXT,
      allowNull: false
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
    tableName: config.db.prefix + 'enrol_lti_lti2_tool_proxy'
  });
};
