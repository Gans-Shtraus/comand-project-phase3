const apiRouter = require('express').Router();
const formatResponse = require('../utils/formatResponse');
const taskRouter = require('./task.routes');
const userRouter = require('./user.routes');
const questionRoutes = require('./question.routes');
const themeRouter = require('./theme.routes');

apiRouter.use('/questions', questionRoutes);
apiRouter.use('/themes', themeRouter);
apiRouter.use('/auth', userRouter);
apiRouter.use('/tasks', taskRouter);

apiRouter.use((req, res) => {
  res
    .status(404)
    .json(formatResponse(404, 'Ресурс не найден', null, 'Ресурс не найден'));
});

module.exports = apiRouter;
