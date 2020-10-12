/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'badge_endorsement', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    badgeid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    issuername: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    issuerurl: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    issueremail: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    claimid: {
      type: DataTypes.STRING,
      allowNull: true
    },
    claimcomment: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    dateissued: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'badge_endorsement'
  });
};
