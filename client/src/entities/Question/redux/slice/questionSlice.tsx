import { createSlice } from "@reduxjs/toolkit";
import type { Question } from "../../model";
import {
  getAllQuestionsThunk,
  getQuestionByIdThunk,
  getRandomQuestionThunk,
  getQuestionsByThemeIdThunk,
} from "../thunk";

type initialStateType = {
  questions: Question[];
  loading: boolean;
  error: string;
};

const initialState: initialStateType = {
  questions: [],
  loading: false,
  error: "",
};

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Получение всех вопросов
    builder
      .addCase(getAllQuestionsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllQuestionsThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          state.questions = action.payload.data;
        }
      })
      .addCase(getAllQuestionsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error ?? "Произошла ошибка";
      });

    // Получение вопроса по id - для примера здесь обновим текущее состояние массива (при необходимости можно сделать по-другому)
    builder
      .addCase(getQuestionByIdThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getQuestionByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          // Можно обновить или добавить этот вопрос в массив вопросов
          const index = state.questions.findIndex(
            (q) => q.id === action.payload.data?.id
          );
          if (index !== -1) {
            state.questions[index] = action.payload.data;
          } else {
            state.questions.push(action.payload.data);
          }
        }
      })
      .addCase(getQuestionByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error ?? "Произошла ошибка";
      });

    // Получение случайного вопроса - пример: можно сохранять в массив или в отдельное поле, тут добавим в массив
    builder
      .addCase(getRandomQuestionThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRandomQuestionThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          state.questions.push(action.payload.data);
        }
      })
      .addCase(getRandomQuestionThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error ?? "Произошла ошибка";
      });

    // Получение вопросов по id темы (обновление массива вопросов)
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
  },
});

export default questionSlice.reducer;
