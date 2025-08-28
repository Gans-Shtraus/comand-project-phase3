"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "biba@biba.ru",
          username: "bibs",
          password: "FileSyemf3"
        },
        {
          email: "boba123@example.com",
          username: "bobaTheGreat",
          password: "SecurePasswOrd1!"
        },
        {
          email: "lola.bunny@looney.com",
          username: "lolaBunnyOfficial",
          password: "CarrotL0v3r"
        },
        {
          email: "petya_ivanov@mail.net",
          username: "petyaIvanov88",
          password: "MyP@$$wOrd"
        },
        {
          email: "olga_s@company.org",
          username: "olgaSokolova",
          password: "Str0ngP@ssw0rd"
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
