import { Injectable } from '@angular/core';

import { MDCSnackbar } from '@material/snackbar';

import { PlatformService } from './platform.service';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private platform: PlatformService) { }

  trigger(data) {
    if (this.platform.platformCheck) {
      const el = document.querySelector('.mdc-snackbar');
      const snackbar = new MDCSnackbar(el);
      const snackData = {
        message: data.message,
        actionText: data.action,
        actionHandler: function() {
          // console.log(data.message);
        }
      };

      snackbar.show(snackData);
    }
  }

}
