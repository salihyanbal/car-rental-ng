import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  styleUrls: ['./update-car.component.css']
})
export class UpdateCarComponent implements OnInit {

  carUpdateForm : FormGroup;

  brands: Brand[];
  colors: Color[];

  carDetail: CarDetail;

  selectedBrand: string;
  selectedColor: string;
  constructor(private formBuilder:FormBuilder,
    private brandService:BrandService,
    private colorService:ColorService,
    private carService:CarService,
    private config: DynamicDialogConfig,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getCar()
    this.createCarUpdateForm()
    this.getBrands()
    this.getColors()
  }

  createCarUpdateForm(){
    this.carUpdateForm = this.formBuilder.group({
      id: [{value:this.carDetail.carId,disabled:true}],
      carname: [this.carDetail.carName,Validators.required],
      brand: [this.carDetail.brandName, Validators.required],
      color: [this.carDetail.colorName, Validators.required],
      modelYear: [this.carDetail.modelYear, Validators.required],
      dailyPrice: [this.carDetail.dailyPrice, Validators.required],
      description: [this.carDetail.description, Validators.required]
    })
  }

  getCar(){
    this.carDetail = this.config.data.carDetail
    this.selectedBrand = this.carDetail.brandName
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response =>{
      this.brands = response.data
    })
  }

  getColors(){
    this.colorService.getColors().subscribe(response =>{
      this.colors = response.data
    })
  }

  updateCar(){
    if(this.carUpdateForm.valid){
      this.carUpdateForm.addControl("brandId",new FormControl(this.carUpdateForm.get("brand").value.id, Validators.required))
      this.carUpdateForm.addControl("colorId",new FormControl(this.carUpdateForm.get("color").value.id, Validators.required))
      let carModel:Car = Object.assign({},this.carUpdateForm.getRawValue())
      this.carService.updateCar(carModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
        setTimeout(function(){
          location.reload()
        },400)
      },responseError=>{
        if(responseError.error.ValidationErrors.length>0){
          for(let i = 0;i < responseError.error.ValidationErrors.length;i++){
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Doğrulama hatası")
          }
        }
      })
      
    }else{
      this.toastrService.error("Formu doldurmanız gerekli","Hata")
    }
  }

}
