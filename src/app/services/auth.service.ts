
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from './local-storage.service';
import { ListResponseModel } from '../models/listResponseModel';
import { ToastrService } from 'ngx-toastr';
import { OperationClaim } from '../models/operationClaim';
import { PasswordChangeModel } from '../models/passwordChangeModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userName: string;
  currentUserId: number;
  roles: string[] = [];
  apiUrl = 'https://localhost:5001/api/';
  jwtHelper:JwtHelperService = new JwtHelperService();

  constructor(
    private httpClient:HttpClient,
    private storageService:LocalStorageService,
    private toastrService:ToastrService
  ) { 
    this.setUserStats()
  }


  login(loginModel:LoginModel){
    let newPath = this.apiUrl + "auth/login"
    this.httpClient
    .post<SingleResponseModel<TokenModel>>(newPath,loginModel).subscribe(response => {
      if(response.success){
        this.storageService.setToken(response.data.token)
        this.toastrService.success("Giriş yapıldı","Başarılı")
        this.setUserName()
        this.setCurrentUserId()
        this.setRoles()
        setTimeout(function(){
          location.reload()
        },400)
      }
    },responseError => {
      this.toastrService.error(responseError.error,"Hata")
    })
  }

  register(registerModel:RegisterModel){
    let newPath = this.apiUrl + "auth/register"
    this.httpClient
    .post<SingleResponseModel<TokenModel>>(newPath,registerModel).subscribe(response => {
      if(response.success){
        this.storageService.setToken(response.data.token)
        this.toastrService.success("Kayıt olundu","Başarılı")
        this.setUserName()
        this.setCurrentUserId()
        this.setRoles()
        setTimeout(function(){
          location.reload()
        },400)
      }
    },responseError => {
      this.toastrService.error(responseError.error,"Hata")
    })
  }

  changePassword(passwordChangeModel:PasswordChangeModel):Observable<ResponseModel>{
    let newPath = this.apiUrl + "auth/changepassword"
    return this.httpClient
    .put<ResponseModel>(newPath,passwordChangeModel)
  }

  async setUserStats(){
    if(this.loggedIn()){
      this.setCurrentUserId()
      this.setUserName()
      await this.setRoles()
    }
  }

  async setRoles(){
    if((this.roles == undefined || this.roles.length === 0) && this.storageService.getToken() != null && this.loggedIn()){
      this.roles = (await this.httpClient.get<ListResponseModel<OperationClaim>>(this.apiUrl + "userclaims/getbyuser?id="+ this.currentUserId).toPromise()).data.map(r => r.name)
    }
  }

  loggedIn(): boolean {
    let isExpired = this.jwtHelper.isTokenExpired(this.storageService.getToken());
    return !isExpired;
  }

  setUserName(){
    var decoded = this.getDecodedToken()
    var propUserName = Object.keys(decoded).filter(x => x.endsWith("/name"))[0];
    this.userName = decoded[propUserName];
  }

  getUserName(): string {
    return this.userName;
  }

  setCurrentUserId(){
    var decoded = this.getDecodedToken()
    var propUserId = Object.keys(decoded).filter(x => x.endsWith("/nameidentifier"))[0];
    this.currentUserId = Number(decoded[propUserId]);
  }

  getCurrentUserId():number {
    return this.currentUserId
  }

  logOut() {
    this.storageService.removeToken();
    this.roles = [];
    this.toastrService.success("Çıkış yapıldı","Başarılı")
    setTimeout(function(){
      location.reload()
    },400)
  }

  getDecodedToken(){
    try{
      return this.jwtHelper.decodeToken(this.storageService.getToken());
    }
    catch(Error){
        return null;
    }
  }

  async haveRole(role: string): Promise<boolean> {
    await this.setRoles()
    var check = this.roles.some(item => {
      return item == role;
    })
    return check;
  }
  
}

