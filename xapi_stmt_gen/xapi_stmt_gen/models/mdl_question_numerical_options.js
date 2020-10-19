/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'question_numerical_options', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    question: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    showunits: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    unitsleft: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    unitgradingtype: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    unitpenalty: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: '0.1'
    }
  }, {
    tableName: config.db.prefix + 'question_numerical_options'
  });
};
