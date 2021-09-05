import { Observable } from 'rxjs';
import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import axios, { AxiosRequestConfig } from 'axios';
import { LoginCredentials } from '../app/models/request-models';
import { AuthResponse, ObjectResponse } from '../app/models/response-models';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  public async login(data: LoginCredentials): Promise<AuthResponse> {
    let responseModel: AuthResponse = {responseToken: '', responseMessage: ''};
    await axios.post(`${environment.baseUrl}/api/TokenAuthController/LoginUser`, data).then(
      (response) => {
        responseModel = response.data as AuthResponse;
      },
      (error) => {
        if(error.response !== undefined) {
          if(error.response.data !== null) {
            responseModel = error.response.data as AuthResponse;
          }
        }
        else {
          responseModel = {
            responseMessage: error.message,
            responseToken: ''
          }
        }
      }
    );
    return responseModel;
  }

  public async logout(encodedToken: string): Promise<AuthResponse> {
    let responseModel: AuthResponse = {responseToken: '', responseMessage: ''};
    const requestHeaders: AxiosRequestConfig = {
      headers: {
        Authorization: 'Bearer ' + encodedToken
      }
    };
    await axios.post(`${environment.baseUrl}/api/TokenAuthController/LogoutUser`, {}, requestHeaders).then(
      (response) => {
        responseModel = response.data as AuthResponse;
      },
      (error) => {
        if(error.response !== undefined) {
          if(error.response.data !== null) {
            responseModel = error.response.data as AuthResponse;
          }
        }
        else {
          responseModel = {
            responseMessage: error.message,
            responseToken: ''
          }
        }
      }
    );
    return responseModel;
  }

  public async validateToken(encodedToken: string): Promise<number> {
    let tokenValid: number = -1;
    await axios.get(`${environment.baseUrl}/api/TokenAuthController/ValidateToken`, {
      headers: {
        Authorization: 'Bearer ' + encodedToken
      }
    }).then(
      (response) => {
        tokenValid = (response.data as boolean) ? 1 : 0;
      },
      (error) => {
        console.log(error);
      }
    );
    return tokenValid;
  }
}
