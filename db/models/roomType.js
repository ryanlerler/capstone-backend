"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RoomType extends Model {
    static associate(models) {
      this.hasMany(models.listing);
    }
  }
  RoomType.init(
    {
      type: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "roomType",
      underscored: true,
    }
  );
  return RoomType;
};
