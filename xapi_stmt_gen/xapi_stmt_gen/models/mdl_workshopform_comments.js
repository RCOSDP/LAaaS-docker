/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'workshopform_comments', {
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
    sort: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: '0'
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    descriptionformat: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'workshopform_comments'
  });
};
