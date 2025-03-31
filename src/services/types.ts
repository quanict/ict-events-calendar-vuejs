export type ApiResponse<T> = {
  success: boolean
  data: T;
  status?: number;
}

export type PhotoJson = {
  file: string,
  date: string,
  thumbnail: string
}