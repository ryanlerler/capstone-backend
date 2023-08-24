"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("room_types", [
      {
        type: "Master Room",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        type: "Common Room",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        type: "Shared Room",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        type: "Whole Unit",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        type: "Utility Room",
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
    await queryInterface.bulkDelete("room_types", null, {});
  },
};
