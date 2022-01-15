const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('configurations', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    specification_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'specifications',
        key: 'id'
      }
    },
    mobile_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'mobiles',
        key: 'id'
      }
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'configurations',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "configurations_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
