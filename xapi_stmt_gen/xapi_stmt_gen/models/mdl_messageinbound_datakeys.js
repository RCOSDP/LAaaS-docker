/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'messageinbound_datakeys', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    handler: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    datavalue: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    datakey: {
      type: DataTypes.STRING,
      allowNull: true
    },
    timecreated: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    expires: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    tableName: config.db.prefix + 'messageinbound_datakeys'
  });
};
