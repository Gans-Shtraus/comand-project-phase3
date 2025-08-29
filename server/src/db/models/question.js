'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    static associate({ Theme }) {
      this.belongsTo(Theme, { foreignKey: 'themeId' });
    }
  }
  Question.init(
    {
      questionText: DataTypes.STRING,
      correctAnswer: DataTypes.STRING,
      answerOptions: DataTypes.JSON, // Массив всех вариантов ответов
      points: DataTypes.INTEGER,
      themeId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Question',
    }
  );
  return Question;
};
