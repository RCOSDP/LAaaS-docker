/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'quiz_sections', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    quizid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    firstslot: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    heading: {
      type: DataTypes.STRING,
      allowNull: true
    },
    shufflequestions: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'quiz_sections'
  });
};
