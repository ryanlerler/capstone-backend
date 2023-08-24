"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    static associate(models) {
      this.belongsTo(models.comment);
      this.belongsTo(models.user, {
        foreignKey: "senderId",
      });
      this.belongsTo(models.user, {
        foreignKey: "receiverId",
      });
      this.hasMany(models.message);
    }
  }
  Conversation.init(
    {
      senderTypingStatus: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      receiverTypingStatus: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      commentId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "comment",
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
      receiverId: {
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
      modelName: "conversation",
      underscored: true,
    }
  );
  return Conversation;
};
