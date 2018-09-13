import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { environment } from '@environments/environment';
import { AuthService } from '../../services/auth.service';
import { LoginGuard } from '../../guard/login.guard';
import { AuthGuard } from '../../guard/auth.guard';

@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase, 'rollnsheet'),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  declarations: [],
  providers: [
    AuthService,
    LoginGuard,
    AuthGuard
  ]
})
export class FirecoreModule { }
