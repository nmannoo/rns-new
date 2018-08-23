import { Directive, OnInit, Input, ElementRef } from '@angular/core';

import { MDCDialog } from '@material/dialog';

import { PlatformService } from '../services/platform.service';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[dialog]'
})
export class DialogDirective implements OnInit {
  private el: HTMLElement;
  @Input() dialog: string;

  constructor(ref: ElementRef, private platform: PlatformService) {
    this.el = ref.nativeElement;
  }

  ngOnInit() {
    if (this.platform.platformCheck) {
      const dialog = document.querySelector(`.mdc-dialog`);
      const mdcDialog = MDCDialog.attachTo(dialog);
      this.el.addEventListener('click', e => {
        mdcDialog.show();
      });
    }
  }

}
