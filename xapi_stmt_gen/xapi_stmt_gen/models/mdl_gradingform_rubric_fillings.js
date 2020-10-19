/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'gradingform_rubric_fillings', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    instanceid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    criterionid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    levelid: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    remark: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    remarkformat: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: config.db.prefix + 'gradingform_rubric_fillings'
  });
};
