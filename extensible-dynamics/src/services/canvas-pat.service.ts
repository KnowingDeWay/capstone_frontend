import { CanvasPersonalAccessToken } from './../app/models/entity-models';
import { Injectable } from '@angular/core';
import axios, { AxiosRequestConfig } from 'axios';
import { environment } from './../environments/environment';
import { ListResponse, ObjectResponse } from '../app/models/response-models';
import { CanvasToken } from 'src/app/models/request-models';

@Injectable({
  providedIn: 'root'
})
export class CanvasPatService {

  constructor() {

  }

  public async getUserPats(encodedToken: string): Promise<ListResponse<CanvasPersonalAccessToken>> {
    let listRes!: ListResponse<CanvasPersonalAccessToken>;
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: 'Bearer ' + encodedToken
      }
    };
    await axios.get(`${environment.baseUrl}/api/CanvasAccessTokenController/GetUserAccessTokens`, config).then(
      (response) => {
        listRes = response.data as ListResponse<CanvasPersonalAccessToken>;
      },
      (error) => {
        if(error.response !== undefined) {
          if(error.response.data !== null) {
            listRes = error.response.data as ListResponse<CanvasPersonalAccessToken>;
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

  public async getUserPat(patId: number, encodedToken: string): Promise<ObjectResponse<CanvasPersonalAccessToken>> {
    let objRes!: ObjectResponse<CanvasPersonalAccessToken>;
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: 'Bearer ' + encodedToken
      }
    };
    await axios.get(`${environment.baseUrl}/api/CanvasAccessTokenController/GetUserAccessToken/${patId}`, config).then(
      (response) => {
        objRes = response.data as ObjectResponse<CanvasPersonalAccessToken>;
      },
      (error) => {
        if(error.response !== undefined) {
          if(error.response.data !== null) {
            objRes = error.response.data as ObjectResponse<CanvasPersonalAccessToken>;
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

  public async addToken(pat: CanvasToken, encodedToken: string): Promise<string> {
    let res: string = '';
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: 'Bearer ' + encodedToken
      }
    };
    await axios.post(`${environment.baseUrl}/api/CanvasAccessTokenController/AddCanvasToken`, pat, config).then(
      (response) => {
        res = response.data;
      },
      (error) => {
        if(error.response !== undefined) {
          if(error.response.data !== undefined) {
            res = error.response.data;
          }
          else {
            res = error.message;
          }
        }
        else {
          res = error.message;
        }
      }
    );
    return res;
  }

  public async editToken(pat: CanvasPersonalAccessToken, encodedToken: string) {
    let res: string = '';
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: 'Bearer ' + encodedToken
      }
    };
    await axios.put(`${environment.baseUrl}/api/CanvasAccessTokenController/EditAccessToken`, pat, config).then(
      (response) => {
        res = response.data;
      },
      (error) => {
        if(error.response !== undefined) {
          if(error.response.data !== undefined) {
            res = error.response.data;
          }
          else {
            res = error.message;
          }
        }
        else {
          res = error.message;
        }
      }
    );
    return res;
  }

  public async deleteToken(patId: number, encodedToken: string) {
    let res: string = '';
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: 'Bearer ' + encodedToken
      }
    };
    await axios.delete(`${environment.baseUrl}/api/CanvasAccessTokenController/DeleteAccessToken/${patId}`, config).then(
      (response) => {
        res = response.data;
      },
      (error) => {
        if(error.response !== undefined) {
          if(error.response.data !== undefined) {
            res = error.response.data;
          }
          else {
            res = error.message;
          }
        }
        else {
          res = error.message;
        }
      }
    );
    return res;
  }

  public async activateToken(encodedToken: string, patId: number): Promise<string> {
    let res: string = '';
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: 'Bearer ' + encodedToken
      }
    };
    await axios.post(`${environment.baseUrl}/api/CanvasAccessTokenController/ActivateAccessToken/${patId}`, {}, config).then(
      (response) => {
        res = response.data;
      },
      (error) => {
        if(error.response !== undefined) {
          if(error.response.data !== undefined) {
            res = error.response.data;
          }
          else {
            res = error.message;
          }
        }
        else {
          res = error.message;
        }
      }
    );
    return res;
  }

}
