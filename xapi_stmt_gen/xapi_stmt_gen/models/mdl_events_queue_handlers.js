/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'events_queue_handlers', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    queuedeventid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    handlerid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    status: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    errormessage: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    timemodified: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    tableName: config.db.prefix + 'events_queue_handlers'
  });
};
