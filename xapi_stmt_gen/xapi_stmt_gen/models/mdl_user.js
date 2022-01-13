/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.lms.prefix + 'user', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    auth: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'manual'
    },
    confirmed: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    policyagreed: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    deleted: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    suspended: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    mnethostid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    idnumber: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    emailstop: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    icq: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    skype: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    yahoo: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    aim: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    msn: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    phone1: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    phone2: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    institution: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    lang: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'en'
    },
    calendartype: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'gregorian'
    },
    theme: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    timezone: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '99'
    },
    firstaccess: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    lastaccess: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    lastlogin: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    currentlogin: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    lastip: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    secret: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    picture: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    descriptionformat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    mailformat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    maildigest: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    maildisplay: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '2'
    },
    autosubscribe: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    trackforums: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
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
    trustbitmask: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    imagealt: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lastnamephonetic: {
      type: DataTypes.STRING,
      allowNull: true
    },
    firstnamephonetic: {
      type: DataTypes.STRING,
      allowNull: true
    },
    middlename: {
      type: DataTypes.STRING,
      allowNull: true
    },
    alternatename: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: config.db.lms.prefix + 'user'
  });
};
