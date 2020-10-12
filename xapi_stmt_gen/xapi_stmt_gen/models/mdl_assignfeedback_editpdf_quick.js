/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'assignfeedback_editpdf_quick', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    rawtext: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    width: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '120'
    },
    colour: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'yellow'
    }
  }, {
    tableName: config.db.prefix + 'assignfeedback_editpdf_quick'
  });
};
