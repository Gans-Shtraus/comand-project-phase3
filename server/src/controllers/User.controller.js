const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserService = require("../services/User.service");
const { User } = require("../db/models");
const formatResponse = require("../utils/formatResponse");
const generateJWTTokens = require("../utils/generateJWTTokens");
const cookieConfig = require("../config/cookieConfig");

class UserController {
  static async refreshTokens(req, res) {
    try {
      const { refreshToken } = req.cookies;
      const { user } = jwt.verify(
        refreshToken,
        process.env.SECRET_REFRESH_TOKEN
      );

      const { accessToken, refreshToken: newRefreshToken } = generateJWTTokens({
        user,
      });

      return res
        .status(200)
        .cookie("refreshToken", newRefreshToken, cookieConfig)
        .json(
          formatResponse(200, "Успешно продлена пользовательская сессия", {
            user,
            accessToken,
          })
        );
    } catch ({ message }) {
      console.log("=============UserController.singIn=============", message);
      res
        .status(401)
        .json(formatResponse(401, "Invalid refreshToken", null, message));
    }
  }

  static async getAll(req, res) {
    try {
      const users = await UserService.getAll();

      if (users.length === 0) {
        return res
          .status(200)
          .json(formatResponse(200, "Пользователей нет", []));
      }

      return res
        .status(200)
        .json(formatResponse(200, "Данных пользователей получены", users));
    } catch ({ message }) {
      console.log("=============UserController.getAll=============", message);
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
            "Невалидный id пользователя",
            null,
            "Невалидный id пользователя"
          )
        );

    try {
      const user = await UserService.getById(id);

      if (!user) {
        return res
          .status(404)
          .json(
            formatResponse(
              404,
              "Не найден пользователь",
              null,
              "Не найден пользователь"
            )
          );
      }

      return res
        .status(200)
        .json(
          formatResponse(200, `Данные по пользователю успешно получены`, user)
        );
    } catch ({ message }) {
      console.log("=============UserController.getById=============", message);
      res
        .status(500)
        .json(formatResponse(500, "Внутренняя ошибка сервера", null, message));
    }
  }

  static async getByEmail(req, res) {
    const { email } = req.body;

    try {
      const user = await UserService.getByEmail(email);

      if (!user) {
        return res
          .status(404)
          .json(
            formatResponse(
              404,
              "Не найден пользователь",
              null,
              "Не найден пользователь"
            )
          );
      }

      return res
        .status(200)
        .json(
          formatResponse(
            200,
            `Данные по пользователю ${email} успешно получены`,
            user
          )
        );
    } catch ({ message }) {
      console.log(
        "=============UserController.getByEmail=============",
        message
      );
      res
        .status(500)
        .json(formatResponse(500, "Внутренняя ошибка сервера", null, message));
    }
  }

  static async signUp(req, res) {
    const { username, email, password } = req.body;

    const { isValid, error } = User.validateSingUpData({
      username,
      email,
      password,
    });

    if (!isValid) {
      return res
        .status(400)
        .json(formatResponse(400, "Validation Error", null, error));
    }

    const normalizedEmail = email.toLowerCase();

    try {
      const userFound = await UserService.getByEmail(normalizedEmail);

      if (userFound) {
        return res
          .status(400)
          .json(
            formatResponse(
              400,
              "Пользователь с таким email уже существует",
              null,
              "Пользователь с таким email уже существует"
            )
          );
      }
      const newUser = await UserService.create({
        email,
        username,
        password,
      });

      if (!newUser) {
        return res
          .status(500)
          .json(
            formatResponse(
              500,
              "Не удалось создать нового пользователя",
              null,
              "Не удалось создать нового пользователя"
            )
          );
      }

      const { accessToken, refreshToken } = generateJWTTokens({
        user: newUser,
      });

      return res
        .status(201)
        .cookie("refreshToken", refreshToken, cookieConfig)
        .json(
          formatResponse(201, "Успешная регистрация", {
            user: newUser,
            accessToken,
          })
        );
    } catch ({ message }) {
      console.log("=============UserController.singIn=============", message);
      res
        .status(500)
        .json(formatResponse(500, "Внутренняя ошибка сервера", null, message));
    }
  }

  static async signIn(req, res) {
    const { email, password } = req.body;

    const { isValid, error } = User.validateSingInData({
      email,
      password,
    });

    if (!isValid) {
      return res
        .status(400)
        .json(formatResponse(400, "Validation Error", null, error));
    }

    const normalizedEmail = email.toLowerCase();

    try {
      const userFound = await UserService.getByEmail(normalizedEmail);

      if (userFound === "not") {
        return res
          .status(400)
          .json(
            formatResponse(
              400,
              "Пользователь с таким email не найден",
              null,
              "Пользователь с таким email не найден"
            )
          );
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        userFound.password
      );

      if (!isPasswordValid) {
        return res
          .status(400)
          .json(
            formatResponse(400, "Неверный пароль", null, "Неверный пароль")
          );
      }

      delete userFound.password;

      const { accessToken, refreshToken } = generateJWTTokens({
        user: userFound,
      });

      return res
        .status(200)
        .cookie("refreshToken", refreshToken, cookieConfig)
        .json(
          formatResponse(200, "Выполнен успешный вход", {
            user: userFound,
            accessToken,
          })
        );
    } catch ({ message }) {
      console.log("=============UserController.singIn=============", message);
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
            "Невалидный id пользователя",
            null,
            "Невалидный id пользователя"
          )
        );

    const { isValid, error } = User.validateUpdateData(req.body);
    if (!isValid) {
      return res.status(400).json(formatResponse(400, error, null, error));
    }

    try {
      const updatedUser = await UserService.updateById(id, req.body);

      if (!updatedUser)
        return res
          .status(404)
          .json(
            formatResponse(
              404,
              "не удалось найти пользователя в бд",
              null,
              "не удалось найти пользователя в бд"
            )
          );

      return res
        .status(200)
        .json(formatResponse(200, `Успешна изменен пользователь`, updatedUser));
    } catch ({ message }) {
      console.log("=============UserController.update=============", message);
      res
        .status(500)
        .json(formatResponse(500, "Внутренняя ошибка сервера", null, message));
    }
  }

  static signOut(req, res) {
    try {
      res
        .clearCookie("refreshToken")
        .json(formatResponse(200, "Успешно вышли"));
    } catch ({ message }) {
      console.log("=============UserController.signOut=============", message);
      res
        .status(500)
        .json(formatResponse(500, "Внутренняя ошибка сервера", null, message));
    }
  }

  static async deleteById(req, res) {
    const { id } = req.params;

    if (isNaN(id))
      return res
        .status(400)
        .json(
          formatResponse(
            400,
            "Невалидный id пользователя",
            null,
            "Невалидный id пользователя"
          )
        );

    try {
      const { error, data } = await UserService.deleteById(id);

      if (error)
        return res
          .status(404)
          .json(
            formatResponse(
              404,
              "Не удалось удалить пользователя",
              null,
              "Не удалось удалить пользователя"
            )
          );

      return res
        .status(200)
        .json(formatResponse(200, `Успешна удален пользователь`, data));
    } catch ({ message }) {
      console.log("=============UserController.delete=============", message);
      res
        .status(500)
        .json(formatResponse(500, "Внутренняя ошибка сервера", null, message));
    }
  }
  static async addPoints(req, res) {
    const { id } = req.params;
    const { points } = req.body;
    if (isNaN(id))
      return res
        .status(400)
        .json(
          formatResponse(
            400,
            "Невалидный id пользователя",
            null,
            "Невалидный id пользователя"
          )
        );
    try {
      const user = await UserService.addPoints(id, points);
      return res
        .status(200)
        .json(formatResponse(200, `Успешно добавлены очки`, user));
    } catch ({ message }) {
      console.log(
        "=============UserController.addPoints=============",
        message
      );
      res
        .status(500)
        .json(formatResponse(500, "Внутренняя ошибка сервера", null, message));
    }
  }
}

module.exports = UserController;
