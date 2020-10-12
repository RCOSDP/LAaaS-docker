/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'question_usages', {
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
    component: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    preferredbehaviour: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: config.db.prefix + 'question_usages'
  });
};
