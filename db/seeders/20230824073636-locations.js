"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("locations", [
      {
        name: "Boat Quay / Raffles Place / Marina",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Chinatown / Tanjong Pagar",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Alexandra / Commonwealth",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Harbourfront / Telok Blangah",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Buona Vista / West Coast / Clementi New Town",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "City Hall / Clarke Quay",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Beach Road / Bugis / Rochor",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Farrer Park / Serangoon Rd",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Orchard / River Valley",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Tanglin / Holland / Bukit Timah",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Newton / Novena",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Balestier / Toa Payoh",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Macpherson / Potong Pasir",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Eunos / Geylang / Paya Lebar",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "East Coast / Marine Parade",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Bedok / Upper East Coast",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Changi Airport / Changi Village",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Pasir Ris / Tampines",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Hougang / Punggol / Sengkang",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Ang Mo Kio / Bishan / Thomson",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Clementi Park / Upper Bukit Timah",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Boon Lay / Jurong / Tuas",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Dairy Farm / Bukit Panjang / Choa Chu Kang",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Lim Chu Kang / Tengah",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Admiralty / Woodlands",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Mandai / Upper Thomson",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Sembawang / Yishun",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Seletar / Yio Chu Kang",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("locations", null, {});
  },
};
