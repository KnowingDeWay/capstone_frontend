import { ListResponse } from 'src/app/models/response-models';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/canvas-models';
import axios, { AxiosRequestConfig } from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CanvasUserService {

  constructor() { }

  public async getCourseStudents(courseId: number, encodedToken: string, pageNumber: number = -1): Promise<ListResponse<User>> {
    let response: ListResponse<User> = {
      responseMessage: '',
      listContent: []
    };
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: 'Bearer ' + encodedToken
      }
    };
    await axios.get(`${environment.baseUrl}/api/CanvasUserController/GetCourseStudents/${courseId}?pageNumber=${pageNumber}`,
    config).then(
      (res) => {
        response = res.data as ListResponse<User>;
      },
      (error) => {
        if(error.response !== undefined) {
          if(error.response.data !== null) {
            response.responseMessage = error.response.data;
          }
          else {
            response.responseMessage = error.message;
          }
        }
        else {
          response.responseMessage = error.message;
        }
      }
    );
    console.log(response);
    return response;
  }

}
