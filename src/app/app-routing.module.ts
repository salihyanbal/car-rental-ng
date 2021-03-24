import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { CreditCardComponent } from './components/creditcard/creditcard.component';
import { AdminComponent } from './components/pages/admin/admin.component';
import { CarDetailsComponent } from './components/pages/car-details/car-details.component';
import { CarsComponent } from './components/pages/cars/cars.component';
import { HomepageComponent } from './components/pages/homepage/homepage.component';
import { RentalComponent } from './components/rental/rental.component';

const routes: Routes = [
  {path:"", component:HomepageComponent},
  {path:"cars", component:CarsComponent},
  {path:"cardetails/:carId", component:CarDetailsComponent},
  {path:"rental/:carId", component:RentalComponent},
  {path:"creditcard/:rental", component:CreditCardComponent},
  {path:"homepage", component:HomepageComponent},
  { path: "admin", component: AdminComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
