import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, FilterMatchMode, PrimeNGConfig } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
import { AddBrandComponent } from '../../add-components/add-brand/add-brand.component';
import { UpdateBrandComponent } from '../../update-components/update-brand/update-brand.component';

@Component({
  selector: 'app-admin-brands',
  templateUrl: './admin-brands.component.html',
  styleUrls: ['./admin-brands.component.css']
})
export class AdminBrandsComponent implements OnInit {

  brands: Brand[];
  cols: any[];

  constructor(
    private brandService: BrandService,
    private config: PrimeNGConfig,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    private toastrService: ToastrService) { }

  ngOnInit() {
      this.getBrands();
      this.setColumns();
      this.setConfig();
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response => this.brands = response.data);
  }

  setColumns(){
    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'name', header: 'Isim' },
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

  delete(brand:Brand) {
    this.confirmationService.confirm({
        message:  brand.name + ' adlı markayı silmek istediğinize emin misiniz?',
        accept: () => {
          this.brandService.deleteBrand(brand).subscribe(response => {
            this.toastrService.success(response.message,"Başarılı")
            setTimeout(function(){
              location.reload()
            },400)
          })
        }
    });
  }

  update(brand:Brand) {
    const ref = this.dialogService.open(UpdateBrandComponent, {
      data: {
        brand: brand
      },
      header: 'Marka güncelle',
      width: '20%'
    });
  }
  
  add() {
    const ref = this.dialogService.open(AddBrandComponent, {
        header: 'Marka ekle',
        width: '20%'
    });
  }
}

