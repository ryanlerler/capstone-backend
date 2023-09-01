"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("listings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      pub_included: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      pax_count: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      air_con: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      internet: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      furnished_condition: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      level: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      advertised_by: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      lease_month: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      gender: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      availability: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      cooking_allowed: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      bedroom_count: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      washroom_attached: {
        type: Sequelize.BOOLEAN,
      },
      lift: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      washroom_count: {
        type: Sequelize.INTEGER,
      },
      visitor_allowed: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      pet_allowed: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      cea_registration_no: {
        type: Sequelize.STRING,
      },
      full_address: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      postal_code: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      location_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "locations",
          key: "id",
        },
      },
      click_count: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      rented: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      latitude: {
        type: Sequelize.STRING,
      },
      longitude: {
        type: Sequelize.STRING,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      property_type_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "property_types",
          key: "id",
        },
      },
      room_type_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "room_types",
          key: "id",
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable("files", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      url: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      listing_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "listings",
          key: "id",
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable("likes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      liked: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      listing_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "listings",
          key: "id",
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable("comments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      text: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      listing_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "listings",
          key: "id",
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable("conversations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      sender_typing_status: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      receiver_typing_status: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      comment_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "comments",
          key: "id",
        },
      },
      sender_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      receiver_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable("messages", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      text: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      read_status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      conversation_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "conversations",
          key: "id",
        },
      },
      sender_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable("user_listings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      currentlyLiving: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      listing_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "listings",
          key: "id",
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable("user_reviews", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      text: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      rating: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      listing_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "listings",
          key: "id",
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("user_reviews");
    await queryInterface.dropTable("user_listings");
    await queryInterface.dropTable("messages");
    await queryInterface.dropTable("conversations");
    await queryInterface.dropTable("comments");
    await queryInterface.dropTable("likes");
    await queryInterface.dropTable("files");
    await queryInterface.dropTable("listings");
  },
};
