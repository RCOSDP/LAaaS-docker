/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'glossary_entries', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    glossaryid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    userid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    concept: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    definition: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    definitionformat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    definitiontrust: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    attachment: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    timecreated: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    timemodified: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    teacherentry: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    sourceglossaryid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    usedynalink: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    casesensitive: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    fullmatch: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    approved: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    }
  }, {
    tableName: config.db.prefix + 'glossary_entries'
  });
};
