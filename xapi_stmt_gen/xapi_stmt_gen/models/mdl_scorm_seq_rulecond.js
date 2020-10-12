/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'scorm_seq_rulecond', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    scoid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    ruleconditionsid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    refrencedobjective: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    measurethreshold: {
      type: DataTypes.REAL,
      allowNull: false,
      defaultValue: '0.0000'
    },
    operator: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'noOp'
    },
    cond: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'always'
    }
  }, {
    tableName: config.db.prefix + 'scorm_seq_rulecond'
  });
};
