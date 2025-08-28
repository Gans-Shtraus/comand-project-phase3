"use strict";
const bcrypt = require("bcrypt");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Task }) {
      this.hasMany(Task, { foreignKey: "user_id" });
    }

    static validateEmail(email) {
      const emailPattern = /^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,}$/;
      return emailPattern.test(email);
    }

    static validatePassword(password) {
      const hasUpperCase = /[A-Z]/;
      const hasLowerCase = /[a-z]/;
      const hasNumbersCase = /\d/;
      const hasSpesialcharacters = /[!@#$%^&*()-,.?":{}|<>]/;
      const hasValidLength = password.length >= 8;

      if (
        !hasUpperCase.test(password) ||
        !hasLowerCase.test(password) ||
        !hasNumbersCase.test(password) ||
        !hasSpesialcharacters.test(password) ||
        !hasValidLength
      ) {
        return false;
      }
      return true;
    }

    static validateSingUpData({ username, email, password }) {
      if (
        !username ||
        typeof username !== "string" ||
        username.trim().length === 0
      ) {
        return {
          isValid: false,
          error: "Поле username не должно быть пустым",
        };
      }

      if (
        !email ||
        typeof email !== "string" ||
        email.trim().length === 0 ||
        !this.validateEmail(email)
      ) {
        return {
          isValid: false,
          error: "Поле email должн быть валидным",
        };
      }

      if (
        !password ||
        typeof password !== "string" ||
        password.trim().length === 0 ||
        !this.validatePassword(password)
      ) {
        return {
          isValid: false,
          error:
            "Поле password не должно быть пустым, должен содержать одну большую букыу, одну маленькую, один специальный символ и не должен быть короче 8 символов",
        };
      }

      return {
        isValid: true,
        error: null,
      };
    }

    static validateSingInData({ email, password }) {
      if (!email || typeof email !== "string" || email.trim().length === 0) {
        return {
          isValid: false,
          error: "Поле email не должно быть пустым",
        };
      }

      if (
        !password ||
        typeof password !== "string" ||
        password.trim().length === 0
      ) {
        return {
          isValid: false,
          error: "Поле password не должно быть пустым",
        };
      }

      return {
        isValid: true,
        error: null,
      };
    }

    static validateUpdateData({ username, email }) {
      if (
        !username ||
        typeof username !== "string" ||
        username.trim().length === 0
      ) {
        return {
          isValid: false,
          error: "Поле username не должно быть пустым",
        };
      }

      if (
        !email ||
        typeof email !== "string" ||
        email.trim().length === 0 ||
        !this.validateEmail(email)
      ) {
        return {
          isValid: false,
          error: "Поле email должн быть валидным",
        };
      }

      return {
        isValid: true,
        error: null,
      };
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: async (newUser) => {
          const hashedPassword = await bcrypt.hash(newUser.password, 10);
          newUser.password = hashedPassword;
          newUser.email = newUser.email.trim().toLowerCase();
          newUser.username = newUser.username.trim().toLowerCase();
        },
        afterCreate: (newUser) => {
          const rawUser = newUser.get();
          delete rawUser.password;
        },
      },
    }
  );
  return User;
};
