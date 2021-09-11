import { ICourseDataTable } from './../app/models/data-structures';
import { ObjectResponse } from './../app/models/response-models';
import { Injectable } from '@angular/core';
import axios, { AxiosRequestConfig } from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CanvasGradebookDataService {

  constructor() { }

  public async getCourseDataTable(courseId: number, encodedToken: string): Promise<ObjectResponse<ICourseDataTable>> {
    let objRes! : ObjectResponse<ICourseDataTable>;
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: 'Bearer ' + encodedToken
      }
    };
    await axios.get(`${environment.baseUrl}/api/CourseTabsController/GetCourseDataTable/${courseId}`, config).then(
      (response) => {
        objRes = response.data as ObjectResponse<ICourseDataTable>;
      },
      (error) => {
        if(error.response !== undefined) {
          if(error.response.data !== null) {
            objRes = error.response.data as ObjectResponse<ICourseDataTable>;
          }
          else {
            objRes = {
              message: error.message,
              value: undefined
            }
          }
        }
        else {
          objRes = {
            message: error.message,
            value: undefined
          }
        }
      }
    );
    return objRes;
  }

  public async updateCourseDataTable(encodedToken: string, table: ICourseDataTable): Promise<string> {
    let responseText: string = '';
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: 'Bearer ' + encodedToken
      }
    };
    await axios.put(`${environment.baseUrl}/api/CourseTabsController/UpdateCourseTable`, table, config).then(
      (response) => {
        responseText = response.data;
      },
      (error) => {
        if(error.response !== undefined) {
          if(error.response.data !== null) {
            responseText = error.response.data;
          }
          else {
            responseText = error.message;
          }
        }
        else {
          responseText = error.message;
        }
      }
    );
    return responseText;
  }
}
