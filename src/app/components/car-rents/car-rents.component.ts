import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-rents',
  templateUrl: './car-rents.component.html',
  styleUrls: ['./car-rents.component.css']
})
export class CarRentsComponent implements OnInit {
  isAnyRent:boolean;
  rentals:Rental[];
  constructor(
    private rentalService:RentalService,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["carId"]){
        this.getRentalsByCarId(params["carId"])
      }
    })
  }

  getRentalsByCarId(carId:number){
    this.rentalService.getRentalsByCarId(carId).subscribe(response => {
      this.rentals = response.data
      if(response.data.length>0){
        this.isAnyRent=true;
      }
    })
  }

}
