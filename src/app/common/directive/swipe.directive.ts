import { Directive, ElementRef, OnInit } from '@angular/core';
import { PlatformService } from '../services/platform.service';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[swipe]'
})
export class SwipeDirective implements OnInit {
  private el: HTMLElement;

  constructor(
    private elRef: ElementRef,
    private platform: PlatformService
  ) {
    this.el = elRef.nativeElement;
  }

  ngOnInit() {
    if (this.platform.platformCheck) {
      const $ = require('jquery');
      require('bootstrap');
      const Hammer = require('hammerjs');

      const carousel = this.el;
      const hammer = new Hammer.Manager(carousel, {
        // touchAction: 'auto'
      });
      const swipe = new Hammer.Swipe();
      $(carousel).carousel({
        pause: false
      });
      hammer.add(swipe);
      hammer.on('swipeleft', function() {
        $(carousel).carousel('next');
      });
      hammer.on('swiperight', function() {
        $(carousel).carousel('prev');
      });
    }
  }
}
