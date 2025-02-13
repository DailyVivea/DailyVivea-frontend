import { AxiosInstance, ResponseType } from "./axiosInstance";

export const apiGet = async <T>(
  endPoint: string, // 백엔드 API URL
  params?: any
): Promise<ResponseType<T>> => {
  const response = await AxiosInstance.get<ResponseType<T>>(endPoint, {
    params,
  });
  return response.data;
};

export const apiPost = async <T>(
  endPoint: string,
  data?: any,
  params?: any
): Promise<ResponseType<T>> => {
  const response = await AxiosInstance.post<ResponseType<T>>(endPoint, data, {
    params,
  });
  return response.data;
};

export const apiDelete = async <T>(
  endPoint: string,
  params?: any
): Promise<ResponseType<T>> => {
  const response = await AxiosInstance.delete<ResponseType<T>>(endPoint, {
    params,
  });
  return response.data;
};

export const apiPatch = async <T>(
  endPoint: string,
  data?: any,
  params?: any
): Promise<ResponseType<T>> => {
  const response = await AxiosInstance.patch<ResponseType<T>>(endPoint, data, {
    params,
  });
  return response.data;
};

export const apiPut = async <T>(
  endPoint: string,
  data?: any,
  params?: any
): Promise<ResponseType<T>> => {
  const response = await AxiosInstance.put<ResponseType<T>>(endPoint, data, {
    params,
  });
  return response.data;
};
