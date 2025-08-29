import { axiosInstance } from "@/shared/lib/axiosInstance";
import type { Question } from "../model";
import type { IApiResponse } from "@/shared/types";

export default class QuestionApi {
  // Получить все вопросы
  static async getAll(): Promise<IApiResponse<Question[]>> {
    const { data } = await axiosInstance.get("/questions");
    return data;
  }
  // Получить вопрос по id
  static async getById(id: string): Promise<IApiResponse<Question>> {
    const { data } = await axiosInstance.get(`/questions/${id}`);
    return data;
  }
  // Получить случайный вопрос
  static async getRandom(): Promise<IApiResponse<Question>> {
    const { data } = await axiosInstance.get("/questions/random");
    return data;
  }
  // Получить вопросы по теме
  static async getByThemeId(id: number): Promise<IApiResponse<Question[]>> {
    const { data } = await axiosInstance.get(`/questions/theme/${id}`);
    return data;
  }
}
