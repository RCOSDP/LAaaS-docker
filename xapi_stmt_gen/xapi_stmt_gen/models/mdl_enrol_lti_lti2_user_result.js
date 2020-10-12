/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'enrol_lti_lti2_user_result', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    resourcelinkid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    ltiuserkey: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    ltiresultsourcedid: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
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
    tableName: config.db.prefix + 'enrol_lti_lti2_user_result'
  });
};
