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
  filterBrandText: string;
  brands: Brand[] = [];
  currentBrand?: Brand;
  dataLoaded = false;
  constructor(
    private brandService: BrandService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      this.dataLoaded = true;
    });
  }

  setQueryParams(brand:Brand){
    if(brand){
      this.setCurrentBrand()
    }else{
      this.clearCurrentBrand()
    }
  }

  setCurrentBrand() {
    this.router.navigate(['cars/'], { queryParams: { brandId: this.currentBrand.id }, queryParamsHandling: 'merge', relativeTo: this.route});
  }

  isCurrentBrand(brand: Brand) {
    if (brand == this.currentBrand) {
      return true
    } else {
      return false
    }
  }

  isAllBrandSelected(){
    if(!this.currentBrand){
      return true;
    }else{
      return false;
    }
  }

  clearCurrentBrand(){
    this.currentBrand = undefined;
    this.router.navigate(['cars/'], { queryParams: { brandId: undefined }, queryParamsHandling: 'merge', relativeTo: this.route});
  }
}
