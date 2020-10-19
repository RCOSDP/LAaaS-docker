/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'enrol_paypal', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    business: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    receiver_email: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    receiver_id: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    item_name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    courseid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    userid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    instanceid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    memo: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    tax: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    option_name1: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    option_selection1_x: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    option_name2: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    option_selection2_x: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    payment_status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    pending_reason: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    reason_code: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    txn_id: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    parent_txn_id: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    payment_type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    timeupdated: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: config.db.prefix + 'enrol_paypal'
  });
};
