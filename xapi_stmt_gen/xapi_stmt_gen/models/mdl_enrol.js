/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'enrol', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    enrol: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    status: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    courseid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    sortorder: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    enrolperiod: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: '0'
    },
    enrolstartdate: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: '0'
    },
    enrolenddate: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: '0'
    },
    expirynotify: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '0'
    },
    expirythreshold: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: '0'
    },
    notifyall: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '0'
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cost: {
      type: DataTypes.STRING,
      allowNull: true
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: true
    },
    roleid: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: '0'
    },
    customint1: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    customint2: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    customint3: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    customint4: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    customint5: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    customint6: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    customint7: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    customint8: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    customchar1: {
      type: DataTypes.STRING,
      allowNull: true
    },
    customchar2: {
      type: DataTypes.STRING,
      allowNull: true
    },
    customchar3: {
      type: DataTypes.STRING,
      allowNull: true
    },
    customdec1: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    customdec2: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    customtext1: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    customtext2: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    customtext3: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    customtext4: {
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
    }
  }, {
    tableName: config.db.prefix + 'enrol'
  });
};
