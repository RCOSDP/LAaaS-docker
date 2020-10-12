/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'workshopform_numerrors_map', {
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
    nonegative: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    grade: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  }, {
    tableName: config.db.prefix + 'workshopform_numerrors_map'
  });
};
