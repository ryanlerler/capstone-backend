"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserListing extends Model {
    static associate(models) {
      this.belongsTo(models.listing);
      this.belongsTo(models.user);
    }
  }
  UserListing.init(
    {
      currentlyLiving: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "user",
          key: "id",
        },
      },
      listingId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "listing",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "userListing",
      underscored: true,
    }
  );
  return UserListing;
};
