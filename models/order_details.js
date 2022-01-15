const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('order_details', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'orders',
        key: 'id'
      }
    },
    option_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'options',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'order_details',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "order_details_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
