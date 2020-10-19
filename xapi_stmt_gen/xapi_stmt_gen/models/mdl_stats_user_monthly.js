/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'stats_user_monthly', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
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
    roleid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    timeend: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    statsreads: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    statswrites: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    stattype: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: config.db.prefix + 'stats_user_monthly'
  });
};
