import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sanitize'
})
export class SanitizePipe implements PipeTransform {

  transform(value: string): string {
    // tslint:disable-next-line:curly
    if (!value) return null;

    let str = value;

    if (this.hasNumber(str)) {
      str = str.replace('-', '');
      str = 'id' + str;
    }

    return str;
  }

  hasNumber(myString: string) {
    return /\d/.test(myString);
  }

}
