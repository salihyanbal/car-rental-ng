import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { CreditCardComponent } from './components/creditcard/creditcard.component';
import { RentalComponent } from './components/rental/rental.component';

const routes: Routes = [
  {path:"", component:CarComponent},
  {path:"cars", component:CarComponent},
  {path:"cardetails/:carId", component:CarDetailComponent},
  {path:"rental/:carId", component:RentalComponent},
  {path:"creditcard/:rental", component:CreditCardComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
