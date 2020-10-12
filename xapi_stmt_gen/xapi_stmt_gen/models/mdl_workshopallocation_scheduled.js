/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'workshopallocation_scheduled', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    workshopid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    enabled: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    submissionend: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    timeallocated: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    settings: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    resultstatus: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    resultmessage: {
      type: DataTypes.STRING,
      allowNull: true
    },
    resultlog: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: config.db.prefix + 'workshopallocation_scheduled'
  });
};
