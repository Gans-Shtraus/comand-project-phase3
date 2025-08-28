"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: "user_id" });
    }

    static validate(data) {
      if (!data) {
        return {
          isValid: false,
          error: "Данные не переданы",
        };
      }

      const { title, desc } = data;

      if (!title || typeof title !== "string" || title.trim().length === 0) {
        return {
          isValid: false,
          error: "Название задачи не должно быть пустым",
        };
      }

      if (!desc || typeof desc !== "string" || desc.trim().length === 0) {
        return {
          isValid: false,
          error: "Описание задачи не должно быть пустым",
        };
      }

      return {
        isValid: true,
        error: null,
      };
    }
  }

  Task.init(
    {
      title: DataTypes.STRING,
      desc: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Task",
    }
  );
  return Task;
};
