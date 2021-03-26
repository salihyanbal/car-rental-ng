import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  currentApp: string = 'cars';
  menuItems: MenuItem[];
  constructor() { }

  ngOnInit(): void {
    this.createMenuItems()
  }

  createMenuItems(){
    this.menuItems = [
      {label: 'Arabalar', icon: 'pi pi-fw pi-list', command: () => {
        this.currentApp = "cars";
      }},
      {label: 'Markalar', icon: 'pi pi-fw pi-list', command: () => {
        this.currentApp = "brands";
      }},
      {label: 'Renkler',  icon: 'pi pi-fw pi-list', command: () => {
        this.currentApp = "colors";
      }},
    ];
  }

}
