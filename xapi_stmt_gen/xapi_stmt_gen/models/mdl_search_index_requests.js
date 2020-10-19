/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'search_index_requests', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    contextid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    searcharea: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    timerequested: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    partialarea: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    partialtime: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    indexpriority: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    tableName: config.db.prefix + 'search_index_requests'
  });
};
