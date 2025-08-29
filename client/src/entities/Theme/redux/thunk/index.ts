import type { IApiResponse, ÌApiResponseError } from "@/shared/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import { ThemeApi } from "../../api/theme.api";
import type { Board, Question, Theme } from "../../model";

// Получить все темы
export const getAllThemesThunk = createAsyncThunk<
  IApiResponse<Theme[]>,
  void,
  { rejectValue: ÌApiResponseError }
>(
  "theme/getAll",
  async (_, { rejectWithValue }): Promise<IApiResponse<Theme[]>> => {
    try {
      const data = await ThemeApi.getAll();
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
  string,
  { rejectValue: ÌApiResponseError }
>(
  "theme/getByThemeId",
  async (
    themeId: string,
    { rejectWithValue }
  ): Promise<IApiResponse<Question[]>> => {
    try {
      const data = await ThemeApi.getByThemeId(themeId);
      return data;
    } catch (error) {
      console.log(error);
      const err = error as AxiosError<ÌApiResponseError>;
      return rejectWithValue(err.response!.data);
    }
  }
);

// Получить доску вопросов
export const getBoardThunk = createAsyncThunk<
  IApiResponse<Board>,
  void,
  { rejectValue: ÌApiResponseError }
>(
  "theme/getBoard",
  async (_, { rejectWithValue }): Promise<IApiResponse<Board>> => {
    try {
      const data = await ThemeApi.getBoard();
      return data;
    } catch (error) {
      console.log(error);
      const err = error as AxiosError<ÌApiResponseError>;
      return rejectWithValue(err.response!.data);
    }
  }
);
