/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'quiz_overview_regrades', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    questionusageid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    slot: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    newfraction: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    oldfraction: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    regraded: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    timemodified: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    tableName: config.db.prefix + 'quiz_overview_regrades'
  });
};
