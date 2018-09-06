import { Directive, OnInit, Input, ElementRef } from '@angular/core';

import { MDCDialog } from '@material/dialog';

import { PlatformService } from '../../services/platform.service';

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
      this.el.addEventListener('click', e => {
        const dialog = document.querySelector(`#${this.dialog}`);
        const mdcDialog = MDCDialog.attachTo(dialog);
        mdcDialog.show();
      });
    }
  }

}
