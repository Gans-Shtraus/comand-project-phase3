"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Tasks",
      [
        {
          title: "Сдать экзамен второй фазы",
          desc: "Ну хотя бы постараться его сдать",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Подготовить презентацию по проекту",
          desc: "Сделать слайды и репетировать речь",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Сдать лабораторную работу",
          desc: "Выполнить все задания из практики",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Прочитать главы из учебника",
          desc: "Изучить теорию и сделать конспект",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Посетить консультацию у преподавателя",
          desc: "Прояснить сложные моменты материала",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Tasks", null, {});
  },
};
