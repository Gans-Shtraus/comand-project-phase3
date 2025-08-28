const QuestionService = require('../services/Question.Service');
const formatResponse = require('../utils/formatResponse');

class QuestionController {
  static async getAll(req, res) {
    try {
      const questions = await QuestionService.getAll();
      return res.json(formatResponse(true, questions));
    } catch (e) {
      return res.status(500).json(formatResponse(false, null, e.message));
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const question = await QuestionService.getById(id);
      if (!question)
        return res
          .status(404)
          .json(formatResponse(false, null, 'Question not found'));
      return res.json(formatResponse(true, question));
    } catch (e) {
      return res.status(500).json(formatResponse(false, null, e.message));
    }
  }

  static async getByTheme(req, res) {
    try {
      const { themeId } = req.params;
      const questions = await QuestionService.getByTheme(themeId);
      return res.json(formatResponse(true, questions));
    } catch (e) {
      return res.status(500).json(formatResponse(false, null, e.message));
    }
  }

  static async getRandom(req, res) {
    try {
      const question = await QuestionService.getRandom();
      if (!question)
        return res
          .status(404)
          .json(formatResponse(false, null, 'No questions available'));
      return res.json(formatResponse(true, question));
    } catch (e) {
      return res.status(500).json(formatResponse(false, null, e.message));
    }
  }
}

module.exports = QuestionController;
