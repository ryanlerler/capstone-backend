"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("property_types", [
      {
        type: "HDB",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        type: "Condo",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        type: "Apartment",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        type: "Landed House",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        type: "Studio",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        type: "Shophouse",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        type: "Others",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("property_types", null, {});
  },
};
