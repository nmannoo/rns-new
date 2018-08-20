// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDKfdcR2yR-IZb1sG5u1PfJKR74PTOsKGY',
    authDomain: 'rollnsheet.firebaseapp.com',
    databaseURL: 'https://rollnsheet.firebaseio.com',
    projectId: 'rollnsheet',
    storageBucket: 'rollnsheet.appspot.com',
    messagingSenderId: '911543424749'
  },
  cookieConfig: {
    cookie: {
      domain: 'localhost'
    },
    palette: {
      popup: {
        background: '#000'
      },
      button: {
        background: '#0c127e'
      }
    },
    position: 'bottom-right',
    theme: 'classic',
    type: 'info',
    content: {
      message: 'This website uses cookies to ensure you get the best experience on our website.',
      dismiss: 'Got it!'
    }
  }
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
