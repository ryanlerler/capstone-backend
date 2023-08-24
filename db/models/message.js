"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      this.belongsTo(models.user, {
        foreignKey: "senderId",
      });
      this.hasMany(models.message);
    }
  }
  Message.init(
    {
      text: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      readStatus: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      conversationId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "conversation",
          key: "id",
        },
      },
      senderId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "user",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "message",
      underscored: true,
    }
  );
  return Message;
};
