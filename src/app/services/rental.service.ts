import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RentalDetailResponseModel } from '../models/rentalDetailResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl = 'https://localhost:5001/api/rentals/';

  constructor(private httpClient: HttpClient) { }

  getAllRentalDetail():Observable<RentalDetailResponseModel> {
    return this.httpClient
      .get<RentalDetailResponseModel>(this.apiUrl + 'getallrentaldetails');
  }
}
