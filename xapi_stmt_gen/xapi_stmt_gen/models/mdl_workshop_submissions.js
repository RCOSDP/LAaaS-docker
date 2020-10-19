/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'workshop_submissions', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    workshopid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    example: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '0'
    },
    authorid: {
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
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    contentformat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    contenttrust: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    attachment: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '0'
    },
    grade: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    gradeover: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    gradeoverby: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    feedbackauthor: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    feedbackauthorformat: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '0'
    },
    timegraded: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    published: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '0'
    },
    late: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'workshop_submissions'
  });
};
