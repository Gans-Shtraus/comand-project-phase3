import type { IApiResponse, ÌApiResponseError } from "@/shared/types";
import type { Task } from "../../model";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { TaskApi } from "../../api/TaskApi";
import type { AxiosError } from "axios";

export const getTaskThunk = createAsyncThunk<
  IApiResponse<Task[]>,
  void, // 2. Нет аргументов, поэтому void
  { rejectValue: ÌApiResponseError }
>(
  "task/getAll",
  async (_, { rejectWithValue }): Promise<IApiResponse<Task[]>> => {
    try {
      const data = await TaskApi.getAll();
      if (data.data) {
        return data;
      }
      return data;
    } catch (error) {
      console.log(error);
      const err = error as AxiosError<ÌApiResponseError>;
      return rejectWithValue(err.response!.data);
    }
  }
);

export const createTaskThunk = createAsyncThunk<
  IApiResponse<Task>,
  Task,
  { rejectValue: IApiResponse<null> }
>("task/create", async (task: Task, { rejectWithValue }) => {
  try {
    const data = await TaskApi.create(task);
    return data;
  } catch (error) {
    console.log(error);
    const err = error as AxiosError<IApiResponse<null>>;
    return rejectWithValue(err.response!.data);
  }
});

export const deleteTaskThunk = createAsyncThunk<
  IApiResponse<Task>,
  string,
  { rejectValue: IApiResponse<null> }
>("task/delete", async (id: string, { rejectWithValue }) => {
  try {
    const data = await TaskApi.deleteById(id);
    return data;
  } catch (error) {
    console.log(error);
    const err = error as AxiosError<IApiResponse<null>>;
    return rejectWithValue(err.response!.data);
  }
});
