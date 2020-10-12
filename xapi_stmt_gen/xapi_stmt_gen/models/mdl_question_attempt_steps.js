/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'question_attempt_steps', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    questionattemptid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    sequencenumber: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    fraction: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    timecreated: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    userid: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    tableName: config.db.prefix + 'question_attempt_steps'
  });
};
