/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'post', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    module: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    userid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    courseid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    groupid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    moduleid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    coursemoduleid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    uniquehash: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    rating: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    format: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    summaryformat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    attachment: {
      type: DataTypes.STRING,
      allowNull: true
    },
    publishstate: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'draft'
    },
    lastmodified: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    created: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    usermodified: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    tableName: config.db.prefix + 'post'
  });
};
