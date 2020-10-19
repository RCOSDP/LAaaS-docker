/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'auth_oauth2_linked_login', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    timecreated: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    timemodified: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    usermodified: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    userid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    issuerid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    confirmtoken: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    confirmtokenexpires: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    tableName: config.db.prefix + 'auth_oauth2_linked_login'
  });
};
