/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'context', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    contextlevel: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    instanceid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    path: {
      type: DataTypes.STRING,
      allowNull: true
    },
    depth: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    locked: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'context'
  });
};
