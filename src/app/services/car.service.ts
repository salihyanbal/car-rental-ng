import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { CarDetail } from '../models/carDetail';
import { Car } from '../models/car';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = 'https://localhost:5001/api/';

  constructor(private httpClient: HttpClient) { }

  getCarById(id:Number):Observable<SingleResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/GetById?id=" + id
    return this.httpClient
    .get<SingleResponseModel<Car>>(newPath)
  }

  getCarsDetails(brandId?:number,colorId?:number,carId?:number):Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + "cars/getcarsdetails?"
    if(brandId){
      newPath += "brandid=" + brandId + "&"
    }
    if(colorId){
      newPath += "colorid=" + colorId + "&"
    }
    if(carId){
      newPath += "id=" + carId + "&"
    }
    return this.httpClient
      .get<ListResponseModel<CarDetail>>(newPath);
  }

  addCar(car:Car):Observable<ResponseModel>{
    let newPath = this.apiUrl + "cars/add"
    return this.httpClient
    .post<ResponseModel>(newPath,car)
  }

  deleteCar(car:Car):Observable<ResponseModel>{
    let newPath = this.apiUrl + "cars/delete"
    return this.httpClient
    .request<ResponseModel>("DELETE",newPath,{
      body: car
    })
  }

  updateCar(car:Car):Observable<ResponseModel>{
    let newPath = this.apiUrl + "cars/update"
    return this.httpClient
    .put<ResponseModel>(newPath,car)
  }
}
