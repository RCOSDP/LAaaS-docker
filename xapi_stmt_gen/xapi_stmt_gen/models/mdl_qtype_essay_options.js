/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'qtype_essay_options', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    questionid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    responseformat: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'editor'
    },
    responserequired: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    responsefieldlines: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '15'
    },
    attachments: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    attachmentsrequired: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    graderinfo: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    graderinfoformat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    responsetemplate: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    responsetemplateformat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    filetypeslist: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: config.db.prefix + 'qtype_essay_options'
  });
};
