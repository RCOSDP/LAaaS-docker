/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'scorm_seq_ruleconds', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    scoid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    conditioncombination: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'all'
    },
    ruletype: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: config.db.prefix + 'scorm_seq_ruleconds'
  });
};
