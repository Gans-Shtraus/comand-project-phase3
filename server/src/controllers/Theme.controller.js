const ThemeService = require('../services/Theme.service');
const formatResponse = require('../utils/formatResponse');

class ThemeController {
  static async getAll(req, res) {
    try {
      const themes = await ThemeService.getDistinctThemes();
      return res.status(200).json(formatResponse(200, 'Темы получены', themes));
    } catch ({ message }) {
      res
        .status(500)
        .json(formatResponse(500, 'Внутренняя ошибка сервера', null, message));
    }
  }

  static async getByThemeId(req, res) {
    const { themeId } = req.params;
    try {
      const questions = await ThemeService.getByThemeId(themeId);
      return res
        .status(200)
        .json(formatResponse(200, 'Вопросы по теме получены', questions));
    } catch ({ message }) {
      res
        .status(500)
        .json(formatResponse(500, 'Внутренняя ошибка сервера', null, message));
    }
  }

  static async getBoard(req, res) {
    try {
      const board = await ThemeService.getBoard();
      return res
        .status(200)
        .json(formatResponse(200, 'Доска вопросов получена', board));
    } catch ({ message }) {
      res
        .status(500)
        .json(formatResponse(500, 'Внутренняя ошибка сервера', null, message));
    }
  }

  static async getThemes(req, res) {
    try {
      const themes = await ThemeService.getThemes();
      return res
        .status(200)
        .json(formatResponse(200, 'Темы из таблицы получены', themes));
    } catch ({ message }) {
      res
        .status(500)
        .json(formatResponse(500, 'Внутренняя ошибка сервера', null, message));
    }
  }
}

module.exports = ThemeController;


