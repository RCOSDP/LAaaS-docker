/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('xapi_records_processed', {
    objecttable: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    objectid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    send_date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'xapi_records_processed',
    timestamps: false
  });
};
