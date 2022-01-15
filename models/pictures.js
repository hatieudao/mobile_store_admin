const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pictures', {
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
    link: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'pictures',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pictures_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
