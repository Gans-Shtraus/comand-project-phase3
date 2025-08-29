import { useEffect, type JSX } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "@/app/redux/store";
import { getAllThemesThunk } from "@/entities/Theme/redux/thunk";
import { useNavigate } from "react-router";
import type { Theme } from "@/entities/Theme/model";
import s from "../style/index.module.css"; // модульные стили

export function Theme(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { themes, loading, error } = useSelector(
    (state: RootState) => state.themeSlice
  );

  useEffect(() => {
    dispatch(getAllThemesThunk());
  }, [dispatch]);

  if (loading) return <div className={s.status}>Загрузка...</div>;
  if (error) return <div className={s.status}>Ошибка: {error}</div>;

  const onThemeClick = (themeId: number): void => {
    navigate(`/question/${themeId}`);
  };

  return (
    <div className={s.container}>
      <h2 className={s.title}>Выберите тему</h2>
      <ul className={s.list}>
        {themes.map((theme: Theme) => (
          <li
            key={theme.themeId}
            className={s.listItem}
            onClick={() => onThemeClick(theme.themeId)}
          >
            {theme.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
