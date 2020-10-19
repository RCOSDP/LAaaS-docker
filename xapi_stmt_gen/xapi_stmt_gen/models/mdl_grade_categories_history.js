/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'grade_categories_history', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    action: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    oldid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    source: {
      type: DataTypes.STRING,
      allowNull: true
    },
    timemodified: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    loggeduser: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    courseid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    parent: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    depth: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    path: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    aggregation: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    keephigh: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    droplow: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    aggregateonlygraded: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    aggregateoutcomes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    aggregatesubcats: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    hidden: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'grade_categories_history'
  });
};
