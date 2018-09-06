export const environment = {
  production: true,
  algolia: {
    appId: '20KAL7STYT',
    apiKey: '356284a26c76df7b8128811dfb848ef2',
  },
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
    position: 'bottom',
    theme: 'classic',
    type: 'info',
    content: {
      message: 'This website uses cookies to ensure you get the best experience on our website.',
      dismiss: 'Got it!'
    }
  },
  reCAPTCHA: {
    siteKey: '6LfewmwUAAAAADfCuS1MzYnP0MSfMgxKfBT2d3D9'
  }
};
