/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'oauth2_access_token', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    timecreated: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    timemodified: {
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
    token: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    expires: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    scope: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: config.db.prefix + 'oauth2_access_token'
  });
};
