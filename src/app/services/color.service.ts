import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Color } from '../models/color';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiUrl = 'https://localhost:5001/api/';

  constructor(private httpClient: HttpClient) { }

  getColors():Observable<ListResponseModel<Color>> {
    return this.httpClient
      .get<ListResponseModel<Color>>(this.apiUrl + 'colors/getall');
  }

  addColor(color:Color):Observable<ResponseModel>{
    let newPath = this.apiUrl + "colors/add"
    return this.httpClient
    .post<ResponseModel>(newPath,color)
  }

  deleteColor(color:Color):Observable<ResponseModel>{
    let newPath = this.apiUrl + "colors/delete"
    return this.httpClient
    .request<ResponseModel>("DELETE",newPath,{
      body: color
    })
  }
  
  updateColor(color:Color):Observable<ResponseModel>{
    let newPath = this.apiUrl + "colors/update"
    return this.httpClient
    .put<ResponseModel>(newPath,color)
  }
}
