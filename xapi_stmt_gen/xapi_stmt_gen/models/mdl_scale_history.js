/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'scale_history', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    action: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    oldid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    source: {
      type: DataTypes.STRING,
      allowNull: true
    },
    timemodified: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    loggeduser: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    courseid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    userid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    scale: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: config.db.prefix + 'scale_history'
  });
};
