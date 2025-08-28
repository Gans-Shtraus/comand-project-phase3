const { Question } = require('../db/models');

class QuestionService {
  // Получить все вопросы
  static async getAll() {
    return await Question.findAll({
      order: [['id', 'ASC']],
    });
  }

  // Получить вопрос по id
  static async getById(id) {
    const question = await Question.findByPk(id);
    return question || null;
  }

  // Получить все вопросы по теме
  static async getByTheme(themeId) {
    return await Question.findAll({
      where: { themeId },
      order: [['id', 'ASC']],
    });
  }

  // Получить случайный вопрос
  static async getRandom() {
    const count = await Question.count();
    if (count === 0) return null;
    const randomIndex = Math.floor(Math.random() * count);
    const question = await Question.findOne({ offset: randomIndex });
    return question;
  }
}

module.exports = QuestionService;
