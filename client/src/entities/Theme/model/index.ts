export type Theme = {
  id?: number;
  name: string;
  description?: string;
};

export type Question = {
  id?: number;
  text: string;
  themeId?: number;
  // Добавьте другие поля, если необходимо
};

export type Board = {
  id?: number;
  title: string;
  questions: Question[];
  // Другие поля доски, если есть
};
