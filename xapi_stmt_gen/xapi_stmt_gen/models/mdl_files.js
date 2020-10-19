/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'files', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    contenthash: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    pathnamehash: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
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
    filearea: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    itemid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    filepath: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    userid: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    filesize: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    mimetype: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    source: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    author: {
      type: DataTypes.STRING,
      allowNull: true
    },
    license: {
      type: DataTypes.STRING,
      allowNull: true
    },
    timecreated: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    timemodified: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    sortorder: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    referencefileid: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    tableName: config.db.prefix + 'files'
  });
};
