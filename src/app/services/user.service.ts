import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = 'https://localhost:5001/api/';
  constructor(
    private httpClient: HttpClient
  ) { }

  getbyid(id:number):Observable<SingleResponseModel<User>>{
    let newPath = this.apiUrl + "users/getbyid?id=" + id
    return this.httpClient.get<SingleResponseModel<User>>(newPath)
  }

  updateInfos(user:User):Observable<ResponseModel>{
    let newPath = this.apiUrl + "users/updateinfos"
    return this.httpClient.put<ResponseModel>(newPath,user)
  }
}
