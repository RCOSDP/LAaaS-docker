/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'quiz_statistics', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    hashcode: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    whichattempts: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    timemodified: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    firstattemptscount: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    highestattemptscount: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    lastattemptscount: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    allattemptscount: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    firstattemptsavg: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    highestattemptsavg: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    lastattemptsavg: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    allattemptsavg: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    median: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    standarddeviation: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    skewness: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    kurtosis: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    cic: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    errorratio: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    standarderror: {
      type: DataTypes.DOUBLE,
      allowNull: true
    }
  }, {
    tableName: config.db.prefix + 'quiz_statistics'
  });
};
