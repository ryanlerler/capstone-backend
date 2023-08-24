"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserReview extends Model {
    static associate(models) {
      this.belongsTo(models.listing);
      this.belongsTo(models.user);
    }
  }
  UserReview.init(
    {
      text: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      rating: {
        allowNull: false,
        type: DataTypes.INTEGER,
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
      modelName: "userReview",
      underscored: true,
    }
  );
  return UserReview;
};
