/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'feedback_item', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    feedback: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    template: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    presentation: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    typ: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    hasvalue: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    required: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    dependitem: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    dependvalue: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    options: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: config.db.prefix + 'feedback_item'
  });
};
