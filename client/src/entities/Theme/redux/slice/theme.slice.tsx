import { createSlice } from "@reduxjs/toolkit";
import type { Theme, Question, Board } from "../../model";
import {
  getAllThemesThunk,
  getQuestionsByThemeIdThunk,
  getBoardThunk,
} from "../thunk";

type initialStateType = {
  themes: Theme[];
  questions: Question[];
  board: Board | null;
  loading: boolean;
  error: string;
};

const initialState: initialStateType = {
  themes: [],
  questions: [],
  board: null,
  loading: false,
  error: "",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Получить все темы
    builder
      .addCase(getAllThemesThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllThemesThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          state.themes = action.payload.data;
        }
      })
      .addCase(getAllThemesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error ?? "Произошла ошибка";
      });

    // Получить вопросы по id темы
    builder
      .addCase(getQuestionsByThemeIdThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getQuestionsByThemeIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          state.questions = action.payload.data;
        }
      })
      .addCase(getQuestionsByThemeIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error ?? "Произошла ошибка";
      });

    // Получить доску вопросов
    builder
      .addCase(getBoardThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBoardThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          state.board = action.payload.data;
        }
      })
      .addCase(getBoardThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error ?? "Произошла ошибка";
      });
  },
});

export default themeSlice.reducer;
