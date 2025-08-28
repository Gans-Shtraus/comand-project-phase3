import { createSlice } from "@reduxjs/toolkit";
import type { Task } from "../../model";
import { createTaskThunk, deleteTaskThunk, getTaskThunk } from "../thunk";

type initialStateType = {
  tasks: Task[];
  loading: boolean;
  error: string;
};

const initialState: initialStateType = {
  tasks: [],
  loading: false,
  error: "",
};
const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //получение всех тудушек
    builder
      .addCase(getTaskThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTaskThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          state.tasks = action.payload.data;
        }
      })
      .addCase(getTaskThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error ?? "Произошла ошибка";
      })
      //***Добавление тудушки
      .addCase(createTaskThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTaskThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          state.tasks.push(action.payload.data);
        }
      })
      .addCase(createTaskThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error ?? "Произошла ошибка";
      })
      //***Удаление тудушки
      .addCase(deleteTaskThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTaskThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          state.tasks = state.tasks.filter(
            (task) => task.id !== action.payload.data?.id
          );
        }
      })
      .addCase(deleteTaskThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error ?? "Произошла ошибка";
      });
  },
});

export default taskSlice.reducer;
