import { Component, OnInit, OnDestroy } from '@angular/core';

import { PlatformService } from '../../services/platform.service';
import { CookieService } from '../../services/cookie.service';

import { fadeAnimation, slideAnimation } from '../../classes/animations';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [ fadeAnimation, slideAnimation ]
})
export class MainComponent implements OnInit, OnDestroy {

  constructor(
    private cookie: CookieService,
    private platform: PlatformService
  ) { }

  ngOnInit() {
    this.initSkype();
    this.cookie.subscribe();
  }

  ngOnDestroy() {
    this.cookie.unsubscribe();
  }

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }

  initSkype() {
    if (this.platform.platformCheck) {
      const scriptID = 'skype';
      if (document.getElementById(scriptID)) {
        return;
      }

      const s = document.createElement('script') as any;
      s.type = 'text/javascript';
      s.src = 'https://swc.cdn.skype.com/sdk/v1/sdk.min.js';
      return document.getElementsByTagName('head')[0].appendChild(s);
    }
  }

}
