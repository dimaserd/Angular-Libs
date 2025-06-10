import {Pipe, PipeTransform} from '@angular/core';
import { ticksToDate } from '../utils/base/ticks-to-date';

@Pipe({
  name: 'ticksToDate',
  standalone: true,
})
export class TicksToDatePipe implements PipeTransform {
  transform(value: number | null | undefined): Date | null {
    return value !== null && value !== undefined ? ticksToDate(value) : null;
  }
}
