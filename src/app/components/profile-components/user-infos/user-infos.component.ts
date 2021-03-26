import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'primeng/dynamicdialog';
import { Customer } from 'src/app/models/customer';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { UserService } from 'src/app/services/user.service';
import { ChangePasswordComponent } from '../change-password/change-password.component';

@Component({
  selector: 'app-user-infos',
  templateUrl: './user-infos.component.html',
  styleUrls: ['./user-infos.component.css']
})
export class UserInfosComponent implements OnInit {

  userForm: FormGroup;
  customerForm: FormGroup;
  user: User;
  customer: Customer;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private customerService: CustomerService,
    private toastrService: ToastrService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.createUserForm()
    this.createCustomerForm()
    this.getUser();
    this.getCustomer();
  }

  createUserForm(){
    this.userForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
    })
  }

  createCustomerForm(){
    this.customerForm = this.formBuilder.group({
      phoneNumber: ["", Validators.required],
      address: ["", Validators.required]
    })

  }

  getUser(){
    this.userService.getbyid(this.authService.getCurrentUserId()).subscribe(response => {
      this.user = response.data
      this.userForm.patchValue(response.data)
    })
  }

  getCustomer(){
    this.customerService.getCustomerById(this.authService.getCurrentUserId()).subscribe(response => {
      this.customer = response.data
      this.customerForm.patchValue(response.data)
    })
  }

  updateCustomer(){
    if(this.customerForm.valid){ 
      this.customerForm.addControl("userId",new FormControl(this.customer.userId))
      this.customerForm.addControl("FindeksScore",new FormControl(this.customer.findeksScore))
      let customerModel = Object.assign({},this.customerForm.value)
      this.customerService.update(customerModel).subscribe(response => {
        this.toastrService.success(response.message,"Başarılı")
        setTimeout(function(){
          location.reload()
        },400)
      },responseError => {
        this.toastrService.error("Hata","hata")
      })
    }else{
      this.toastrService.error("Tüm alanları doldurmanız gerekli","Hata")
    }
  }
  updateUser(){
    if(this.userForm.valid){
      this.userForm.addControl("id",new FormControl(this.user.id))
      let userModel = Object.assign({},this.userForm.value)
      this.userService.updateInfos(userModel).subscribe(response => {
        this.toastrService.success(response.message,"Başarılı")
        setTimeout(function(){
          location.reload()
        },400)
      })
    }else{
      this.toastrService.error("Tüm alanları doldurmanız gerekli","Hata")
    }

  }

  updatePassword(){
    const ref = this.dialogService.open(ChangePasswordComponent, {
      header: 'Şifre güncelle',
      width: '20%'
    });
  }

}
