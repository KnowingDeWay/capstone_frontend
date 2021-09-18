import { DataColumn } from "./data-structures";

export interface LoginCredentials {
  username: string,
  password: string
}

export interface CanvasToken {
  tokenName: string,
  apiKey: string
}

export interface NewColumnRequest {
  newColumn: DataColumn,
  csvFileContent: string
}
