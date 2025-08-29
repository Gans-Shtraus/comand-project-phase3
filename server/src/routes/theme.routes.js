const themeRouter = require('express').Router();
const ThemeController = require('../controllers/Theme.controller');

themeRouter.get('/', ThemeController.getAll);
themeRouter.get('/board', ThemeController.getBoard);
themeRouter.get('/:themeId', ThemeController.getByThemeId);

module.exports = themeRouter;


