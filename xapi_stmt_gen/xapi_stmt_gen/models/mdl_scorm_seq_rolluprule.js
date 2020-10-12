/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'scorm_seq_rolluprule', {
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
    childactivityset: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    minimumcount: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    minimumpercent: {
      type: DataTypes.REAL,
      allowNull: false,
      defaultValue: '0.0000'
    },
    conditioncombination: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'all'
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: config.db.prefix + 'scorm_seq_rolluprule'
  });
};
