/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'qtype_ddimageortext_drops', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    questionid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    no: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    xleft: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    ytop: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    choice: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    label: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: config.db.prefix + 'qtype_ddimageortext_drops'
  });
};
