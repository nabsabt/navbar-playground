import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'conditionalDatePipe' })
export class ConditionalDatePipe implements PipeTransform {
  transform(value: any, day: number = 0, format: string = 'yyyy-MM-dd hh:mm'): any {
    if (!(value instanceof Date)) {
      return value;
    }

    const date = new Date(value);
    date.setDate(date.getDate() - day);

    return new DatePipe('en-US').transform(date, format);
  }
}
