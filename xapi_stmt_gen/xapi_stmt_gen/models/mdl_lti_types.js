/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'lti_types', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'basiclti Activity'
    },
    baseurl: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    tooldomain: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    state: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '2'
    },
    course: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    coursevisible: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    toolproxyid: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    enabledcapability: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    parameter: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    icon: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    secureicon: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    createdby: {
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
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: config.db.prefix + 'lti_types'
  });
};
