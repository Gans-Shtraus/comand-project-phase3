import { useEffect, useState, type JSX } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "@/app/redux/store";
import {
  getQuestionsByThemeIdThunk,
  getAllThemesThunk,
} from "@/entities/Theme/redux/thunk";
import type { Theme, Question } from "@/entities/Theme/model";
import "../style/index.module.css";

export function Theme(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { themes, questions, loading, error } = useSelector(
    (state: RootState) => state.themeSlice
  );
  const [selectedThemeId, setSelectedThemeId] = useState<string | null>(null);

  // Загружаем темы при монтировании
  useEffect(() => {
    dispatch(getAllThemesThunk());
  }, [dispatch]);

  // При выборе темы загружаем вопросы для этой темы
  useEffect(() => {
    if (selectedThemeId) {
      dispatch(getQuestionsByThemeIdThunk(selectedThemeId));
    }
  }, [dispatch, selectedThemeId]);

  const handleThemeSelect = (id?: number): void => {
    if (id !== undefined) setSelectedThemeId(id.toString());
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div className="questionPage">
      <h2>Выберите тему</h2>
      <ul className="themeList">
        {themes.map((theme: Theme) => (
          <li
            key={theme.id}
            className={
              theme.id?.toString() === selectedThemeId ? "activeTheme" : ""
            }
            onClick={() => handleThemeSelect(theme.id)}
          >
            {theme.name}
          </li>
        ))}
      </ul>

      <h3>Вопросы</h3>
      {questions.length === 0 && <p>Выберите тему, чтобы увидеть вопросы.</p>}
      <ul className="questionList">
        {questions.map((question: Question) => (
          <li key={question.id}>{question.text}</li>
        ))}
      </ul>
    </div>
  );
}
