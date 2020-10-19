/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'task_scheduled', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    component: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    classname: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    lastruntime: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    nextruntime: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    blocking: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    minute: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    hour: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    day: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    month: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    dayofweek: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    faildelay: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    customised: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    disabled: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'task_scheduled'
  });
};
