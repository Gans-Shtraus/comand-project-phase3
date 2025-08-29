import React, { useEffect, type JSX } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllThemesThunk } from "@/entities/Theme/redux/thunk";
import type { AppDispatch, RootState } from "@/app/redux/store";
import type { Theme } from "@/entities/Theme/model";

export function Theme(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();

  // Получаем темы, загрузку и ошибку из состояния
  const { themes, loading, error } = useSelector(
    (state: RootState) => state.themeSlice
  );

  useEffect(() => {
    dispatch(getAllThemesThunk());
  }, [dispatch]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div>
      <h2>Темы</h2>
      <ul>
        {themes.map((theme: Theme) => (
          <li key={theme.id}>{theme.name}</li>
        ))}
      </ul>
    </div>
  );
}
