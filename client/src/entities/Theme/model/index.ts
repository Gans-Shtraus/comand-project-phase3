export type Theme = {
  themeId?: number;
  name: string;
  slug?: string;
};

export type Question = {
  id?: number;
  questionText: string;
  correctAnswer: string;
  themeId?: number;
  // Добавьте другие поля, если необходимо
};

export type Board = {
  id?: number;
  title: string;
  questions: Question[];
  // Другие поля доски, если есть
};
