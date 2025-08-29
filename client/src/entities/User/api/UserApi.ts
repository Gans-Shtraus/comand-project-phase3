import { axiosInstance } from "@/shared/lib/axiosInstance";
import type { IUser } from "../model";
import type { IApiResponse } from "@/shared/types";

export type UserAndToken = { user: IUser; accessToken: string };

// * /api/auth/
export class UserApi {
  static async register(inputs: IUser): Promise<IApiResponse<UserAndToken>> {
    const { data } = await axiosInstance.post(`/auth/signup`, inputs);
    return data;
  }

  static async login(inputs: IUser): Promise<IApiResponse<UserAndToken>> {
    const { data } = await axiosInstance.post(`/auth/signin`, inputs);
    return data;
  }

  static async logout(): Promise<IApiResponse<null>> {
    const { data } = await axiosInstance.post("/auth/signout");
    return data;
  }

  static async refresh(): Promise<IApiResponse<UserAndToken>> {
    const { data } = await axiosInstance.get("/auth/refreshTokens");
    return data;
  }
  static async addPoints(
    id: string,
    points: number
  ): Promise<IApiResponse<null>> {
    const { data } = await axiosInstance.put(`/auth/points/${id}`, { points });
    return data;
  }
}
