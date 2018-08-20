import { Injectable } from '@angular/core';

import { NgcCookieConsentService, NgcInitializeEvent, NgcStatusChangeEvent, NgcNoCookieLawEvent } from 'ngx-cookieconsent';

import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  private popupCloseSubscription: Subscription;

  constructor(private ngc: NgcCookieConsentService) { }

  subscribe() {
    this.popupCloseSubscription = this.ngc.popupClose$.subscribe(
      () => {
        //
      });
  }

  unsubscribe() {
    this.popupCloseSubscription.unsubscribe();
  }
}
