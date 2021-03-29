
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { CarDetail } from 'src/app/models/carDetail';
import { Rental } from 'src/app/models/rental';
import { AuthService } from 'src/app/services/auth.service';
import { CarService } from 'src/app/services/car.service';
import { FindeksService } from 'src/app/services/findeks.service';
import { RentalService } from 'src/app/services/rental.service';
import { CreditCardComponent } from '../creditcard/creditcard.component';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  car:CarDetail;
  startDate:string;
  endDate:string;
  rentPrice:number = 0;
  rental:Rental;
  rentable:Boolean = false;
  minDate:string|null;
  endMinDate:string|null;
  maxDate:string|null;
  constructor(
    private rentalService:RentalService,
    private carService:CarService,
    private router:Router,
    private toastrService:ToastrService,
    private datePipe:DatePipe,
    private authService:AuthService,
    private findeksService:FindeksService,
    private config: DynamicDialogConfig,
    private dialogService:DialogService) { }

  ngOnInit(): void {
    this.getCarsDetail()
    this.minDate=this.datePipe.transform(new Date(),"yyyy-MM-dd");
    this.maxDate=this.datePipe.transform(new Date(new Date().setFullYear(new Date().getFullYear() + 1)),"yyyy-MM-dd");
  }

  getCarsDetail() {
    let carId = this.config.data.carId
    this.carService.getCarsDetails(undefined,undefined,carId).subscribe((response) => {
      this.car = response.data[0];
    });
  }

  async addRental(){
    this.rentable = (await this.setRentable())
    if(this.rentable){
      let currentUserId = this.authService.getCurrentUserId()
      if(await this.findeksService.isCustomerFindexEnough(currentUserId,this.car.carId)){
        this.rental = this.rental;
        this.rental.userId = this.authService.getCurrentUserId()
        this.openCreditCard()
      }
      else{
        this.toastrService.error("Findeks puanınız yeterli değil","Hata")
      }
    }else{
      this.toastrService.error("Bu tarihler arasında araba zaten kiralanmış","Hata")
    }
  }

  async setRentable(){
    this.rental = {carId:this.car.carId,rentStartDate:this.startDate,rentEndDate:this.endDate,totalRentPrice:this.calculatePrice()};
    return (await this.rentalService.isRentable(this.rental).toPromise()).success
  }

  openCreditCard(){
    const ref = this.dialogService.open(CreditCardComponent, {
      data:{
        rental: this.rental
      },
      header: 'Choose a Car',
      width: '20%'
    });
    this.toastrService.info("Kredi kartı ödeme sayfasına yönlendiriliyor","Yönlendiriliyor")
  }

  calculatePrice():number{
    if(this.startDate && this.endDate){
      let endDate = new Date(this.endDate.toString())
      let startDate = new Date(this.startDate.toString())
      let endDay = Number.parseInt(endDate.getDate().toString())
      let endMonth = Number.parseInt(endDate.getMonth().toString())
      let endYear = Number.parseInt(endDate.getFullYear().toString())
      let startDay = Number.parseInt(startDate.getDate().toString())
      let startMonth = Number.parseInt(startDate.getMonth().toString())
      let startYear = Number.parseInt(startDate.getFullYear().toString())
      let result =  ((endDay - startDay) + ((endMonth - startMonth)*30) + ((endYear - startYear)*365) + 1) * this.car.dailyPrice
      if (result>0){
        return result
      }
    }
    this.toastrService.error("Bu tarihler arasında arabayı kiralayamazsınız","Hata")
    return 0
  }

  controlEndDate(){
    if(this.endDate<this.startDate){
      this.endDate = this.startDate
    }
  }
}
