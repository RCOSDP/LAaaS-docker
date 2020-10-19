/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'grade_letters', {
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
    lowerboundary: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    letter: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: config.db.prefix + 'grade_letters'
  });
};
