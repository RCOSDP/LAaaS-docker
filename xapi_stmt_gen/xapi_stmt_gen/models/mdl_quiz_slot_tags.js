/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'quiz_slot_tags', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    slotid: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    tagid: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    tagname: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: config.db.prefix + 'quiz_slot_tags'
  });
};
