import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FakeCard } from '../models/fakeCard';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class FakecardService {

  constructor(private httpClient: HttpClient) { }

  apiUrl = 'https://localhost:5001/api/';

  isCardExist(fakeCard:FakeCard):Observable<ResponseModel>{
    let newPath = this.apiUrl + "fakecards/iscardexist"
    return this.httpClient.post<ResponseModel>(newPath,fakeCard);
  }

  getCardByNumber(cardNumber:string):Observable<ListResponseModel<FakeCard>>{
    let newPath = this.apiUrl + "fakecards/getbycardnumber?cardnumber=" + cardNumber
    return this.httpClient.get<ListResponseModel<FakeCard>>(newPath);
  }

  getCardById(id:number):Observable<SingleResponseModel<FakeCard>>{
    let newPath = this.apiUrl + "fakecards/getbyid?id=" + id
    return this.httpClient.get<SingleResponseModel<FakeCard>>(newPath);
  }

  updateCard(fakeCard:FakeCard):Observable<ResponseModel>{
    let newPath = this.apiUrl + "fakecards/update"
    return this.httpClient.put<ResponseModel>(newPath,fakeCard)
  }
}
