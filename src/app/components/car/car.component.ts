import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  constructor(
    private carService: CarService,
    private activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params=>{
      if(params["brandId"] && params["colorId"]){
        this.getCarDetails(params["brandId"],params["colorId"])
      }else if(params["brandId"]){
        this.getCarDetailsByBrand(params["brandId"])
      }else if(params["colorId"]){
        this.getCarDetailsByColor(params["colorId"])
      }else{
        this.getAllCarDetails();
      }
      
    })
  }

  getAllCarDetails() {
    this.carService.getAllCarDetails().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarDetails(brandId:number,colorId:number){
    this.carService.getCarDetails(brandId,colorId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarDetailsByBrand(brandId:number){
    this.carService.getCarDetailsByBrand(brandId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarDetailsByColor(colorId:number){
    this.carService.getCarDetailsByBrand(colorId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

}
