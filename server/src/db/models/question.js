'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  Question.init(
    {
      questionText: DataTypes.STRING,
      correctAnswer: DataTypes.STRING,
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
