"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Listing extends Model {
    static associate(models) {
      this.belongsTo(models.user);
      this.belongsTo(models.location);
      this.belongsTo(models.propertyType);
      this.belongsTo(models.roomType);
      this.hasMany(models.comment);
      this.hasMany(models.like);
      this.hasMany(models.file);
      this.belongsToMany(models.user, { through: "like" });
      this.belongsToMany(models.user, { through: "userListing" });
      this.belongsToMany(models.user, { through: "userReview" });
    }
  }
  Listing.init(
    {
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      price: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      pubIncluded: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      paxCount: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      airCon: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      internet: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      furnishedCondition: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      level: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      advertisedBy: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      leaseMonth: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      gender: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      availability: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      cookingAllowed: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      bedroomCount: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      washroomAttached: {
        type: DataTypes.BOOLEAN,
      },
      lift: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      washroomCount: {
        type: DataTypes.INTEGER,
      },
      visitorAllowed: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      petAllowed: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      fullAddress: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      postalCode: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      locationId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "location",
          key: "id",
        },
      },
      clickCount: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      rented: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      latitude: {
        type: DataTypes.FLOAT,
      },
      longitude: {
        type: DataTypes.FLOAT,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "user",
          key: "id",
        },
      },
      propertyTypeId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "propertyType",
          key: "id",
        },
      },
      roomTypeId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "roomType",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "listing",
      underscored: true,
    }
  );
  return Listing;
};
