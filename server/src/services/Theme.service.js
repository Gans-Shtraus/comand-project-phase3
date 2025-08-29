'use strict';
const { Question, Sequelize } = require('../db/models');

class ThemeService {
  static async getDistinctThemes() {
    const rows = await Question.findAll({
      attributes: [
        'themeId',
        [Sequelize.fn('COUNT', Sequelize.col('*')), 'count'],
      ],
      group: ['themeId'],
      order: [['themeId', 'ASC']],
      raw: true,
    });
    return rows.map((r) => ({ themeId: r.themeId, count: Number(r.count) }));
  }

  static async getByThemeId(themeId) {
    return await Question.findAll({
      where: { themeId },
      order: [['points', 'ASC'], ['id', 'ASC']],
    });
  }

  static async getBoard() {
    const questions = await Question.findAll({
      order: [['themeId', 'ASC'], ['points', 'ASC'], ['id', 'ASC']],
      raw: true,
    });
    const map = new Map();
    for (const q of questions) {
      if (!map.has(q.themeId)) map.set(q.themeId, []);
      map.get(q.themeId).push(q);
    }
    const board = Array.from(map.entries()).map(([themeId, items]) => ({
      themeId,
      count: items.length,
      questions: items,
    }));
    board.sort((a, b) => Number(a.themeId) - Number(b.themeId));
    return board;
  }
}

module.exports = ThemeService;


