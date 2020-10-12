/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'course_completion_defaults', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    course: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    module: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    completion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    completionview: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    completionusegrade: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    completionexpected: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    customrules: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: config.db.prefix + 'course_completion_defaults'
  });
};
