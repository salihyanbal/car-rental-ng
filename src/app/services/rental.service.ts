import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { RentalDetail } from '../models/rentalDetail';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';
import { Customer } from '../models/customer';
import { CustomerService } from './customer.service';
import { Car } from '../models/car';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl = 'https://localhost:5001/api/';

  constructor(
    private httpClient: HttpClient,
    private customerService: CustomerService) { }

  getAllRentalDetail():Observable<ListResponseModel<RentalDetail>> {
    let newPath = this.apiUrl + "rentals/getallrentaldetails"
    return this.httpClient
      .get<ListResponseModel<RentalDetail>>(this.apiUrl);
  }

  getRentalsByCarId(carId:number):Observable<ListResponseModel<Rental>>{
    let newPath = this.apiUrl + "rentals/getallbycarid?carid=" + carId
    return this.httpClient
    .get<ListResponseModel<Rental>>(newPath);
  }
  
  addRental(rental:Rental){
    let newPath = this.apiUrl + "rentals/add"
    this.httpClient.post(newPath,rental).subscribe()
  }

  getLastByCarId(carId:number):Observable<Rental>{
    let newPath = this.apiUrl + "rentals/getlastbycarid?carid=" + carId
    return this.httpClient.get<Rental>(newPath);
  }

  isRentable(rental:Rental):Observable<ResponseModel>{
    let newPath = this.apiUrl + "rentals/isrentable"
    return this.httpClient.post<ResponseModel>(newPath,rental);
  }
}
