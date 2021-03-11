import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarDetailResponseModel } from '../models/carDetailResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = 'https://localhost:5001/api/cars/';

  constructor(private httpClient: HttpClient) { }

  getAllCarDetails():Observable<CarDetailResponseModel> {
    return this.httpClient
      .get<CarDetailResponseModel>(this.apiUrl + 'getallcardetails');
  }
}
