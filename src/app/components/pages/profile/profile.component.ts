import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentApp: string = 'infos';
  menuItems: MenuItem[];

  constructor() { }

  ngOnInit(): void {
    this.createMenuItems()
  }

  createMenuItems(){
    this.menuItems = [
      {label: 'Kullanıcı bilgileri', icon: 'pi pi-fw pi-user', command: () => {
        this.currentApp = "infos";
      }},
    ];
  }

}
