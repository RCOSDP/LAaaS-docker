/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('xapi_records_processed', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
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
