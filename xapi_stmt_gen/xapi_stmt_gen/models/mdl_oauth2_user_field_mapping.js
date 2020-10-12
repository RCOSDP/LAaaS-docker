/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'oauth2_user_field_mapping', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    timemodified: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    timecreated: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    usermodified: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    issuerid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    externalfield: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    internalfield: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: config.db.prefix + 'oauth2_user_field_mapping'
  });
};
