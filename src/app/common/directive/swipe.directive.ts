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
      // imports
      const $ = require('jquery');
      require('bootstrap');
      const Hammer = require('hammerjs');

      // instantiate Hammer behaviors on carousel
      const carousel = this.el;
      const hammer = new Hammer.Manager(carousel, {
        recognizers: [
          [ Hammer.Swipe, { direction: Hammer.DIRECTION_HORIZONTAL } ],
        ]
      });

      // disable pause on hover carousel
      $(carousel).carousel({
        pause: false
      });

      // behavior functions on swipe
      hammer.on('swipeleft', function() {
        $(carousel).carousel('next');
      });
      hammer.on('swiperight', function() {
        $(carousel).carousel('prev');
      });

    }
  }
}
