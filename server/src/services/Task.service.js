const { Task } = require("../db/models");

class TaskService {
  static async getAll() {
    return await Task.findAll();
  }

  static async getById(id) {
    return await Task.findByPk(id);
  }

  static async create(data) {
    return await Task.create(data);
  }

  static async bulkCreate(data) {
    return await Task.bulkCreate(data);
  }

  static async updateById(id, data) {
    const taskForUpdate = await this.getById(id);
    if (!taskForUpdate) return null;

    const { title, desc } = data;
    if (title) {
      taskForUpdate.title = title;
    }

    if (desc) {
      taskForUpdate.desc = desc;
    }

    await taskForUpdate.save();
    return taskForUpdate;
  }

  static async deleteById(id, user) {
    const taskForDestroy = await this.getById(id);

    if (!taskForDestroy)
      return {
        data: null,
        error: "Не нашли задачу",
      };

    if (taskForDestroy.user_id !== user.id)
      return {
        data: null,
        error: "Недостаточно прав",
      };

    return {
      error: null,
      data: await taskForDestroy.destroy(),
    };
  }
}

module.exports = TaskService;
