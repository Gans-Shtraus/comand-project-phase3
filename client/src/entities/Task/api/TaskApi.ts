import { axiosInstance } from "@/shared/lib/axiosInstance";
import type { Task } from "../model";
import type { IApiResponse } from "@/shared/types";

export class TaskApi {
  static async getAll(): Promise<IApiResponse<Task[]>> {
    const { data } = await axiosInstance.get("/tasks");
    return data;
  }
  static async getById(id: string): Promise<IApiResponse<Task>> {
    const { data } = await axiosInstance.get(`/tasks/${id}`);
    return data;
  }
  static async create(task: Task): Promise<IApiResponse<Task>> {
    const { data } = await axiosInstance.post("/tasks", task);
    return data;
  }
  static async updateById(id: string, task: Task): Promise<IApiResponse<Task>> {
    const { data } = await axiosInstance.put(`/tasks/${id}`, task);
    return data;
  }
  static async deleteById(id: string): Promise<IApiResponse<Task>> {
    const { data } = await axiosInstance.delete(`/tasks/${id}`);
    return data;
  }
}
