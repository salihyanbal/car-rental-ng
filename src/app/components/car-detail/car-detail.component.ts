import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { AuthService } from 'src/app/services/auth.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { RentalComponent } from '../rental/rental.component';
import { UpdateCarComponent } from '../update-components/update-car/update-car.component';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  isAdmin:boolean;
  carImages: CarImage[] = [];
  carImagePaths: string[] = [];
  car: CarDetail;
  dataLoaded = false;
  isLogged:Boolean;
  imageUrl = "https://localhost:5001/";
  constructor(private carService: CarService,
    private carImageService: CarImageService, 
    private activatedRoute:ActivatedRoute,
    private dialogService: DialogService,
    private authService: AuthService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarDetail(params["carId"])
        this.getCarImages(params["carId"])
      }
    })
    this.setIsLogged()
    this.setIsAdmin()
  }
  getCarDetail(carId:number) {
    this.carService.getCarsDetails(undefined,undefined,carId).subscribe((response) => {
      this.car = response.data[0];
      this.dataLoaded = true;
    });
  }

  getCarImages(carId:number){
    this.carImageService.getCarImageByCarId(carId).subscribe((response) => {
      this.carImages = response.data;
    });
  }

  update(car:CarDetail){
    const ref = this.dialogService.open(UpdateCarComponent, {
      data: {
        carDetail: car
      },
      header: 'Araba güncelle',
      width: '20%'
    });
  }

  rent(){
    const ref = this.dialogService.open(RentalComponent, {
      data: {
        carId: this.car.carId
      },
      header: 'Choose a Car',
      width: '20%'
    });
  }

  setIsLogged(){
    this.isLogged = this.authService.loggedIn()
  }

  async setIsAdmin(){
    this.isAdmin = await this.authService.haveRole("admin")
  }

}
