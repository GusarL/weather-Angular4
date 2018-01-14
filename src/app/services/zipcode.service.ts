import { Injectable } from '@angular/core';

@Injectable()
export class ZipcodeService {

  constructor() { }

  isZipCode(str): boolean {
    // for USA, Australia, Austria, Belgium, Brazil, Canada, Denmark, Faroe Island, Holland,
    // Germany, Hungary, Italy, Japan, Luxembourg, Poland, Spain, Sweden, UK
    if (/(\d{2,5}([\-]\d{3,4})?)/.test(str) ||
        /[A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9]/.test(str) ||
        /[1-9][0-9]{3}\s?[a-zA-Z]{2}/.test(str) ||
        /(L\s*(-|—|–))\s*?[\d]{4}/.test(str) ||
        /\d{3}\s?\d{2}/.test(str) ||
        /[A-Za-z]{1,2}[0-9Rr][0-9A-Za-z]? [0-9][ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2}/.test(str)) {

      return true;
    }

  }
}
