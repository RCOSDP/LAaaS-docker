/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'grade_items_history', {
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
      allowNull: true
    },
    categoryid: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    itemname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    itemtype: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    itemmodule: {
      type: DataTypes.STRING,
      allowNull: true
    },
    iteminstance: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    itemnumber: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    iteminfo: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    idnumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    calculation: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    gradetype: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    grademax: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: '100'
    },
    grademin: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: '0'
    },
    scaleid: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    outcomeid: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    gradepass: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: '0'
    },
    multfactor: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: '1.0'
    },
    plusfactor: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: '0'
    },
    aggregationcoef: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: '0'
    },
    aggregationcoef2: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: '0'
    },
    sortorder: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
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
    needsupdate: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    display: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    decimals: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    weightoverride: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'grade_items_history'
  });
};
