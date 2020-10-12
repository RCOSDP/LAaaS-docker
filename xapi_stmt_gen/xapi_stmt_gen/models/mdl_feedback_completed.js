/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'feedback_completed', {
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
    userid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    timemodified: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    random_response: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    anonymous_response: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    courseid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'feedback_completed'
  });
};
