import { Directive, ElementRef, OnInit } from '@angular/core';

import { PlatformService } from '../services/platform.service';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[dropdown]'
})
export class DropdownDirective implements OnInit {
  private el: HTMLElement;

  constructor(private elRef: ElementRef, private platform: PlatformService) {
    this.el = elRef.nativeElement;
  }

  ngOnInit() {
    if (this.platform.platformCheck) {
      const $ = require('jquery');
      require('bootstrap');
      this.el.addEventListener('click', e => {
        if (this.el.classList.contains('dropdown-toggle')) {
          const element = this.el;
          $(element).dropdown('toggle');
        }
      });
    }
  }

}
