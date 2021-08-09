import { Injectable } from '@angular/core';
import axios, { AxiosRequestConfig } from 'axios';
import { environment } from './../environments/environment';
import { ObjectResponse } from '../app/models/response-models';
import { UserProfile } from 'src/app/models/entity-models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  public async viewUserProfile(encodedToken: string): Promise<ObjectResponse<UserProfile>> {
    let objResponse: ObjectResponse<UserProfile> = {message: '', value: undefined};
    const headers: AxiosRequestConfig = {
      headers: {
        Authorization: 'Bearer ' + encodedToken
      }
    };
    await axios.get(`${environment.baseUrl}/api/UserManagementController/ViewUserProfile`, headers).then(
      (response) => {
        objResponse = response.data as ObjectResponse<UserProfile>;
      },
      (error) => {
        if(error.response.data !== null) {
          objResponse = error.response.data as ObjectResponse<UserProfile>;
        }
        else {
          objResponse = {
            message: error.message,
            value: undefined
          }
        }
      }
    );
    return objResponse;
  }

}
