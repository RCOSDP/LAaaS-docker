/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'assign_user_flags', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    assignment: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    locked: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    mailed: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    extensionduedate: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    workflowstate: {
      type: DataTypes.STRING,
      allowNull: true
    },
    allocatedmarker: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'assign_user_flags'
  });
};
