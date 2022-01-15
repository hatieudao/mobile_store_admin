const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('options', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    mobile_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'mobiles',
        key: 'id'
      }
    },
    capacity_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'capacities',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    price: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(30),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'options',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "options_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
