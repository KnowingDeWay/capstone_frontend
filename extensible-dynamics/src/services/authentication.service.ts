import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { LoginCredentials } from '../app/models/request-models';
import { AuthResponse } from '../app/models/response-models';

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
        responseModel = {
          responseMessage: error.message,
          responseToken: ''
        }
      }
    );
    return responseModel;
  }
}
