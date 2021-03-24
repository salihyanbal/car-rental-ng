import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {
  viewable:string= "details";
  constructor() { }

  ngOnInit(): void {
  }

  change(app:string){
    this.viewable = app;
  }

}
