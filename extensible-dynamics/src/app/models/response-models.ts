export interface AuthResponse {
  responseMessage: string,
  responseToken: string
}

export interface ObjectResponse<T> {
  message: string,
  value: T | undefined
}

export interface ListResponse<T> {
  responseMessage: string,
  listContent: T[]
}
