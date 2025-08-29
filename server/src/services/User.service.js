const { User } = require("../db/models");

class UserService {
  static async getAll() {
    return await User.findAll();
  }

  static async getById(id) {
    return await User.findByPk(id);
  }

  static async getByEmail(email) {
    return (await User.findOne({ where: { email } }))?.get();
  }

  static async updateById(id, data) {
    const userForUpdate = await this.getById(id);

    if (!userForUpdate) return null;

    const { username, email } = data;

    if (username) {
      userForUpdate.username = username;
    }

    if (email) {
      userForUpdate.email = email;
    }

    await userForUpdate.save();
    return userForUpdate;
  }

  static async create(userData) {
    return await User.create(userData);
  }

  static async deleteById(id) {
    console.log("============ >>>>>>>>", id);
    const userForDestroy = await this.getById(id);
    console.log("============ >>>>>>>>", userForDestroy);

    if (!userForDestroy)
      return {
        data: null,
        error: "Не нашли пользователя",
      };

    return {
      error: null,
      data: await userForDestroy.destroy(),
    };
  }
  static async addPoints(id, points) {
    const userForUpdate = await this.getById(id);
    if (!userForUpdate) return null;
    userForUpdate.points += points;
    await userForUpdate.save();
    return userForUpdate;
  }
}

module.exports = UserService;
