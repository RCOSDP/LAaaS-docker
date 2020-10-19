/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'task_adhoc', {
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
    classname: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    nextruntime: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    faildelay: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    customdata: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    userid: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    blocking: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'task_adhoc'
  });
};
