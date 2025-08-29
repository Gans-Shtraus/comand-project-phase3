import { axiosInstance } from "@/shared/lib/axiosInstance";
import type { IApiResponse } from "@/shared/types";
import type { Board, Question, Theme } from "../model";

export class ThemeApi {
  // Получить все темы (distinct themes)
  static async getAll(): Promise<IApiResponse<Theme[]>> {
    const { data } = await axiosInstance.get("/themes");
    console.log(data);
    return data;
  }

  // Получить вопросы по ид темы
  static async getByThemeId(
    themeId: string
  ): Promise<IApiResponse<Question[]>> {
    const { data } = await axiosInstance.get(`/themes/${themeId}`);
    return data;
  }

  // Получить доску вопросов (board)
  static async getBoard(): Promise<IApiResponse<Board>> {
    const { data } = await axiosInstance.get("/themes/board");
    return data;
  }
}
