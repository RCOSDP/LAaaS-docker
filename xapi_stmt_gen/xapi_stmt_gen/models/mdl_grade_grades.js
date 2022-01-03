/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.lms.prefix + 'grade_grades', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    itemid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    userid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    rawgrade: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    rawgrademax: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: '100'
    },
    rawgrademin: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: '0'
    },
    rawscaleid: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    usermodified: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    finalgrade: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    hidden: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    locked: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    locktime: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    exported: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    overridden: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    excluded: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    feedback: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    feedbackformat: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    information: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    informationformat: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    timecreated: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    timemodified: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    aggregationstatus: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'unknown'
    },
    aggregationweight: {
      type: DataTypes.DOUBLE,
      allowNull: true
    }
  }, {
    tableName: config.db.lms.prefix + 'grade_grades',
    timestamps: false
  });
};
