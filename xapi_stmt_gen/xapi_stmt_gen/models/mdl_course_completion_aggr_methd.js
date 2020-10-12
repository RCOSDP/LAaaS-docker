/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'course_completion_aggr_methd', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    course: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    criteriatype: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    method: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    value: {
      type: DataTypes.DOUBLE,
      allowNull: true
    }
  }, {
    tableName: config.db.prefix + 'course_completion_aggr_methd'
  });
};
