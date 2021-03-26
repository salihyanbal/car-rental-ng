import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from '../auth-components/login/login.component';
import { RegisterComponent } from '../auth-components/register/register.component';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  userLogged:boolean;
  userName:string;
  isAdminPage:boolean;
  adminPageRole: "admin";
  userItems: MenuItem[];
  constructor(
    private dialogService:DialogService,
    private authService:AuthService
  ) { }

  ngOnInit(): void {
    this.getUserName()
    this.setUserLogged()
    this.createUserItems()
  }

  async createUserItems(){
    if(this.userLogged){
      await this.setIsAdminPage()
      this.userItems = []
      if(this.isAdminPage){
        this.userItems.push(
          { label: 'Admin', icon: 'pi pi-briefcase', routerLink: 'admin'},
          { separator: true },
        )
      }
      this.userItems.push({ label: 'Profil', icon: 'pi pi-user', routerLink: ['profile'] },
      { label: 'Çıkış', icon: 'pi pi-sign-out', command: ()=>{
        this.authService.logOut()
      }}); 
    }else{
      this.userItems = [
        { label: 'Kayıt ol', icon: 'pi pi-user-edit', command: () => {
          this.register()
        } },
        { label: 'Giriş yap', icon: 'pi pi-sign-in', command: () => {
          this.login()
        } }
      ];
    }
  }

  login(){
      const ref = this.dialogService.open(LoginComponent, {
          header: 'Giriş yap',
          width: '30%'
      });
  }

  register(){
    const ref = this.dialogService.open(RegisterComponent, {
        header: 'Kayıt Ol',
        width: '30%'
    });
  }

  setUserLogged(){
    this.userLogged = this.authService.loggedIn()
  }

  getUserName(){
    this.userName = this.authService.getUserName()
  }

  async setIsAdminPage(){
    this.isAdminPage = await this.authService.haveRole("admin")
  }


}
