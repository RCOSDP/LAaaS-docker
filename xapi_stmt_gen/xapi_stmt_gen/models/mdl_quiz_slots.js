/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'quiz_slots', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    slot: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    quizid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    page: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    requireprevious: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    questionid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    questioncategoryid: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    includingsubcategories: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    maxmark: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'quiz_slots'
  });
};
