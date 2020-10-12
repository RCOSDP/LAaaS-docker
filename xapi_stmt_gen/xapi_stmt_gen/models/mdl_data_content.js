/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'data_content', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    fieldid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    recordid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    content1: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    content2: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    content3: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    content4: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: config.db.prefix + 'data_content'
  });
};
