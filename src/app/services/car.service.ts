import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { CarDetail } from '../models/carDetail';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = 'https://localhost:5001/api/';

  constructor(private httpClient: HttpClient) { }

  getAllCarDetails():Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + "cars/getcarsdetails"
    return this.httpClient
      .get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarDetailsByBrand(brandId:number){
    let newPath = this.apiUrl + "cars/getcarsdetails?brandId=" + brandId;
    return this.httpClient
      .get<ListResponseModel<CarDetail>>(newPath);
      
  }

  getCarDetailsByColor(colorId:number){
    let newPath = this.apiUrl + "cars/getcarsdetails?colorId=" + colorId;
    return this.httpClient
      .get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarDetails(brandId:number, colorId:number){
    let newPath = this.apiUrl + "cars/getcarsdetails?brandId=" + brandId + "&colorId=" + colorId;
    return this.httpClient
      .get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarDetailsByCarId(carId:number){
    let newPath = this.apiUrl + "cars/getcarsdetails?id=" + carId;
    return this.httpClient
      .get<ListResponseModel<CarDetail>>(newPath);
  }
}
