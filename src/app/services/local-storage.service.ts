import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  set(key:string,data:any){
    localStorage.setItem(key,data)
  }

  remove(key:string){
    localStorage.removeItem(key)
  }

  get(key:string){
    return localStorage.getItem(key)
  }

  setToken(token:string){
    localStorage.setItem("token",token)
  }

  removeToken(){
    localStorage.removeItem("token")
  }

  getToken(){
    return localStorage.getItem("token")
  }
}
