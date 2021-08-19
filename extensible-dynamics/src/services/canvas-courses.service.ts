import { CanvasPersonalAccessToken } from './../app/models/entity-models';
import { Injectable } from '@angular/core';
import axios, { AxiosRequestConfig } from 'axios';
import { environment } from './../environments/environment';
import { ListResponse, ObjectResponse } from '../app/models/response-models';
import { Course } from 'src/app/models/canvas-models';

@Injectable({
  providedIn: 'root'
})
export class CanvasCoursesService {

  constructor() { }

  public async GetInstructorCourses(encodedToken: string): Promise<ListResponse<Course>> {
    let listRes!: ListResponse<Course>;
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: 'Bearer ' + encodedToken
      }
    };
    await axios.get(`${environment.baseUrl}/api/CanvasCourseController/GetInstructorCourses`, config).then(
      (response) => {
        listRes = response.data as ListResponse<Course>;
      },
      (error) => {
        if(error.response !== undefined) {
          if(error.response.data !== null) {
            listRes = error.response.data as ListResponse<Course>;
          }
          else {
            listRes = {
              responseMessage: error.message,
              listContent: []
            }
          }
        }
        else {
          listRes = {
            responseMessage: error.message,
            listContent: []
          }
        }
      }
    );
    return listRes;
  }

}
