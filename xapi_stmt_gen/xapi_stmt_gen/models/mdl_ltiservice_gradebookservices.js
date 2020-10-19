/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'ltiservice_gradebookservices', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    gradeitemid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    courseid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    toolproxyid: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    typeid: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    baseurl: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ltilinkid: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: config.db.prefix + 'ltiservice_gradebookservices'
  });
};
