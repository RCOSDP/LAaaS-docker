/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'external_services', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    enabled: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    requiredcapability: {
      type: DataTypes.STRING,
      allowNull: true
    },
    restrictedusers: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    component: {
      type: DataTypes.STRING,
      allowNull: true
    },
    timecreated: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    timemodified: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    shortname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    downloadfiles: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    uploadfiles: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'external_services'
  });
};
