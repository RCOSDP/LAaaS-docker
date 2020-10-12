/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'tool_cohortroles', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    cohortid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    roleid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    userid: {
      type: DataTypes.BIGINT,
      allowNull: false
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
      allowNull: true
    }
  }, {
    tableName: config.db.prefix + 'tool_cohortroles'
  });
};
