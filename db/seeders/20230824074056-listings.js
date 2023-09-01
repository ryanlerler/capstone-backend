"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "listings",
      [
        {
          title: "KING-SIZED BEDROOM",
          description: "Almost everything in the unit is in new condition.",
          price: 1050,
          pub_included: true,
          pax_count: 1,
          air_con: true,
          internet: true,
          furnished_condition: "Fully Furnished",
          level: "High",
          advertised_by: "Owner",
          lease_month: "6 months",
          gender: "Any",
          availability: "2023-08-31",
          cooking_allowed: true,
          bedroom_count: 1,
          washroom_attached: true,
          lift: true,
          visitor_allowed: true,
          pet_allowed: true,
          full_address:
            "177 ANG MO KIO AVENUE 4 KEBUN BARU LINK 2 SINGAPORE 560177",
          postal_code: 560177,
          location_id: 20,
          click_count: 0,
          rented: false,
          user_id: 1,
          property_type_id: 1,
          room_type_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("listings", null, {});
  },
};
