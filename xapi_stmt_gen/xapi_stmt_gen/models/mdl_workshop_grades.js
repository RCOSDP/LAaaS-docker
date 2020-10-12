/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'workshop_grades', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    assessmentid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    strategy: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    dimensionid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    grade: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    peercomment: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    peercommentformat: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'workshop_grades'
  });
};
