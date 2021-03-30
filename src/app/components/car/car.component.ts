import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  filterCarText:string;
  cars: CarDetail[] = [];
  carImages: CarImage[] = [];
  dataLoaded = false;
  constructor(
    private carService: CarService,
    private carImageService: CarImageService,
    private activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params=>{
      this.getCarsDetails(params["brands"],params["colors"])
    })
  }


  getCarsDetails(brands:number[],colors:number[]) {
    this.carService.getCarsDetails(brands, colors).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
      this.setPreviewImages(this.cars)
    });
  }

  getCarImages(){
    this.carImageService.getCarImages().subscribe((response) => {
      this.carImages = response.data;
    });
  }

  setPreviewImages(cars:CarDetail[]){
    cars.forEach(car => {
      this.carImageService.getCarImageByCarId(car.carId).subscribe((response) => {
        car.previewImagePath = "https://localhost:5001/" + response.data[0].imagePath;
      });
    });
  }



}
