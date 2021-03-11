import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ColorResponseModel } from '../models/colorResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiUrl = 'https://localhost:5001/api/colors/';

  constructor(private httpClient: HttpClient) { }

  getColors():Observable<ColorResponseModel> {
    return this.httpClient
      .get<ColorResponseModel>(this.apiUrl + 'getall');
  }
}
