import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { CarComponent } from './components/car/car.component';
import { NaviComponent } from './components/navi/navi.component';
import { CustomerComponent } from './components/customer/customer.component';
import { HttpClientModule } from '@angular/common/http';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrandFilterPipe } from './pipes/brand-filter.pipe';
import { ColorFilterPipe } from './pipes/color-filter.pipe';
import { CarFilterPipe } from './pipes/car-filter.pipe';
import { RentalComponent } from './components/rental/rental.component';
import { CreditCardComponent } from './components/creditcard/creditcard.component';
import { FooterComponent } from './components/footer/footer.component';

import { ToastrModule } from 'ngx-toastr'
import { DatePipe } from '@angular/common';
import { HomepageComponent } from './components/pages/homepage/homepage.component';
import { CarsComponent } from './components/pages/cars/cars.component';
import { CarDetailsComponent } from './components/pages/car-details/car-details.component';
import { CarRentsComponent } from './components/car-rents/car-rents.component';
import { AdminComponent } from './components/pages/admin/admin.component';
import { AdminCarsComponent } from './components/admin-components/admin-cars/admin-cars.component';
import { AdminColorsComponent } from './components/admin-components/admin-colors/admin-colors.component';
import { AdminBrandsComponent } from './components/admin-components/admin-brands/admin-brands.component';
import { ConfirmationService } from 'primeng/api';
import { UpdateCarComponent } from './components/update-components/update-car/update-car.component';
import { AddCarComponent } from './components/add-components/add-car/add-car.component';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { AddColorComponent } from './components/add-components/add-color/add-color.component';
import { AddBrandComponent } from './components/add-components/add-brand/add-brand.component';
import { UpdateBrandComponent } from './components/update-components/update-brand/update-brand.component';
import { UpdateColorComponent } from './components/update-components/update-color/update-color.component';



@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    ColorComponent,
    CarComponent,
    NaviComponent,
    CustomerComponent,
    CarDetailComponent,
    BrandFilterPipe,
    ColorFilterPipe,
    CarFilterPipe,
    RentalComponent,
    CreditCardComponent,
    FooterComponent,
    HomepageComponent,
    CarsComponent,
    CarDetailsComponent,
    CarRentsComponent,
    AdminComponent,
    AdminCarsComponent,
    AdminColorsComponent,
    AdminBrandsComponent,
    UpdateCarComponent,
    AddCarComponent,
    AddColorComponent,
    AddBrandComponent,
    UpdateBrandComponent,
    UpdateColorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    }),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CarouselModule,
    ButtonModule,
    CardModule,
    SplitButtonModule,
    MenuModule,
    TableModule,
    ConfirmDialogModule,
    DropdownModule,
    DynamicDialogModule
  ],
  providers: [
    DatePipe,
    ConfirmationService,
    DialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
