/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'block_positions', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    blockinstanceid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    contextid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    pagetype: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    subpage: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    visible: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    region: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    weight: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    tableName: config.db.prefix + 'block_positions'
  });
};
