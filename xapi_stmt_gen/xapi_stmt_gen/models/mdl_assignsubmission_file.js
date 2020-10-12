/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'assignsubmission_file', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    assignment: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    submission: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    numfiles: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'assignsubmission_file'
  });
};
