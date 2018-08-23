import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { environment } from '../../../../environments/environment';

import { LoginComponent } from '../../../pages/login/login.component';
import { AdminComponent } from '../../../pages/admin/admin.component';
import { AuthService } from '../../services/auth.service';
import { AuthGuard } from '../../guard/auth.guard';
import { AdminLayoutComponent } from '../../admin-layout/admin-layout.component';
import { AdminHeaderComponent } from '../../admin-layout/admin-header/admin-header.component';
import { AdminFooterComponent } from '../../admin-layout/admin-footer/admin-footer.component';


const adminroutes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        component: AdminComponent
      }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(adminroutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule
  ],
  declarations: [
    LoginComponent,
    AdminComponent,
    AdminLayoutComponent,
    AdminHeaderComponent,
    AdminFooterComponent
  ],
  providers: [
    AuthService,
    AuthGuard
  ]
})
export class AdminModule { }
