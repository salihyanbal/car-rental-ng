import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
import { Location } from '@angular/common'
@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent implements OnInit {
  brands: Brand[] = [];
  currentBrand?: Brand;
  dataLoaded = false;
  constructor(
    private brandService: BrandService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location) {}

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      this.dataLoaded = true;
    });
  }

  setCurrentBrand(brand: Brand) {
    this.currentBrand = brand;
    this.router.navigate(['cars/brand/' + brand.id], { queryParams: { brandId: this.currentBrand.id }, queryParamsHandling: 'merge', relativeTo: this.route});
  }

  getCurrentBrandClass(brand: Brand) {
    if (brand == this.currentBrand) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }

  getAllBrandClass(){
    if(!this.currentBrand){
      return "list-group-item active";
    }else{
      return "list-group-item";
    }
  }

  clearCurrentBrand(){
    this.currentBrand = null;
    this.router.navigate(['cars/'], { queryParams: { brandId: undefined }, queryParamsHandling: 'merge', relativeTo: this.route});
  }
}
