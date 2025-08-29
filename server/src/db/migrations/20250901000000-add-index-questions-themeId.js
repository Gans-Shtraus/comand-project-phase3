'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addIndex('Questions', ['themeId'], {
      name: 'idx_questions_themeId',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('Questions', 'idx_questions_themeId');
  },
};


