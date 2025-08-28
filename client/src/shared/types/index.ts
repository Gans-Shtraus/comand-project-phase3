export interface ÌApiResponseSuccess<Type> {
  message: string;
  data: Type;
  statusCode: number;
  error: null;
}

export interface ÌApiResponseError {
  message: string;
  data: null;
  statusCode: number;
  error: string;
}

export type IApiResponse<Type> = ÌApiResponseSuccess<Type> | ÌApiResponseError;
