import {Pipe, PipeTransform} from '@angular/core';
import {pluralize} from '../utils/pluralize';

@Pipe({ name: 'pluralize', standalone: true })
export class PluralizePipe implements PipeTransform {
  transform(num: number | null | undefined, titleForNum1 = '', titleForNum2 = '', titleForNum5 = ''): string {
    return `${pluralize(num ?? 0, titleForNum1, titleForNum2, titleForNum5)}`;
  }
}
