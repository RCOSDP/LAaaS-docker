/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'rating', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    contextid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    component: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    ratingarea: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    itemid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    scaleid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    rating: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    userid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    timecreated: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    timemodified: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    tableName: config.db.prefix + 'rating'
  });
};
