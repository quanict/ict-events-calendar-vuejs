export type ApiResponse<T> = {
  success: boolean
  data: T;
  status?: number;
}

export type PhotoJson = {
  file: string,
  date: string,
  thumbnail: string,
  height? : Number,
  width? : Number,
}

export type DayPhotosType = {
  path : string ,
  items : Array<PhotoJson>
}