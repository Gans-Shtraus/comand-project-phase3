const questionRouter = require('express').Router();
const QuestionController = require('../controllers/Question.controller');

// Получить все вопросы
questionRouter.get('/', QuestionController.getAll);

// Получить случайный вопрос
questionRouter.get('/random', QuestionController.getRandom);

// Получить вопросы по теме
questionRouter.get('/theme/:themeId', QuestionController.getByTheme);

// Получить вопрос по id
questionRouter.get('/:id', QuestionController.getById);

module.exports = questionRouter;
