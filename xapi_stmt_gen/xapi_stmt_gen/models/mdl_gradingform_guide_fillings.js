/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'gradingform_guide_fillings', {
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
    remark: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    remarkformat: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    score: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  }, {
    tableName: config.db.prefix + 'gradingform_guide_fillings'
  });
};
