/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'block_community', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    coursename: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    coursedescription: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    courseurl: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    imageurl: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: config.db.prefix + 'block_community'
  });
};
