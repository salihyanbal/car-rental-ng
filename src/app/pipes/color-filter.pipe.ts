import { Pipe, PipeTransform } from '@angular/core';
import { Color } from '../models/color';

@Pipe({
  name: 'colorFilter'
})
export class ColorFilterPipe implements PipeTransform {

  transform(value: Color[], filterText:string): Color[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : ""
    return filterText ? value
    .filter((p:Color) => p.name.toLocaleLowerCase().indexOf(filterText) !== -1) 
    : value;
  }

}
