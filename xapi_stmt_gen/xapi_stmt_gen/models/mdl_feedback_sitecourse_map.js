/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'feedback_sitecourse_map', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    feedbackid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    courseid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'feedback_sitecourse_map'
  });
};
