/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'assignfeedback_editpdf_annot', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    gradeid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    pageno: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    x: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: '0'
    },
    y: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: '0'
    },
    endx: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: '0'
    },
    endy: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: '0'
    },
    path: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'line'
    },
    colour: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'black'
    },
    draft: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    }
  }, {
    tableName: config.db.prefix + 'assignfeedback_editpdf_annot'
  });
};
