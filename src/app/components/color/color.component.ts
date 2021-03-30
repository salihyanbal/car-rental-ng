import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  selectedColors: Color[];
  colors: Color[] = [];
  dataLoaded = false;
  constructor(
    private colorService: ColorService,
    private router:Router,
    private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.getColors();
  }

  
  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
      this.dataLoaded = true;
    });
  }

  setCurrentColor() {
    let colors = this.selectedColors.map(b => b.id)
    this.router.navigate([], { queryParams: { colors }, queryParamsHandling: 'merge', relativeTo: this.route});
    
  }

}
