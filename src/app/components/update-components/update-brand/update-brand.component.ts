import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-update-brand',
  templateUrl: './update-brand.component.html',
  styleUrls: ['./update-brand.component.css']
})
export class UpdateBrandComponent implements OnInit {

  brand: Brand;
  brandUpdateForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private brandService: BrandService,
    private toastrService: ToastrService,
    public config: DynamicDialogConfig
  ) { }

  ngOnInit(): void {
    this.getBrand()
    this.createBrandUpdateForm()
  }

  getBrand(){
    this.brand = this.config.data.brand
  }

  createBrandUpdateForm(){
    this.brandUpdateForm = this.formBuilder.group({
      id: [{value:this.brand.id, disabled:true}],
      name: [this.brand.name,Validators.required],
    })
  }

  updateBrand(){
    if(this.brandUpdateForm.valid){
      let brandModel:Brand = Object.assign({},this.brandUpdateForm.getRawValue())
      this.brandService.updateBrand(brandModel).subscribe(response=>{
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
