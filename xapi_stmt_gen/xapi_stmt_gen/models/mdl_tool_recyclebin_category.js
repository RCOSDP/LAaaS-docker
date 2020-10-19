/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'tool_recyclebin_category', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    categoryid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    shortname: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    timecreated: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    tableName: config.db.prefix + 'tool_recyclebin_category'
  });
};
