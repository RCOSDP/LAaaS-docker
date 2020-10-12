/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'assignment_upgrade', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    oldcmid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    oldinstance: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    newcmid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    newinstance: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    timecreated: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'assignment_upgrade'
  });
};
