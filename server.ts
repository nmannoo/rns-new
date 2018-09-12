// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

const cors = require('cors');
const compression = require('compression');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const upload = require('express-fileupload');

// DOM libs required for Firebase
(global as any).WebSocket = require('ws');
(global as any).XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

import { enableProdMode } from '@angular/core';

import * as express from 'express';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

import { join } from 'path';

const PORT = process.env.PORT || 4100;
const DIST_FOLDER = join(process.cwd(), 'dist');
const APP_NAME = 'ng-rns';

const {
  AppServerModuleNgFactory,
  LAZY_MODULE_MAP
} = require(`./dist/${APP_NAME}-server/main`);

enableProdMode();

const app = express();
app.use(compression());
app.use(cors({credentials: true, origin: true}));
app.enable('trust proxy');
app.use(upload());

// Set the engine
app.engine(
  'html',
  ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [provideModuleMap(LAZY_MODULE_MAP)]
  })
);

app.set('view engine', 'html');

app.get(/^(\/?)[^.]+$/, (req, res) => {
  res.render(join(DIST_FOLDER, APP_NAME, 'index'), {
    req,
    res
  });
});

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, APP_NAME));

// Static Assets
app.use('/', express.static(join(DIST_FOLDER, APP_NAME), {
  dotfiles: 'allow'
}));
app.use('/assets/images', express.static(join(DIST_FOLDER, APP_NAME, 'assets', 'images'), {
  index: false
}));
app.use('/assets/icons', express.static(join(DIST_FOLDER, APP_NAME, 'assets', 'icons'), {
  index: false
}));
app.use('/assets/data', express.static(join(DIST_FOLDER, APP_NAME, 'assets', 'data'), {
  index: false
}));

// Router Configs
app.post('/email', bodyParser.json(), (req, res) => {
    const body = req.body;
    const transporter = nodemailer.createTransport({
        name: 'server.delcity.mu',
        host: 'server.delcity.mu',
        port: 465,
        secure: true,
        auth: {
            user: 'marketing@rollnsheet.mu',
            pass: 'marketing123*'
        },
        tls: {rejectUnauthorized: false}
    });

    const mailOptions = {
        from: '"' + body.name + '"' + ' <' + body.email + '>',
        to: 'marketing@rollnsheet.mu',
        subject: body.subject,
        text: body.message
    };

    return transporter.sendMail(mailOptions)
        .then(() => {
            const response = {
                message: 'Your email has been successfully sent. Thank you for your message. Our team will be in touch with you very soon.',
                title: 'Sending successful',
                status: true
            };
            res.send(response);
        })
        .catch((error) => {
            const response = {
                message: 'An error has occured. ' + error,
                title: 'Sending failed',
                status: false
            };
            res.send(response);
        });
});

app.post('/upload', (req, res) => {
  if (req.files) {
    const file = req.files.file,
          filename = file.name;
    file.mv(join(DIST_FOLDER, APP_NAME, 'assets', 'images', 'sliders', filename), function(err) {
      if (err) {
        console.log(err);
        res.send('An error occured');
      } else {
        res.status(200).send('Done');
      }
    });
  }
});

// Point all routes to Universal
// app.get('*', (req, res) => {
//   res.render('index', { req });
// });

// Start Express Server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
