"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class File extends Model {
    static associate(models) {
      this.belongsTo(models.listing);
    }
  }
  File.init(
    {
      type: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      url: {
        allowNull: false,
        type: DataTypes.TEXT,
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
      modelName: "file",
      underscored: true,
    }
  );
  return File;
};
