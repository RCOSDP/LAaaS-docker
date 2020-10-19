/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'backup_courses', {
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
    laststarttime: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    lastendtime: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    laststatus: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '5'
    },
    nextstarttime: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'backup_courses'
  });
};
