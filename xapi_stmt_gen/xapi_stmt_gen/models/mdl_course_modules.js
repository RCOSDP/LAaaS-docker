/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'course_modules', {
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
    module: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    instance: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    section: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    idnumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    added: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    indent: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    visible: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    visibleoncoursepage: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    visibleold: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    groupmode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    groupingid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    completion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    completiongradeitemnumber: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    completionview: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    completionexpected: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    showdescription: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    availability: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    deletioninprogress: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'course_modules'
  });
};
