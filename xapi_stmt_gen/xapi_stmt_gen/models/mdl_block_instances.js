/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'block_instances', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    blockname: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    parentcontextid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    showinsubcontexts: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    requiredbytheme: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    pagetypepattern: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    subpagepattern: {
      type: DataTypes.STRING,
      allowNull: true
    },
    defaultregion: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    defaultweight: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    configdata: {
      type: DataTypes.TEXT,
      allowNull: true
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
    tableName: config.db.prefix + 'block_instances'
  });
};
