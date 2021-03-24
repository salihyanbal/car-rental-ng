import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, FilterMatchMode, PrimeNGConfig } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { CarDetail } from 'src/app/models/carDetail';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { AddCarComponent } from '../../add-components/add-car/add-car.component';
import { UpdateCarComponent } from '../../update-components/update-car/update-car.component';

@Component({
  selector: 'app-admin-cars',
  templateUrl: './admin-cars.component.html',
  styleUrls: ['./admin-cars.component.css']
})
export class AdminCarsComponent implements OnInit {

    cars: CarDetail[];
    cols: any[];

    constructor(
      private carService: CarService,
      private config: PrimeNGConfig,
      private confirmationService: ConfirmationService,
      private dialogService: DialogService,
      private toastrService: ToastrService) { }

    ngOnInit() {
        this.getCars();
        this.setColumns();
        this.setConfig();
    }

    getCars(){
      this.carService.getCarsDetails().subscribe(response => this.cars = response.data);
    }

    setColumns(){
      this.cols = [
        { field: 'carid', header: 'Id' },
        { field: 'brand', header: 'Marka' },
        { field: 'name', header: 'Isim' },
        { field: 'color', header: 'Renk' },
        { field: 'modelyear', header: 'Model yılı'},
        { field: 'dailyprice', header: 'Günlük fiyat'},
        { field: 'description', header: 'Açıklama'}
    ];
    }

    setConfig(){
      this.config.filterMatchModeOptions = {
        text: [
            FilterMatchMode.STARTS_WITH,
            FilterMatchMode.CONTAINS,
            FilterMatchMode.NOT_CONTAINS,
            FilterMatchMode.ENDS_WITH,
            FilterMatchMode.EQUALS,
            FilterMatchMode.NOT_EQUALS
        ],
        numeric: [
            FilterMatchMode.EQUALS,
            FilterMatchMode.NOT_EQUALS,
            FilterMatchMode.LESS_THAN,
            FilterMatchMode.LESS_THAN_OR_EQUAL_TO,
            FilterMatchMode.GREATER_THAN,
            FilterMatchMode.GREATER_THAN_OR_EQUAL_TO
        ],
        date: [
            FilterMatchMode.DATE_IS,
            FilterMatchMode.DATE_IS_NOT,
            FilterMatchMode.DATE_BEFORE,
            FilterMatchMode.DATE_AFTER
        ]
      }
    }

    delete(car:CarDetail) {
      this.confirmationService.confirm({
          message: car.modelYear + ' ' +car.brandName + ' ' + car.carName + ' adlı arabayı silmek istediğinize emin misiniz?',
          accept: () => {
            
            let deletedCar:Car = {id:car.carId};
            this.carService.deleteCar(deletedCar).subscribe(response => {
              this.toastrService.success(response.message,"Başarılı")
              setTimeout(function(){
                location.reload()
              },400)
            })
          }
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

    add() {
      const ref = this.dialogService.open(AddCarComponent, {
          header: 'Araba ekle',
          width: '20%'
      });
    }

}
