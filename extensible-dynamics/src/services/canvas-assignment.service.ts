import { ListResponse } from './../app/models/response-models';
import { Injectable } from '@angular/core';
import { Assignment } from 'src/app/models/canvas-models';
import axios, { AxiosRequestConfig } from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CanvasAssignmentService {

  constructor() { }

  public async getCourseAssignments(encodedToken: string, courseId: number): Promise<ListResponse<Assignment>> {
    let listRes!: ListResponse<Assignment>;
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: 'Bearer ' + encodedToken
      }
    };
    await axios.get(`${environment.baseUrl}/api/CanvasAssignmentsController/GetCourseAssignments/${courseId}`, config)
    .then(
      (response) => {
        listRes = response.data as ListResponse<Assignment>;
      },
      (error) => {
        if(error.response !== undefined) {
          if(error.response.data !== null) {
            listRes = error.response.data as ListResponse<Assignment>;
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
