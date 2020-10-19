/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'question', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    category: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    parent: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    questiontext: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    questiontextformat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    generalfeedback: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    generalfeedbackformat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    defaultmark: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: '1'
    },
    penalty: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: '0.3333333'
    },
    qtype: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    length: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '1'
    },
    stamp: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    version: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    hidden: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
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
    createdby: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    modifiedby: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    idnumber: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: config.db.prefix + 'question'
  });
};
