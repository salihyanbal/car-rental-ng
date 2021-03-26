import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {

  carAddForm : FormGroup;
  brands: Brand[];
  colors: Color[];

  selectedBrand: Brand;
  selectedColor: Color;
  constructor(
    private formBuilder:FormBuilder,
    private brandService:BrandService,
    private colorService:ColorService,
    private carService:CarService,
    private ref: DynamicDialogRef, 
    private config: DynamicDialogConfig,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.createCarAddForm()
    this.getBrands()
    this.getColors()
  }
  
  createCarAddForm(){
    this.carAddForm = this.formBuilder.group({
      carname: ["",Validators.required],
      brand: ["", Validators.required],
      color: ["", Validators.required],
      modelYear: ["", Validators.required],
      dailyPrice: ["", Validators.required],
      description: ["", Validators.required]
    })
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

  addCar(){
    if(this.carAddForm.valid){
      this.carAddForm.addControl("brandId",new FormControl(this.carAddForm.get("brand").value.id, Validators.required))
      this.carAddForm.addControl("colorId",new FormControl(this.carAddForm.get("color").value.id, Validators.required))
      let carModel:Car = Object.assign({},this.carAddForm.value)
      carModel.dailyPrice = Number(carModel.dailyPrice)
      carModel.modelYear = Number(carModel.modelYear)
      this.carService.addCar(carModel).subscribe(response=>{
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
