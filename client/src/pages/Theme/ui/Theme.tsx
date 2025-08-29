import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllThemesThunk } from "@/entities/Theme/redux/thunk";
import type { AppDispatch } from "@/app/redux/store";
import type { RootState } from "@reduxjs/toolkit/query";

export const Theme: React.FC = () => {
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
        {themes.map((theme) => (
          <li key={theme.id}>{theme.name}</li>
        ))}
      </ul>
    </div>
  );
};
