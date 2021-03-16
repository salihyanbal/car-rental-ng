import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  carImages: CarImage[] = [];
  carImagePaths: string[] = [];
  car: CarDetail;
  // currentSlideId:number = 1;
  dataLoaded = false;
  imageUrl = "https://localhost:5001/";
  constructor(private carService: CarService,
    private carImageService: CarImageService, 
    private activatedRoute:ActivatedRoute,) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarDetail(params["carId"])
        this.getCarImages(params["carId"])
      }
    })
  }

  getCarDetail(carId:number) {
    this.carService.getCarDetailsByCarId(carId).subscribe((response) => {
      this.car = response.data[0];
      this.dataLoaded = true;
    });
  }

  getCarImages(carId:number){
    this.carImageService.getCarImageByCarId(carId).subscribe((response) => {
      this.carImages = response.data;
    });
  }

  // nextSlide(){
  //   if(this.currentSlideId<this.carImages.length-1)
  //     this.currentSlideId++;
  // }

  // previousSlide(){
  //   if(this.currentSlideId>0)
  //     this.currentSlideId--;
  // }

}
