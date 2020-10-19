/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'assignfeedback_editpdf_queue', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    submissionid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    submissionattempt: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    attemptedconversions: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'assignfeedback_editpdf_queue'
  });
};
