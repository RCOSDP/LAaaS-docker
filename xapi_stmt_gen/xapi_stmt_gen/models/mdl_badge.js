/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'badge', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    timecreated: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    timemodified: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    usercreated: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    usermodified: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    issuername: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    issuerurl: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    issuercontact: {
      type: DataTypes.STRING,
      allowNull: true
    },
    expiredate: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    expireperiod: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    courseid: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    messagesubject: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    attachment: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    notification: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    nextcron: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    version: {
      type: DataTypes.STRING,
      allowNull: true
    },
    language: {
      type: DataTypes.STRING,
      allowNull: true
    },
    imageauthorname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    imageauthoremail: {
      type: DataTypes.STRING,
      allowNull: true
    },
    imageauthorurl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    imagecaption: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: config.db.prefix + 'badge'
  });
};
