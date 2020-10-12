/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'assign_overrides', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    assignid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    groupid: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    userid: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    sortorder: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    allowsubmissionsfromdate: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    duedate: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    cutoffdate: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    tableName: config.db.prefix + 'assign_overrides'
  });
};
