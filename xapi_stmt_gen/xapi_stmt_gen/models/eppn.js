/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('eppn', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    scope: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    acl: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    tableName: 'eppn',
    timestamps: false
  });
};
