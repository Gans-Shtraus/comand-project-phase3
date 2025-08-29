"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Themes",
      [
        { name: "Горы", slug: "gory", createdAt: new Date(), updatedAt: new Date() },
        { name: "Еноты", slug: "enoty", createdAt: new Date(), updatedAt: new Date() },
        { name: "Страны", slug: "strany", createdAt: new Date(), updatedAt: new Date() },
        { name: "IT", slug: "it", createdAt: new Date(), updatedAt: new Date() },
        { name: "Достойный ответ", slug: "dostoinyj-otvet", createdAt: new Date(), updatedAt: new Date() },
        { name: "Ошибочка вышла!", slug: "oshibochka-vyshla", createdAt: new Date(), updatedAt: new Date() },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Themes", null, {});
  },
};


