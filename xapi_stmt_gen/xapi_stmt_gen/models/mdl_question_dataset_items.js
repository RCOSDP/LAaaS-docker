/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'question_dataset_items', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    definition: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    itemnumber: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: config.db.prefix + 'question_dataset_items'
  });
};
