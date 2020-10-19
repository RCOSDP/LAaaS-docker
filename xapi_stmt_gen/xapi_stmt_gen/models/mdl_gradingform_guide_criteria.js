/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'gradingform_guide_criteria', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    definitionid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    sortorder: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    shortname: {
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
    descriptionmarkers: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    descriptionmarkersformat: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    maxscore: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  }, {
    tableName: config.db.prefix + 'gradingform_guide_criteria'
  });
};
