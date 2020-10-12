/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'grade_import_newitem', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    itemname: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    importcode: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    importer: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    tableName: config.db.prefix + 'grade_import_newitem'
  });
};
