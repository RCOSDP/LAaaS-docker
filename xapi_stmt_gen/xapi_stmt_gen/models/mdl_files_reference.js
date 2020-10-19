/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'files_reference', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    repositoryid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    lastsync: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    reference: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    referencehash: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: config.db.prefix + 'files_reference'
  });
};
