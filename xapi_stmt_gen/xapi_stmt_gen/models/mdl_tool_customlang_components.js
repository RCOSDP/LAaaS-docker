/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'tool_customlang_components', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    version: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: config.db.prefix + 'tool_customlang_components'
  });
};
