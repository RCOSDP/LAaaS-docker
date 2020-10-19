/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'course_published', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    huburl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    courseid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    timepublished: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    enrollable: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    hubcourseid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '0'
    },
    timechecked: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    tableName: config.db.prefix + 'course_published'
  });
};
