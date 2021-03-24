import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Brand } from '../models/brand';
import { ResponseModel } from '../models/responseModel';
@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl = 'https://localhost:5001/api/';

  constructor(private httpClient: HttpClient) { }

  getBrands():Observable<ListResponseModel<Brand>> {
    return this.httpClient
      .get<ListResponseModel<Brand>>(this.apiUrl + 'brands/getall');
  }

  addBrand(brand:Brand):Observable<ResponseModel>{
    let newPath = this.apiUrl + "brands/add"
    return this.httpClient
    .post<ResponseModel>(newPath,brand)
  }

  deleteBrand(brand:Brand):Observable<ResponseModel>{
    let newPath = this.apiUrl + "brands/delete"
    return this.httpClient
    .request<ResponseModel>("DELETE",newPath,{
      body: brand
    })
  }

  updateBrand(brand:Brand):Observable<ResponseModel>{
    let newPath = this.apiUrl + "brands/update"
    console.log(brand)
    return this.httpClient
    .put<ResponseModel>(newPath,brand)
  }
}
