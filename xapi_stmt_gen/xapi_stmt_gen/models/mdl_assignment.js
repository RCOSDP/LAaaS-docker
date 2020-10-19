/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'assignment', {
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    intro: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    introformat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    assignmenttype: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    resubmit: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    preventlate: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    emailteachers: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    var1: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: '0'
    },
    var2: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: '0'
    },
    var3: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: '0'
    },
    var4: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: '0'
    },
    var5: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: '0'
    },
    maxbytes: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '100000'
    },
    timedue: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    timeavailable: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    grade: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    timemodified: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'assignment'
  });
};
