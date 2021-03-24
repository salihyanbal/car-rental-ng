import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  userLogged: boolean = true;
  userItems: MenuItem[];
  constructor() { }

  ngOnInit(): void {
    if(this.userLogged){
      this.userItems = [
        { label: 'Admin', icon: 'pi pi-briefcase', routerLink: 'admin'},
        { separator: true },
        { label: 'Profil', icon: 'pi pi-user', routerLink: ['/setup'] },
        { label: 'Çıkış', icon: 'pi pi-sign-out', routerLink: ['/logout'] }
      ];
    }else{
      this.userItems = [
        { label: 'Kayıt ol', icon: 'pi pi-user-edit', routerLink: ['/setup'] },
        { label: 'Giriş yap', icon: 'pi pi-sign-in', routerLink: ['/logout'] }
      ];
    }


  }


}
