import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { CdkTableModule } from '@angular/cdk/table';

import { environment } from '../../../../environments/environment';

import { LoginComponent } from '../../../pages/login/login.component';
import { AuthService } from '../../services/auth.service';
import { LoginGuard } from '../../guard/login.guard';

const loginroutes: Routes = [
  {
    path: '',
    component: LoginComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(loginroutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    CdkTableModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    AuthService,
    LoginGuard
  ]
})
export class LoginModule { }
