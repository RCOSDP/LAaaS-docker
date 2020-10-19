/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'feedback_value', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    course_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    item: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    completed: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    tmp_completed: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: config.db.prefix + 'feedback_value'
  });
};
