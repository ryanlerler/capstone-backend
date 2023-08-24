"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.listing);
      this.hasMany(models.comment);
      this.hasMany(models.conversation, {
        foreignKey: "senderId",
      });
      this.hasMany(models.conversation, {
        foreignKey: "receiverId",
      });
      this.hasMany(models.message, {
        foreignKey: "senderId",
      });
      this.belongsToMany(models.listing, { through: "like" });
      this.belongsToMany(models.listing, { through: "userReview" });
      this.belongsToMany(models.listing, { through: "userListing" });
    }
  }
  User.init(
    {
      email: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      profilePicUrl: {
        type: DataTypes.TEXT,
      },
      contactNo: {
        type: DataTypes.INTEGER,
      },
      onlineStatus: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "user",
      underscored: true,
    }
  );
  return User;
};
