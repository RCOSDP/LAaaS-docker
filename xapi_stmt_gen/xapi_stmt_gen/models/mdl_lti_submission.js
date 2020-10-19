/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'lti_submission', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    ltiid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    userid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    datesubmitted: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    dateupdated: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    gradepercent: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    originalgrade: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    launchid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    state: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: config.db.prefix + 'lti_submission'
  });
};
