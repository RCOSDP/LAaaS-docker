/* jshint indent: 2 */

const config = require('../config/app');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'badge_manual_award', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    badgeid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    recipientid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    issuerid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    issuerrole: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    datemet: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    tableName: config.db.prefix + 'badge_manual_award'
  });
};
