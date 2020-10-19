/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'qtype_ddmarker_drops', {
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
    shape: {
      type: DataTypes.STRING,
      allowNull: true
    },
    coords: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    choice: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'qtype_ddmarker_drops'
  });
};
