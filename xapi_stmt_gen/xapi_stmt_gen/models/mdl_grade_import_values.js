/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'grade_import_values', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    itemid: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    newgradeitem: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    userid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    finalgrade: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    feedback: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    importcode: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    importer: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    importonlyfeedback: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'grade_import_values'
  });
};
