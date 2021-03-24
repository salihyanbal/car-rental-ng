import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-add-color',
  templateUrl: './add-color.component.html',
  styleUrls: ['./add-color.component.css']
})
export class AddColorComponent implements OnInit {

  colorAddForm : FormGroup;
  constructor(
    private toastrService: ToastrService,
    private colorService: ColorService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createColorAddForm()
  }

  createColorAddForm(){
    this.colorAddForm = this.formBuilder.group({
      name: ["",Validators.required],
    })
  }

  addColor(){
    if(this.colorAddForm.valid){
      let colorModel:Color = Object.assign({},this.colorAddForm.value)
      this.colorService.addColor(colorModel).subscribe(response=>{
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
