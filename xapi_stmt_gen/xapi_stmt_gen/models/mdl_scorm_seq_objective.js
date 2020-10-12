/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'scorm_seq_objective', {
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
    primaryobj: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    objectiveid: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    satisfiedbymeasure: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    minnormalizedmeasure: {
      type: DataTypes.REAL,
      allowNull: false,
      defaultValue: '0.0000'
    }
  }, {
    tableName: config.db.prefix + 'scorm_seq_objective'
  });
};
