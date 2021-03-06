/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'tool_dataprivacy_purpose', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    descriptionformat: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    lawfulbases: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    sensitivedatareasons: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    retentionperiod: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    protected: {
      type: DataTypes.INTEGER,
      allowNull: true
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
    }
  }, {
    tableName: config.db.prefix + 'tool_dataprivacy_purpose'
  });
};
