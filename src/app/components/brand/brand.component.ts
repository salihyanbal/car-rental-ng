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
  selectedBrands?: Brand[];
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

  setCurrentBrand() {
    let brands = this.selectedBrands.map(b => b.id)
    this.router.navigate([], { queryParams: { brands }, queryParamsHandling: 'merge', relativeTo: this.route});
  }

}
