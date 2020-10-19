/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'question_response_count', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    analysisid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    try: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    rcount: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    tableName: config.db.prefix + 'question_response_count'
  });
};
