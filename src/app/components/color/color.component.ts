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

  currentColor: Color = {id:0,name:""}
  colors: Color[] = [];
  dataLoaded = false;
  constructor(
    private colorService: ColorService,
    private router:Router,
    private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.getColors();
  }

  setCurrentColor(color: Color) {
    this.currentColor = color;
    this.router.navigate(['cars/color/' + color.id], { queryParams: { colorId: this.currentColor.id }, queryParamsHandling: 'merge', relativeTo: this.route});
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
      this.dataLoaded = true;
    });
  }

  getCurrentColorClass(color: Color) {
    if (color == this.currentColor) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }

}
