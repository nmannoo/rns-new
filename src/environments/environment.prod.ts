export const environment = {
  production: true,
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
