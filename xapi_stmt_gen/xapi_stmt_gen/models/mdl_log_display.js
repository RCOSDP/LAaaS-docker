/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'log_display', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    module: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    mtable: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    field: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    component: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: config.db.prefix + 'log_display'
  });
};
