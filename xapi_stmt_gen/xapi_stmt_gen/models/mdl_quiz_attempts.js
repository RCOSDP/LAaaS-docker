/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.lms.prefix + 'quiz_attempts', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    quiz: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    userid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    attempt: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    uniqueid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    layout: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    currentpage: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    preview: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'inprogress'
    },
    timestart: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    timefinish: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    timemodified: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    timemodifiedoffline: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    timecheckstate: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: '0'
    },
    sumgrades: {
      type: DataTypes.DOUBLE,
      allowNull: true
    }
  }, {
    tableName: config.db.lms.prefix + 'quiz_attempts',
    timestamps: false
  });
};
