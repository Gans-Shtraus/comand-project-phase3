'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('Questions', {
      fields: ['themeId'],
      type: 'foreign key',
      name: 'fk_questions_themeId_themes_id',
      references: {
        table: 'Themes',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint(
      'Questions',
      'fk_questions_themeId_themes_id'
    );
  },
};


