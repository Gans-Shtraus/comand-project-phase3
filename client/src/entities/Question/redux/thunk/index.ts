import type { IApiResponse, ÌApiResponseError } from "@/shared/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import QuestionApi from "../../api/question.api";
import type { Question } from "../../model";

// Получить все вопросы
export const getAllQuestionsThunk = createAsyncThunk<
  IApiResponse<Question[]>,
  void,
  { rejectValue: ÌApiResponseError }
>(
  "question/getAll",
  async (_, { rejectWithValue }): Promise<IApiResponse<Question[]>> => {
    try {
      const data = await QuestionApi.getAll();
      return data;
    } catch (error) {
      console.log(error);
      const err = error as AxiosError<ÌApiResponseError>;
      return rejectWithValue(err.response!.data);
    }
  }
);

// Получить вопрос по id
export const getQuestionByIdThunk = createAsyncThunk<
  IApiResponse<Question>,
  string,
  { rejectValue: ÌApiResponseError }
>(
  "question/getById",
  async (id: string, { rejectWithValue }): Promise<IApiResponse<Question>> => {
    try {
      const data = await QuestionApi.getById(id);
      return data;
    } catch (error) {
      console.log(error);
      const err = error as AxiosError<ÌApiResponseError>;
      return rejectWithValue(err.response!.data);
    }
  }
);

// Получить случайный вопрос
export const getRandomQuestionThunk = createAsyncThunk<
  IApiResponse<Question>,
  void,
  { rejectValue: ÌApiResponseError }
>(
  "question/getRandom",
  async (_, { rejectWithValue }): Promise<IApiResponse<Question>> => {
    try {
      const data = await QuestionApi.getRandom();
      return data;
    } catch (error) {
      console.log(error);
      const err = error as AxiosError<ÌApiResponseError>;
      return rejectWithValue(err.response!.data);
    }
  }
);

// Получить вопросы по id темы
export const getQuestionsByThemeIdThunk = createAsyncThunk<
  IApiResponse<Question[]>,
  number,
  { rejectValue: ÌApiResponseError }
>(
  "question/getByThemeId",
  async (
    themeId: number,
    { rejectWithValue }
  ): Promise<IApiResponse<Question[]>> => {
    try {
      const data = await QuestionApi.getByThemeId(themeId);
      return data;
    } catch (error) {
      console.log(error);
      const err = error as AxiosError<ÌApiResponseError>;
      return rejectWithValue(err.response!.data);
    }
  }
);
