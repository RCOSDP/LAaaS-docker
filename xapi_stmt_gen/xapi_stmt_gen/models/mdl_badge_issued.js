/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'badge_issued', {
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
    userid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    uniquehash: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    dateissued: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    dateexpire: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    visible: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    issuernotified: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    tableName: config.db.prefix + 'badge_issued'
  });
};
