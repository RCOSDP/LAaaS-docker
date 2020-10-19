/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(config.db.prefix + 'assignfeedback_editpdf_cmnt', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    gradeid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    x: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: '0'
    },
    y: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: '0'
    },
    width: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: '120'
    },
    rawtext: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    pageno: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    colour: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'black'
    },
    draft: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    }
  }, {
    tableName: config.db.prefix + 'assignfeedback_editpdf_cmnt'
  });
};
