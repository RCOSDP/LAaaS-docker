/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'workshopform_rubric_config', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    workshopid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    layout: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'list'
    }
  }, {
    tableName: config.db.prefix + 'workshopform_rubric_config'
  });
};
