"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "listings",
      [
        {
          title: "",
          description: "",
          price: 0,
          pub_included: true,
          pax_count: 0,
          air_con: true,
          internet: true,
          furnished_condition: "",
          level: "",
          advertised_by: "",
          lease_month: "",
          gender: "",
          availability: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          cooking_allowed: true,
          bedroom_count: {
            allowNull: false,
            type: Sequelize.INTEGER,
          },
          washroom_attached: {
            type: Sequelize.BOOLEAN,
          },

          lift: true,
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
          },
          latitude: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          longitude: {
            allowNull: false,
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
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("listings", null, {});
  },
};
