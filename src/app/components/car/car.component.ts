import { Component, OnInit } from '@angular/core';
import { CarDetail } from 'src/app/models/carDetail';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars: CarDetail[] = [];
  dataLoaded = false;
  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.getAllCarDetails();
  }

  getAllCarDetails() {
    this.carService.getAllCarDetails().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

}
