/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'competency_plancomp', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    planid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    competencyid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    sortorder: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    timecreated: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    timemodified: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    usermodified: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    tableName: config.db.prefix + 'competency_plancomp'
  });
};
