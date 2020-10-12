/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'scorm_seq_mapinfo', {
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
    objectiveid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    targetobjectiveid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    readsatisfiedstatus: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    readnormalizedmeasure: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    writesatisfiedstatus: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    writenormalizedmeasure: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'scorm_seq_mapinfo'
  });
};
