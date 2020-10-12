/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'imscp', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    course: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    intro: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    introformat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    revision: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    keepold: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '-1'
    },
    structure: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    timemodified: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'imscp'
  });
};
