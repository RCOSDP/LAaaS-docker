/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'enrol_lti_lti2_share_key', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    sharekey: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    resourcelinkid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    autoapprove: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    expires: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    tableName: config.db.prefix + 'enrol_lti_lti2_share_key'
  });
};
