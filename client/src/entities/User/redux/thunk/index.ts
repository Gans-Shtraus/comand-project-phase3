import { type IApiResponse } from "@/shared/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { type UserAndToken, UserApi } from "../../api/UserApi";
import type { IUser } from "../../model";
import { setAccessToken } from "@/shared/lib/axiosInstance";
import type { AxiosError } from "axios";

export const registerUserThunk = createAsyncThunk<
  IApiResponse<UserAndToken>,
  IUser,
  { rejectValue: IApiResponse<null> }
>("/user/signup", async (inputs: IUser, { rejectWithValue }) => {
  try {
    const data = await UserApi.register(inputs);
    if (data.data) {
      setAccessToken(data.data.accessToken);
    }
    return data;
  } catch (error) {
    console.log(error);
    const err = error as AxiosError<IApiResponse<null>>;
    return rejectWithValue(err.response!.data);
  }
});

export const loginUserThunk = createAsyncThunk<
  IApiResponse<UserAndToken>,
  IUser,
  { rejectValue: IApiResponse<null> }
>("/user/signin", async (inputs: IUser, { rejectWithValue }) => {
  try {
    const data = await UserApi.login(inputs);
    if (data.data) {
      setAccessToken(data.data.accessToken);
    }
    return data;
  } catch (error) {
    console.log(error);
    const err = error as AxiosError<IApiResponse<null>>;
    return rejectWithValue(err.response!.data);
  }
});

export const logoutUserThunk = createAsyncThunk<
  IApiResponse<null>,
  void,
  { rejectValue: IApiResponse<null> }
>("/user/signout", async (_, { rejectWithValue }) => {
  try {
    const data = await UserApi.logout();
    return data;
  } catch (error) {
    console.log(error);
    const err = error as AxiosError<IApiResponse<null>>;
    return rejectWithValue(err.response!.data);
  }
});
export const refreshUserThunk = createAsyncThunk<
  IApiResponse<UserAndToken>,
  void,
  { rejectValue: IApiResponse<null> }
>("/user/refresh", async (_, { rejectWithValue }) => {
  try {
    const data = await UserApi.refresh();
    if (data.data) {
      setAccessToken(data.data.accessToken);
    }
    return data;
  } catch (error) {
    console.log(error);
    const err = error as AxiosError<IApiResponse<null>>;
    return rejectWithValue(err.response!.data);
  }
});
