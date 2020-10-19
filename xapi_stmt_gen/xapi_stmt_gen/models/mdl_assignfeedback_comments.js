/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'assignfeedback_comments', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    assignment: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    grade: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    commenttext: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    commentformat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'assignfeedback_comments'
  });
};
