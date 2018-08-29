import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CdkTableModule } from '@angular/cdk/table';

import { LoginComponent } from '../../../pages/login/login.component';
import { LoginGuard } from '../../guard/login.guard';
import { FirecoreModule } from '../firecore/firecore.module';

const loginroutes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [LoginGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(loginroutes),
    CdkTableModule,
    FirecoreModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    LoginGuard
  ]
})
export class LoginModule { }
