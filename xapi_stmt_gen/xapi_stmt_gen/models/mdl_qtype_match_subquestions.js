/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'qtype_match_subquestions', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    questionid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    questiontext: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    questiontextformat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    answertext: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: config.db.prefix + 'qtype_match_subquestions'
  });
};
