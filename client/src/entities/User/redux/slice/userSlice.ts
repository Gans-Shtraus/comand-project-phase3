import type { IUser } from "@/entities/User/model";
import { createSlice } from "@reduxjs/toolkit";
import {
  loginUserThunk,
  logoutUserThunk,
  refreshUserThunk,
  registerUserThunk,
} from "../thunk";

type initialStateType = {
  user: IUser | null;
  loading: boolean;
  error: string;
};

const initialState: initialStateType = {
  user: null,
  loading: false,
  error: "",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /** Регистрация */
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          state.user = action.payload.data.user;
        }
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload?.error ?? "Произошла ошибка";
      });
    //***LOGIN
    builder.addCase(loginUserThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.data) {
        state.user = action.payload.data.user;
      }
    });
    builder.addCase(loginUserThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.error ?? "Произошла ошибка";
    });
    //***Logout
    builder.addCase(logoutUserThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logoutUserThunk.fulfilled, (state) => {
      state.loading = false;
      state.user = null;
    });
    builder.addCase(logoutUserThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.error ?? "Произошла ошибка";
    });
    //***Refresh
    builder.addCase(refreshUserThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(refreshUserThunk.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.data) {
        state.user = action.payload.data.user;
      }
    });
    builder.addCase(refreshUserThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.error ?? "Произошла ошибка";
    });
  },
});

export default userSlice.reducer;
