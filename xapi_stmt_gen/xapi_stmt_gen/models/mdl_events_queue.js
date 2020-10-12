/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'events_queue', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    eventdata: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    stackdump: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    userid: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    timecreated: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    tableName: config.db.prefix + 'events_queue'
  });
};
