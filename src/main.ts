import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic().bootstrapModule(AppModule)
    .then(() => {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/ngsw-worker.js')
          .then((data) => {
            console.log('SW Registered');
          })
          .catch((err) => {
            console.log('SW Not Registered: ' + err);
          });
      }
    })
    .catch(err => console.log(err));
});
