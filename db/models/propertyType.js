"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PropertyType extends Model {
    static associate(models) {
      this.hasMany(models.listing);
    }
  }
  PropertyType.init(
    {
      type: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "propertyType",
      underscored: true,
    }
  );
  return PropertyType;
};
