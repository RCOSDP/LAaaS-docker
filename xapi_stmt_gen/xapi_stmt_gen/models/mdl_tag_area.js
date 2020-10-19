/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'tag_area', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    component: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    itemtype: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    enabled: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    tagcollid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    callback: {
      type: DataTypes.STRING,
      allowNull: true
    },
    callbackfile: {
      type: DataTypes.STRING,
      allowNull: true
    },
    showstandard: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    multiplecontexts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'tag_area'
  });
};
