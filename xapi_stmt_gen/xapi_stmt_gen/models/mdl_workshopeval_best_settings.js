/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'workshopeval_best_settings', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    workshopid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    comparison: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '5'
    }
  }, {
    tableName: config.db.prefix + 'workshopeval_best_settings'
  });
};
