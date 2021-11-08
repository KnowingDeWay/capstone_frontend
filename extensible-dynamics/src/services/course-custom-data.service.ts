import { environment } from 'src/environments/environment';
import { Scope, UserCustomDataEntry } from './../app/models/entity-models';
import { Injectable } from '@angular/core';
import { ListResponse } from 'src/app/models/response-models';
import axios, { AxiosRequestConfig } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class CourseCustomDataService {

  constructor() { }

  public async loadScopes(courseId: number, studentId: number, encodedToken: string): Promise<ListResponse<Scope>> {
    let response: ListResponse<Scope> = {
      responseMessage: '',
      listContent: []
    };
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: 'Bearer ' + encodedToken
      }
    };
    await axios.get(`${environment.baseUrl}/api/UserCustomDataController/GetCourseStudentScopes/${courseId}/${studentId}`, config)
    .then(
      (res) => {
        response = res.data as ListResponse<Scope>;
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
    return response;
  }

  public async addScope(scopeName: string, courseId: number, studentId: number, encodedToken: string): Promise<string> {
    let response: string = '';
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: 'Bearer ' + encodedToken
      }
    };
    await axios.post(`${environment.baseUrl}/api/UserCustomDataController/AddScope/${scopeName}/${courseId}/${studentId}`
    , config).then(
      (res) => {
        response = res.data;
      },
      (error) => {
        if(error.response !== undefined) {
          if(error.response.data !== null) {
            response = error.response.data;
          }
          else {
            response = error.message;
          }
        }
        else {
          response = error.message;
        }
      }
    );
    return response;
  }

  public async editScope(scopeId: number, newName: string, encodedToken: string): Promise<string> {
    let response: string = '';
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: 'Bearer ' + encodedToken
      }
    };
    await axios.put(`${environment.baseUrl}/api/UserCustomDataController/EditScope/${scopeId}/${newName}`, {}, config).then(
      (res) => {
        response = res.data;
      },
      (error) => {
        if(error.response !== undefined) {
          if(error.response.data !== null) {
            response = error.response.data;
          }
          else {
            response = error.message;
          }
        }
        else {
          response = error.message;
        }
      }
    );
    return response;
  }

  public async deleteScope(scopeId: number, encodedToken: string): Promise<string> {
    let response: string = '';
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: 'Bearer ' + encodedToken
      }
    };
    await axios.delete(`${environment.baseUrl}/api/UserCustomDataController/DeleteScope/${scopeId}`, config).then(
      (res) => {
        response = res.data;
      },
      (error) => {
        if(error.response !== undefined) {
          if(error.response.data !== null) {
            response = error.response.data;
          }
          else {
            response = error.message;
          }
        }
        else {
          response = error.message;
        }
      }
    );
    return response;
  }

  public async loadCustomDataForScope(scopeId: number, courseId: number, encodedToken: string): Promise<ListResponse<UserCustomDataEntry>> {
    let response: ListResponse<UserCustomDataEntry> = {
      responseMessage: '',
      listContent: []
    };
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: 'Bearer ' + encodedToken
      }
    };
    await axios.get(`${environment.baseUrl}/api/UserCustomDataController/LoadCustomDataForUser/${scopeId}/${courseId}`, config)
    .then(
      (res) => {
        response = res.data as ListResponse<UserCustomDataEntry>;
      },
      (error) => {
        if(error.response !== undefined) {
          if(error.response.data !== null) {
            response = error.response.data;
          }
          else {
            response = error.message;
          }
        }
        else {
          response = error.message;
        }
      }
    );
    return response;
  }

  public async addCustomDataItem(custDataEntry: UserCustomDataEntry, encodedToken: string): Promise<string> {
    let response: string = '';
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: 'Bearer ' + encodedToken
      }
    };
    await axios.post(`${environment.baseUrl}/api/UserCustomDataController/AddUserCustomDataEntry`, custDataEntry, config).then(
      (res) => {
        response = res.data;
      },
      (error) => {
        if(error.response !== undefined) {
          if(error.response.data !== null) {
            response = error.response.data;
          }
          else {
            response = error.message;
          }
        }
        else {
          response = error.message;
        }
      }
    );
    return response;
  }

  public async editCustomDataEntry(entryId: number, newName: string, newValue:string, encodedToken: string): Promise<string> {
    let response: string = '';
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: 'Bearer ' + encodedToken
      }
    };
    await axios.put(`${environment.baseUrl}/api/UserCustomDataController/EditCustomDataEntry/${entryId}/${newName}/${newValue}`
    , config).then(
      (res) => {
        response = res.data;
      },
      (error) => {
        if(error.response !== undefined) {
          if(error.response.data !== null) {
            response = error.response.data;
          }
          else {
            response = error.message;
          }
        }
        else {
          response = error.message;
        }
      }
    );
    return response;
  }

  public async deleteCustomDataEntry(entryId: number, encodedToken: string): Promise<string> {
    let response: string = '';
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: 'Bearer ' + encodedToken
      }
    };
    await axios.delete(`${environment.baseUrl}/api/UserCustomDataController/DeleteCustomDataEntry/${entryId}`, config).then(
      (res) => {
        response = res.data;
      },
      (error) => {
        if(error.response !== undefined) {
          if(error.response.data !== null) {
            response = error.response.data;
          }
          else {
            response = error.message;
          }
        }
        else {
          response = error.message;
        }
      }
    );
    return response;
  }

}
