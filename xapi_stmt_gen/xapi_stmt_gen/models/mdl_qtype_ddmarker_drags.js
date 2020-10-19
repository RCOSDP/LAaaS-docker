/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'qtype_ddmarker_drags', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    questionid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    no: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    label: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    infinite: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    noofdrags: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '1'
    }
  }, {
    tableName: config.db.prefix + 'qtype_ddmarker_drags'
  });
};
