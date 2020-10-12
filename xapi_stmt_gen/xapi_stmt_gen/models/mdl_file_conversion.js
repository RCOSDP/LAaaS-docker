/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'file_conversion', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    usermodified: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    timecreated: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    timemodified: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    sourcefileid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    targetformat: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    status: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: '0'
    },
    statusmessage: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    converter: {
      type: DataTypes.STRING,
      allowNull: true
    },
    destfileid: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    data: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: config.db.prefix + 'file_conversion'
  });
};
