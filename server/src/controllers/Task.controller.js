const TaskService = require("../services/Task.service");
const formatResponse = require("../utils/formatResponse");
const { Task } = require("../db/models");

class TaskController {
  static async getAll(req, res) {
    try {
      const tasks = await TaskService.getAll();

      if (tasks.length === 0) {
        return res.status(200).json(formatResponse(200, "Данных нет", []));
      }

      return res
        .status(200)
        .json(formatResponse(200, "Данных успешно получены", tasks));
    } catch ({ message }) {
      console.log("=============TaskController.getAll=============", message);
      res
        .status(500)
        .json(formatResponse(500, "Внутренняя ошибка сервера", null, message));
    }
  }


  static async getById(req, res) {
    const { id } = req.params;

    if (isNaN(id))
      return res
        .status(400)
        .json(
          formatResponse(
            400,
            "Невалидный id задачи",
            null,
            "Невалидный id задачи"
          )
        );

    try {
      const task = await TaskService.getById(id);

      if (!task) {
        return res
          .status(404)
          .json(
            formatResponse(404, "Не найдена задача", null, "Не найдена задача")
          );
      }

      return res
        .status(200)
        .json(
          formatResponse(200, `Данные по задаче ${id} успешно получены`, task)
        );
    } catch ({ message }) {
      console.log("=============TaskController.getById=============", message);
      res
        .status(500)
        .json(formatResponse(500, "Внутренняя ошибка сервера", null, message));
    }
  }

  static async create(req, res) {
    const { user } = res.locals;
    const { isValid, error } = Task.validate(req.body);
    if (!isValid) {
      return res.status(400).json(formatResponse(400, error, null, error));
    }

    try {
      const newTask = await TaskService.create({
        ...req.body,
        user_id: user.id,
      });

      if (!newTask)
        return res
          .status(400)
          .json(
            formatResponse(
              400,
              "не удалось создать запись в бд",
              null,
              "не удалось создать запись в бд"
            )
          );

      return res
        .status(201)
        .json(formatResponse(201, "Успешна создана новая таска", newTask));
    } catch ({ message }) {
      console.log("=============TaskController.create=============", message);
      res
        .status(500)
        .json(formatResponse(500, "Внутренняя ошибка сервера", null, message));
    }
  }

  static async updateById(req, res) {
    const { id } = req.params;

    if (isNaN(id))
      return res
        .status(400)
        .json(
          formatResponse(
            400,
            "Невалидный id задачи",
            null,
            "Невалидный id задачи"
          )
        );

    const { isValid, error } = Task.validate(req.body);
    if (!isValid) {
      return res.status(400).json(formatResponse(400, error, null, error));
    }

    try {
      const updatedTask = await TaskService.updateById(id, req.body);

      if (!updatedTask)
        return res
          .status(404)
          .json(
            formatResponse(
              404,
              "не удалось найти запись в бд",
              null,
              "не удалось найти запись в бд"
            )
          );

      return res
        .status(200)
        .json(
          formatResponse(200, `Успешна изменена таска с id ${id}`, updatedTask)
        );
    } catch ({ message }) {
      console.log("=============TaskController.update=============", message);
      res
        .status(500)
        .json(formatResponse(500, "Внутренняя ошибка сервера", null, message));
    }
  }

  static async deleteById(req, res) {
    const { id } = req.params;
    const { user } = res.locals;

    if (isNaN(id))
      return res
        .status(400)
        .json(
          formatResponse(
            400,
            "Невалидный id задачи",
            null,
            "Невалидный id задачи"
          )
        );

    try {
      const { error, data } = await TaskService.deleteById(id, user);

      if (error === "Не нашли задачу")
        return res
          .status(404)
          .json(
            formatResponse(
              404,
              "не удалось найти запись в бд",
              null,
              "не удалось найти запись в бд"
            )
          );

      if (error === "Недостаточно прав")
        return res
          .status(400)
          .json(
            formatResponse(
              400,
              "недостаточно прав для удаления",
              null,
              "недостаточно прав для удаления"
            )
          );

      return res
        .status(200)
        .json(formatResponse(200, `Успешна удалена таска с id ${id}`, data));
    } catch ({ message }) {
      console.log("=============TaskController.delete=============", message);
      res
        .status(500)
        .json(formatResponse(500, "Внутренняя ошибка сервера", null, message));
    }
  }
}

module.exports = TaskController;
