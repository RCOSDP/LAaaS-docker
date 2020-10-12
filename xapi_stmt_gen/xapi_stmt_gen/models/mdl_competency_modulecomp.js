/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'competency_modulecomp', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    cmid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    timecreated: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    timemodified: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    usermodified: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    sortorder: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    competencyid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    ruleoutcome: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: config.db.prefix + 'competency_modulecomp'
  });
};
