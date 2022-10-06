"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class size extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      size.hasMany(models.cars, {
        onDelete: "RESTRICT",
      });
    }
  }
  size.init(
    {
      size: DataTypes.STRING,
      car_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "car",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "size",
    }
  );
  return size;
};
